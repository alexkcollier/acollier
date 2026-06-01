import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  featureImage: z.string(),
  tools: z.array(
    z.object({
      name: z.string(),
      img: z.string(),
      href: z.string(),
    }),
  ),
  links: z.array(
    z.object({
      title: z.string(),
      href: z.string(),
    }),
  ),
});

export default defineContentConfig({
  collections: {
    work_en: defineCollection({
      type: 'page',
      source: {
        include: 'work/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
    work_fr: defineCollection({
      type: 'page',
      source: {
        include: 'work/**',
        prefix: 'fr',
      },
      schema: commonSchema,
    }),
  },
});
