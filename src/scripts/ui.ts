// UI interactions. Loaded once; anything page-specific is (re)initialised on
// `astro:page-load`, which also fires after every navigation.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* --------------------------------------------------------------- Theme */

type Theme = 'light' | 'dark';

function setTheme(next: Theme) {
	document.documentElement.dataset.theme = next;
	try {
		localStorage.setItem('theme', next);
	} catch {
		/* storage unavailable: the theme only lasts for this visit */
	}
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f5f6fb' : '#060913');
}

type ViewTransitionDocument = Document & {
	startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

document.addEventListener('click', (event) => {
	const button = (event.target as HTMLElement).closest<HTMLElement>('[data-theme-toggle]');
	if (!button) return;

	const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
	const doc = document as ViewTransitionDocument;

	if (!doc.startViewTransition || reduceMotion()) {
		setTheme(next);
		return;
	}

	// The new theme is revealed as a circle expanding from the button.
	const rect = button.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

	document.documentElement.classList.add('theme-switching');
	const transition = doc.startViewTransition(() => setTheme(next));

	transition.ready.then(() => {
		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
			{ duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
		);
	});
	transition.finished.finally(() => document.documentElement.classList.remove('theme-switching'));
});

/* -------------------------------------------------------------- Header */

function normalise(pathname: string) {
	return pathname.replace(/\/$/, '') || '/';
}

function isCurrent(link: HTMLAnchorElement) {
	const path = normalise(location.pathname);
	const target = normalise(new URL(link.href, location.origin).pathname);
	// Home links (data-exact) only match their own page
	return 'exact' in link.dataset ? path === target : path === target || path.startsWith(target + '/');
}

function placePill() {
	const pill = document.querySelector<HTMLElement>('[data-nav-pill]');
	if (!pill) return;
	const active = document.querySelector<HTMLElement>('[data-nav-link][aria-current="page"]');

	if (!active) {
		pill.style.opacity = '0';
		return;
	}
	pill.style.width = `${active.offsetWidth}px`;
	pill.style.transform = `translateX(${active.offsetLeft}px)`;
	pill.style.opacity = '1';
	// The first placement is instant; later ones slide.
	requestAnimationFrame(() => pill.setAttribute('data-ready', ''));
}

function syncNav() {
	document.querySelectorAll<HTMLAnchorElement>('[data-nav-link], [data-menu-link]').forEach((link) => {
		if (isCurrent(link)) link.setAttribute('aria-current', 'page');
		else link.removeAttribute('aria-current');
	});
	placePill();
}

function setMenu(open: boolean) {
	const header = document.querySelector<HTMLElement>('[data-header]');
	const button = document.querySelector<HTMLElement>('[data-menu-button]');
	if (!header || !button) return;
	header.toggleAttribute('data-open', open);
	button.setAttribute('aria-expanded', String(open));
	button.setAttribute('aria-label', (open ? button.dataset.labelClose : button.dataset.labelOpen) ?? '');
}

document.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	if (target.closest('[data-menu-button]')) {
		const header = document.querySelector<HTMLElement>('[data-header]');
		setMenu(!header?.hasAttribute('data-open'));
	} else if (!target.closest('[data-menu]')) {
		setMenu(false);
	}
});

/* ------------------------------------------------ GitHub accounts */

function setGithub(open: boolean) {
	const box = document.querySelector<HTMLElement>('[data-gh]');
	if (!box) return;
	box.toggleAttribute('data-open', open);
	box.querySelector('[data-gh-button]')?.setAttribute('aria-expanded', String(open));
}

document.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	if (target.closest('[data-gh-button]')) {
		const box = document.querySelector<HTMLElement>('[data-gh]');
		setGithub(!box?.hasAttribute('data-open'));
	} else if (!target.closest('[data-gh-panel]')) {
		setGithub(false);
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		setMenu(false);
		setGithub(false);
	}
});

/* ---------------------------------------------- Language switch */

// The header stays alive between pages, so its language link is pointed at the
// translation of whichever page is showing now (listed in <link rel="alternate">).
function syncLanguageLink() {
	const link = document.querySelector<HTMLAnchorElement>('[data-lang-switch]');
	const alternate = link && document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${link.lang}"]`);
	if (link && alternate) link.href = alternate.href;
}

window.addEventListener('resize', placePill);
document.fonts?.ready.then(placePill);

/* ----------------------------------------------- Scroll and progress */

let ticking = false;

function onScroll() {
	const root = document.documentElement;

	document.querySelector('[data-header]')?.toggleAttribute('data-scrolled', window.scrollY > 8);

	const bar = document.querySelector<HTMLElement>('[data-progress]');
	if (bar) {
		const max = root.scrollHeight - root.clientHeight;
		const progress = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0;
		bar.style.setProperty('--progress', progress.toFixed(4));
	}
}

window.addEventListener(
	'scroll',
	() => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			onScroll();
			ticking = false;
		});
	},
	{ passive: true },
);

/* ------------------------------------------- Article contents */

let tocObserver: IntersectionObserver | null = null;

function initToc() {
	tocObserver?.disconnect();
	const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
	if (!links.length) return;

	const byId = new Map<string, HTMLAnchorElement>();
	links.forEach((link) => byId.set(decodeURIComponent(link.hash.slice(1)), link));

	tocObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				links.forEach((link) => link.removeAttribute('aria-current'));
				byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
			});
		},
		{ rootMargin: '-15% 0px -75% 0px' },
	);

	byId.forEach((_, id) => {
		const heading = document.getElementById(id);
		if (heading) tocObserver?.observe(heading);
	});
}

/* ------------------------------------------------ Project cards */

function initSpotlight() {
	document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((element) => {
		element.addEventListener('pointermove', (event) => {
			const rect = element.getBoundingClientRect();
			element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
			element.style.setProperty('--my', `${event.clientY - rect.top}px`);
		});
	});
}

function initCardVideos() {
	const cards = document.querySelectorAll<HTMLElement>('[data-card]');
	const hoverCapable = canHover();
	const motionOk = !reduceMotion();

	const visibility = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const video = entry.target as HTMLVideoElement;
				if (entry.isIntersecting) video.play().catch(() => {});
				else video.pause();
			});
		},
		{ threshold: 0.6 },
	);

	cards.forEach((card) => {
		const video = card.querySelector<HTMLVideoElement>('video[data-card-video]');
		if (!video) return;

		const ready = () => video.classList.add('is-ready');
		if (video.readyState >= 2) ready();
		else video.addEventListener('loadeddata', ready, { once: true });

		if (!motionOk) return;

		if (hoverCapable) {
			const play = () => void video.play().catch(() => {});
			const pause = () => video.pause();
			card.addEventListener('pointerenter', play);
			card.addEventListener('pointerleave', pause);
			card.addEventListener('focusin', play);
			card.addEventListener('focusout', pause);
		} else {
			visibility.observe(video);
		}
	});
}

/* ---------------------------------------------------------------- Init */

document.addEventListener('astro:page-load', () => {
	setMenu(false);
	setGithub(false);
	syncLanguageLink();
	syncNav();
	onScroll();
	initToc();
	initSpotlight();
	initCardVideos();
});
