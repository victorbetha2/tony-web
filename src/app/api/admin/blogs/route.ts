import { auth } from "@/auth";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { adminBlogBodySchema } from "@/lib/admin-blog-schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.updatedAt));

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();
  const parsed = adminBlogBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const now = new Date();
  const publishedAt =
    parsed.data.status === "published" ? now : null;

  try {
    const [inserted] = await db
      .insert(blogPosts)
      .values({
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
      .returning();

    return NextResponse.json(inserted);
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
