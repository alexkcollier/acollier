import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        featureImage: z.string(),
        tools: z.array(z.object({
          name: z.string(),
          img: z.string(),
          href: z.string(),
        })),
        links: z.array(z.object({
          title: z.string(),
          href: z.string(),
        }))
      })
    })
  }
})
