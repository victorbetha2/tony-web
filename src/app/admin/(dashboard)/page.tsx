import { auth } from "@/auth";
import { db } from "@/db";
import { blogPosts, contactSubmissions, leads } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const [contactRow] = await db
    .select({ contactTotal: count() })
    .from(contactSubmissions);

  const [unreadRow] = await db
    .select({ unread: count() })
    .from(contactSubmissions)
    .where(eq(contactSubmissions.read, false));

  const [postRow] = await db.select({ postTotal: count() }).from(blogPosts);

  const [leadRow] = await db.select({ leadTotal: count() }).from(leads);

  const contactTotal = Number(contactRow?.contactTotal ?? 0);
  const unread = Number(unreadRow?.unread ?? 0);
  const postTotal = Number(postRow?.postTotal ?? 0);
  const leadTotal = Number(leadRow?.leadTotal ?? 0);

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-[#171717]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[#9CA3AF]">Contactos</p>
            <p className="mt-2 font-heading text-3xl font-bold text-white">
              {contactTotal}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#171717]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[#9CA3AF]">No leídos</p>
            <p className="mt-2 font-heading text-3xl font-bold text-accent">
              {unread}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#171717]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[#9CA3AF]">
              Leads (eventos)
            </p>
            <p className="mt-2 font-heading text-3xl font-bold text-white">
              {leadTotal}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#171717]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[#9CA3AF]">
              Posts (publicados + borradores)
            </p>
            <p className="mt-2 font-heading text-3xl font-bold text-white">
              {postTotal}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/blogs"
          className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
        >
          Gestionar blogs
        </Link>
        <Link
          href="/admin/contacts"
          className="rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-[#9CA3AF] transition-colors hover:border-accent/40 hover:text-accent"
        >
          Ver contactos
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-[#9CA3AF] transition-colors hover:border-accent/40 hover:text-accent"
        >
          Ver leads (eventos)
        </Link>
        <a
          href="/quiero-informacion"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-[#9CA3AF] transition-colors hover:border-accent/40 hover:text-accent"
        >
          Abrir landing /quiero-informacion
        </a>
      </div>
    </div>
  );
}
