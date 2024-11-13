import { defineCollection, z } from "astro:content"

const images = defineCollection({
  type: "data",
  schema: z.object({
    url: z.string(),
    alt: z.string(),
  }),
})

export const collections = {
  images,
}
