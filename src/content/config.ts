import { z, defineCollection } from 'astro:content';

// Schema for the `projects` collection (English, with all the project data).
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
  // Logo shown on the project card (path inside /public), with the background it sits on
  logo: z.string().optional(),
  logoBackground: z.string().optional(),
  logoPixelated: z.boolean().optional(),
});

// Spanish version of a project: same file name as the English one, only the texts change.
// Date, logo, technologies and links are taken from the English entry.
const translationSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const collections = {
  projects: defineCollection({ schema: projectSchema }),
  'projects-es': defineCollection({ schema: translationSchema }),
};
