import { auth } from "@/auth";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return NextResponse.json(rows);
}

const patchSchema = z.object({
  id: z.string().uuid(),
  read: z.boolean(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await db
    .update(contactSubmissions)
    .set({ read: parsed.data.read })
    .where(eq(contactSubmissions.id, parsed.data.id));

  return NextResponse.json({ ok: true });
}
