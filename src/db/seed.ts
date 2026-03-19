import { config } from "dotenv";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();
config({ path: resolve(root, ".env") });
config({ path: resolve(root, ".env.local"), override: true });

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(url);
  const db = drizzle(sql, { schema });

  const seedPassword =
    process.env.ADMIN_SEED_PASSWORD || "CAMBIAR_ESTE_PASSWORD";
  const passwordHash = await bcrypt.hash(seedPassword, 12);

  await db
    .insert(schema.adminUsers)
    .values({
      email: "admin@t2bteam.net",
      passwordHash,
      name: "T2B Admin",
    })
    .onConflictDoNothing({ target: schema.adminUsers.email });

  console.log("✅ Admin user ensured (admin@t2bteam.net)");

  const blogDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(blogDir)) {
    console.log("No blog directory, skipping MDX migration");
    return;
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const fullPath = path.join(blogDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");

    await db
      .insert(schema.blogPosts)
      .values({
        slug,
        title: data.title as string,
        excerpt: (data.excerpt as string) || "",
        content,
        category: (data.category as string) || "General",
        image: (data.image as string) || null,
        status: "published",
        publishedAt: data.date ? new Date(data.date as string) : new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoNothing({ target: schema.blogPosts.slug });

    console.log(`✅ Migrated: ${slug}`);
  }

  console.log("🎉 Seed complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
