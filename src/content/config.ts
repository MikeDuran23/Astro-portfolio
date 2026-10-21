import { z, defineCollection } from 'astro:content';

// Schema for the `projects` collection.
// Adjust or extend the fields as needed.
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  draft: z.boolean().optional().default(false),
  technologies: z.array(z.string()).optional(),
  github: z.string().optional(),
  external: z.string().optional(),
  // Cover video or image (path inside /public)
  cover: z.string().optional(),
});

export const collections = {
  projects: defineCollection({ schema: projectSchema }),
};

