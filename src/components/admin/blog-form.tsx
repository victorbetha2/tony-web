"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogEditor } from "./blog-editor";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";

export type BlogFormInitial = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  image: string | null;
  status: string;
};

const SUGGESTED_CATEGORIES = ["Finanzas", "Negocios", "Mentalidad", "Inversión"];

export function BlogForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: BlogFormInitial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(!!initial);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Finanzas");
  const [image, setImage] = useState(initial?.image ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    initial?.status === "published" ? "published" : "draft"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "create" && !slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, mode, slugManual]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const finalSlug = (slug.trim() ? slugify(slug) : slugify(title)) || "post";
      const body = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        content,
        category: category.trim() || "General",
        image: image.trim() || null,
        status,
      };

      const url =
        mode === "create"
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${initial!.id}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 409) {
        setError("Ya existe un artículo con ese slug.");
        return;
      }

      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Error al guardar");
        return;
      }

      router.push("/admin/blogs");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-white">
          {mode === "create" ? "Nuevo artículo" : "Editar artículo"}
        </h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-white/15 text-[#9CA3AF]"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando…" : "Guardar"}
          </Button>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
            Título
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder:text-[#9CA3AF]/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
            Slug (URL)
          </label>
          <input
            value={slug}
            onChange={(e) => {
              setSlugManual(true);
              setSlug(e.target.value);
            }}
            required
            className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder:text-[#9CA3AF]/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
          Resumen
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder:text-[#9CA3AF]/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
            Categoría
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            list="blog-categories"
            className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <datalist id="blog-categories">
            {SUGGESTED_CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "draft" | "published")
            }
            className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#9CA3AF]">
          URL de imagen (opcional)
        </label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-white placeholder:text-[#9CA3AF]/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="https://…"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
          Contenido (Markdown)
        </label>
        <BlogEditor value={content} onChange={setContent} />
      </div>
    </form>
  );
}
