import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articlesCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['News', 'Opinion', 'Culture']),
    author: z.string(),
    timestamp: z.string(),
    isSpotlight: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
