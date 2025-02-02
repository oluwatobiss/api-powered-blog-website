import { defineCollection, z } from "astro:content";

const backendUri =
  import.meta.env.PUBLIC_BACKEND_URI || process.env.PUBLIC_BACKEND_URI;

const blog = defineCollection({
  loader: async () => {
    const response = await fetch(`${backendUri}/posts`);
    const data = await response.json();
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

export const collections = { blog };
