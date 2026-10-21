import { getCollection } from 'astro:content';

/** Published projects (no drafts), newest first. */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));
}
