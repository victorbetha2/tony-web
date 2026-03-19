import { auth } from "@/auth";
import { BlogForm, type BlogFormInitial } from "@/components/admin/blog-form";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export const metadata = { title: "Editar artículo | Admin T2B" };

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!post) {
    notFound();
  }

  const initial: BlogFormInitial = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    image: post.image,
    status: post.status,
  };

  return <BlogForm mode="edit" initial={initial} />;
}
