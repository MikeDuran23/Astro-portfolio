// Languages and interface strings. Project texts live in src/content/projects (English)
// and src/content/projects-es (Spanish).

export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Language of the current page: everything under /es is Spanish. */
export function getLang(url: URL): Lang {
	return url.pathname.split('/')[1] === 'es' ? 'es' : 'en';
}

/** Path of a page in a language: localePath('es', '/projects') -> '/es/projects'. */
export function localePath(lang: Lang, path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (lang === 'en') return clean;
	return clean === '/' ? '/es' : `/es${clean}`;
}

/** The same page in another language. */
export function switchPath(pathname: string, to: Lang): string {
	const base = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
	return localePath(to, base);
}

export function formatMonthYear(date: string, lang: Lang): string {
	return new Date(date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
		year: 'numeric',
		month: 'long',
		timeZone: 'UTC',
	});
}

const en = {
	skip: 'Skip to content',
	homeLabel: 'home',
	mainNav: 'Main',
	footerNav: 'Footer',
	nav: { home: 'Home', projects: 'Projects' },
	theme: 'Toggle light and dark theme',
	menuOpen: 'Open menu',
	menuClose: 'Close menu',
	language: { code: 'ES', label: 'Cambiar a español' },
	github: { menu: 'GitHub profiles', current: 'Current projects', student: 'University projects' },
	meta: {
		title: 'Miguel Duran — Full-stack Computer Engineer',
		description: 'Portfolio of Miguel Duran, computer engineer. Complete web applications, from backend to interface.',
		projectsTitle: 'Projects — Miguel Duran',
		projectsDescription:
			'Full-stack development projects by Miguel Duran: complete applications with backend, database and interface.',
	},
	hero: {
		line1: "Hi, I'm Miguel.",
		line2: 'I build web applications from end to end.',
		lead: 'Computer Engineer focused on complete architectures, from a robust backend to intuitive interfaces. I love solving real problems with clean code.',
		cta: 'View projects',
		status: 'Available for new opportunities',
	},
	home: { featured: 'Featured project', viewAll: 'View all' },
	stack: {
		title: 'What I build with',
		lead: 'The tools I use in my projects, from backend to interface.',
		groups: { Frontend: 'Frontend', Backend: 'Backend', Data: 'Data', Tools: 'Tools' } as Record<string, string>,
	},
	contact: {
		title: 'Open to new opportunities.',
		lead: 'If you like my work or want to collaborate, you can browse my code on GitHub',
		leadEmail: ' or write to me directly',
		getInTouch: 'Get in touch',
		linkedin: 'LinkedIn',
		accounts: 'Current projects are on MikeDuran23; my university projects are on MiguelDuranAltes.',
	},
	footer: { built: 'Built with Astro.' },
	projects: {
		title: 'Projects',
		lead: 'A selection of my work: complete applications with backend, database and interface.',
		empty: 'No projects published yet.',
	},
	card: { view: 'View project', technologies: 'Technologies', logo: 'logo' },
	project: { back: 'Projects', viewCode: 'View code', toc: 'On this page', technologies: 'Technologies' },
};

const es: typeof en = {
	skip: 'Saltar al contenido',
	homeLabel: 'inicio',
	mainNav: 'Principal',
	footerNav: 'Pie de página',
	nav: { home: 'Inicio', projects: 'Proyectos' },
	theme: 'Cambiar entre tema claro y oscuro',
	menuOpen: 'Abrir menú',
	menuClose: 'Cerrar menú',
	language: { code: 'EN', label: 'Switch to English' },
	github: { menu: 'Perfiles de GitHub', current: 'Proyectos actuales', student: 'Proyectos de la universidad' },
	meta: {
		title: 'Miguel Duran — Ingeniero Informático Full-stack',
		description:
			'Portfolio de Miguel Duran, ingeniero informático. Aplicaciones web completas, desde el backend hasta la interfaz.',
		projectsTitle: 'Proyectos — Miguel Duran',
		projectsDescription:
			'Proyectos de desarrollo full-stack de Miguel Duran: aplicaciones completas con backend, base de datos e interfaz.',
	},
	hero: {
		line1: 'Hola, soy Miguel.',
		line2: 'Creo aplicaciones web de principio a fin.',
		lead: 'Ingeniero informático especializado en arquitecturas completas, desde un backend robusto hasta interfaces intuitivas. Me encanta resolver problemas reales con código limpio.',
		cta: 'Ver proyectos',
		status: 'Disponible para nuevas oportunidades',
	},
	home: { featured: 'Proyecto destacado', viewAll: 'Ver todos' },
	stack: {
		title: 'Con qué construyo',
		lead: 'Las herramientas que uso en mis proyectos, del backend a la interfaz.',
		groups: { Frontend: 'Frontend', Backend: 'Backend', Data: 'Datos', Tools: 'Herramientas' },
	},
	contact: {
		title: 'Abierto a nuevas oportunidades.',
		lead: 'Si te gusta mi trabajo o quieres colaborar, puedes ver mi código en GitHub',
		leadEmail: ' o escribirme directamente',
		getInTouch: 'Contactar',
		linkedin: 'LinkedIn',
		accounts: 'Mis proyectos actuales están en MikeDuran23; los de la universidad, en MiguelDuranAltes.',
	},
	footer: { built: 'Hecho con Astro.' },
	projects: {
		title: 'Proyectos',
		lead: 'Una selección de mi trabajo: aplicaciones completas con backend, base de datos e interfaz.',
		empty: 'Todavía no hay proyectos publicados.',
	},
	card: { view: 'Ver proyecto', technologies: 'Tecnologías', logo: 'logotipo' },
	project: { back: 'Proyectos', viewCode: 'Ver código', toc: 'En esta página', technologies: 'Tecnologías' },
};

export const ui = { en, es };

export function useTranslations(lang: Lang) {
	return ui[lang];
}
