import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
  image?: string;
}

function rowToBlogPost(p: InferSelectModel<typeof blogPosts>): BlogPost {
  const dateSrc = p.publishedAt ?? p.createdAt;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    date: dateSrc.toISOString().split("T")[0],
    category: p.category,
    content: p.content,
    image: p.image || undefined,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  return posts.map(rowToBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(
      and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published"))
    )
    .limit(1);

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  return rowToBlogPost(post);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
}
