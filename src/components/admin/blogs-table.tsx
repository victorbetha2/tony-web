"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  updatedAt: string;
  publishedAt: string | null;
};

export function BlogsTable() {
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setRows(data);
    } catch {
      setError("Error al cargar artículos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: string, title: string) {
    if (!confirm(`¿Eliminar «${title}»? Esta acción no se puede deshacer.`)) {
      return;
    }
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      setRows((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return <p className="text-[#9CA3AF]">Cargando…</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-400">{error}</p>
        <Button type="button" variant="outline" onClick={load}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/blogs/new">
          <Button type="button">Nuevo artículo</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 bg-[#171717] text-[#9CA3AF]">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Actualizado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {row.title}
                </td>
                <td className="px-4 py-3 text-[#9CA3AF]">{row.category}</td>
                <td className="px-4 py-3">
                  {row.status === "published" ? (
                    <Badge className="border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
                      Publicado
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="border border-white/15 bg-white/5 text-[#9CA3AF]"
                    >
                      Borrador
                    </Badge>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[#9CA3AF]">
                  {new Date(row.updatedAt).toLocaleDateString("es-ES")}
                </td>
                <td className="space-x-2 px-4 py-3 whitespace-nowrap">
                  <Link href={`/admin/blogs/${row.id}/edit`}>
                    <Button type="button" size="sm" variant="outline" className="border-white/15 text-xs">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-xs text-red-400 hover:bg-red-500/10"
                    disabled={deleting === row.id}
                    onClick={() => remove(row.id, row.title)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-[#9CA3AF]">
            No hay artículos. Crea el primero.
          </p>
        ) : null}
      </div>
    </div>
  );
}
