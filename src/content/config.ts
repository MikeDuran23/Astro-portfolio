import { z, defineCollection } from 'astro:content';

// Schema para la colección `projects`.
// Ajusta/expande campos según necesites.
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  draft: z.boolean().optional().default(false),
  technologies: z.array(z.string()).optional(),
  github: z.string().optional(),
  external: z.string().optional(),
});

export const collections = {
  projects: defineCollection({ schema: projectSchema }),
};

