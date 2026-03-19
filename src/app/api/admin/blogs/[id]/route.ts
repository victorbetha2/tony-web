import { auth } from "@/auth";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { adminBlogBodySchema } from "@/lib/admin-blog-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const [row] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const json = await req.json();
  const parsed = adminBlogBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const [existing] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = new Date();
  let publishedAt = existing.publishedAt;
  if (parsed.data.status === "published") {
    publishedAt = existing.publishedAt ?? now;
  } else {
    publishedAt = null;
  }

  try {
    const [updated] = await db
      .update(blogPosts)
      .set({
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt ?? "",
        content: parsed.data.content,
        category: parsed.data.category,
        image: parsed.data.image || null,
        status: parsed.data.status,
        publishedAt,
        updatedAt: now,
      })
      .where(eq(blogPosts.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await db.delete(blogPosts).where(eq(blogPosts.id, id));

  return NextResponse.json({ ok: true });
}
