import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().optional().default(false),
      pinned: z.boolean().optional().default(false),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional().default([]),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),

      pubDate: z.date({ coerce: true }),
    }),
});

export const collections = { blog };
