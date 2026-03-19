"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ContactRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean | null;
  createdAt: string;
};

export function ContactsTable() {
  const [rows, setRows] = useState<ContactRow[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("No se pudieron cargar los contactos");
      const data = await res.json();
      setRows(data);
    } catch {
      setError("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(id: string, read: boolean) {
    const res = await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !read }),
    });
    if (!res.ok) return;
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, read: !read } : r))
    );
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
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-white/10 bg-[#171717] text-[#9CA3AF]">
          <tr>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Teléfono</th>
            <th className="px-4 py-3 font-medium">Mensaje</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isOpen = expanded === row.id;
            const preview =
              row.message.length > 80
                ? `${row.message.slice(0, 80)}…`
                : row.message;
            return (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-white/5 transition-colors hover:bg-white/[0.03]",
                  isOpen && "bg-white/[0.04]"
                )}
              >
                <td className="px-4 py-3 text-white">{row.name}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{row.email}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">
                  {row.phone || "—"}
                </td>
                <td className="max-w-xs px-4 py-3 text-[#9CA3AF]">
                  <button
                    type="button"
                    className="text-left hover:text-accent"
                    onClick={() =>
                      setExpanded((id) => (id === row.id ? null : row.id))
                    }
                  >
                    {isOpen ? row.message : preview}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[#9CA3AF]">
                  {new Date(row.createdAt).toLocaleString("es-ES")}
                </td>
                <td className="px-4 py-3">
                  {row.read ? (
                    <Badge
                      variant="secondary"
                      className="border border-white/15 bg-white/5 text-[#9CA3AF]"
                    >
                      Leído
                    </Badge>
                  ) : (
                    <Badge className="border border-accent/30 bg-accent/15 text-accent">
                      Nuevo
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-white/15 text-xs text-[#9CA3AF]"
                    onClick={() => toggleRead(row.id, !!row.read)}
                  >
                    {row.read ? "Marcar no leído" : "Marcar leído"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 ? (
        <p className="p-8 text-center text-[#9CA3AF]">No hay contactos aún.</p>
      ) : null}
    </div>
  );
}
