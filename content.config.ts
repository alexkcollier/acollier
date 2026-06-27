import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  featureImage: z.string(),
  order: z.optional(z.number()),
  tags: z.array(z.string()),
  featured: z.optional(z.boolean()),
  tools: z.array(
    z.object({
      name: z.string(),
      img: z.string(),
      href: z.string(),
    }),
  ),
  links: z.optional(
    z.array(
      z.object({
        title: z.string(),
        href: z.string(),
      }),
    ),
  ),
});

export default defineContentConfig({
  collections: {
    work_en: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/alexkcollier/acollier-content',
          auth: {
            username: process.env.CONTENT_REPO_USER,
            token: process.env.CONTENT_REPO_TOKEN,
          },
        },
        include: 'content/en/**',
        prefix: '/',
      },
      schema: commonSchema,
    }),
    work_fr: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/alexkcollier/acollier-content',
          auth: {
            username: process.env.CONTENT_REPO_USER,
            token: process.env.CONTENT_REPO_TOKEN,
          },
        },
        include: 'content/fr/**',
        prefix: '/',
      },
      schema: commonSchema,
    }),
  },
});
