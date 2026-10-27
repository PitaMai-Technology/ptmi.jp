import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('お知らせの公開日（YYYY-MM-DD）'),
        category: z.string().optional().describe('お知らせのカテゴリ（任意）'),
      }),
    }),
  },
})
