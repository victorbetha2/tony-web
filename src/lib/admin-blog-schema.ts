import * as z from "zod";

export const adminBlogBodySchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(255),
  excerpt: z.string().max(8000).optional().nullable(),
  content: z.string().min(1),
  category: z.string().min(1).max(100),
  image: z.string().max(500).optional().nullable(),
  status: z.enum(["draft", "published"]),
});

export type AdminBlogBody = z.infer<typeof adminBlogBodySchema>;
