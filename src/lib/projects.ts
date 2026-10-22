import { getCollection, getEntryBySlug } from 'astro:content';
import type { Lang } from '../i18n/ui';

/**
 * Published projects (no drafts), newest first.
 * Everything comes from the English entry (date, logo, technologies, links); in Spanish the
 * title and description are replaced by the ones in src/content/projects-es when they exist.
 */
export async function getProjects(lang: Lang = 'en') {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  const translated = lang === 'es' ? await getCollection('projects-es') : [];
  const bySlug = new Map(translated.map((entry) => [entry.slug, entry.data]));

  return all
    .map((entry) => ({ ...entry, data: { ...entry.data, ...(bySlug.get(entry.slug) ?? {}) } }))
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));
}

/** One project in a language, with its rendered Markdown. Falls back to English. */
export async function getProject(slug: string, lang: Lang = 'en') {
  const base = await getEntryBySlug('projects', slug);
  if (!base) return undefined;

  const translation = lang === 'es' ? await getEntryBySlug('projects-es', slug) : undefined;
  const entry = { ...base, data: { ...base.data, ...(translation?.data ?? {}) } };
  const { Content, headings } = await (translation ?? base).render();

  return { entry, Content, headings };
}
