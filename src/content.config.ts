// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
// import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
// Using a custom inline loader that fetches data from an API
const blog = defineCollection({
  loader: async () => {
    const response = await fetch("http://localhost:3000/posts/");
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.map((post: any) => ({
      id: `${post.id}`,
      title: post.title,
      body: post.body,
    }));
  },
  schema: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };
