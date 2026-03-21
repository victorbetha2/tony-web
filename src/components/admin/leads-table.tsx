"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LeadRow = {
  id: string;
  createdAt: string;
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  areaInteres: string;
  etapaActual: string;
  comoConocio: string | null;
  nombreEvento: string | null;
  mensaje: string | null;
  ipAddress: string | null;
  recaptchaScore: number | null;
};

export function LeadsTable() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("No se pudieron cargar los leads");
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

  if (rows.length === 0) {
    return <p className="p-8 text-center text-[#9CA3AF]">Aún no hay leads capturados.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead className="border-b border-white/10 bg-[#171717] text-[#9CA3AF]">
          <tr>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Teléfono</th>
            <th className="px-4 py-3 font-medium">País</th>
            <th className="px-4 py-3 font-medium">Área</th>
            <th className="px-4 py-3 font-medium">Etapa</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isOpen = expanded === row.id;
            const dateStr = new Date(row.createdAt).toLocaleString("es", {
              dateStyle: "short",
              timeStyle: "short",
            });
            return (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-white/5 transition-colors hover:bg-white/[0.03]",
                  isOpen && "bg-white/[0.04]"
                )}
              >
                <td className="px-4 py-3 text-white">{row.nombre}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{row.email}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{row.telefono}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{row.pais}</td>
                <td className="px-4 py-3 text-white">{row.areaInteres}</td>
                <td className="max-w-[200px] px-4 py-3 text-[#9CA3AF]">
                  {row.etapaActual}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[#9CA3AF]">
                  {dateStr}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="text-accent hover:underline"
                    onClick={() => setExpanded(isOpen ? null : row.id)}
                  >
                    {isOpen ? "Ocultar" : "Ver"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {expanded ? (
        <div className="border-t border-white/10 bg-[#141414] p-4 text-sm text-[#9CA3AF]">
          {(() => {
            const row = rows.find((r) => r.id === expanded);
            if (!row) return null;
            return (
              <dl className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-white/70">Mensaje</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-white/90">
                    {row.mensaje?.trim() || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70">Cómo nos conoció</dt>
                  <dd>{row.comoConocio || "—"}</dd>
                </div>
                <div>
                  <dt className="text-white/70">Evento</dt>
                  <dd>{row.nombreEvento || "—"}</dd>
                </div>
                <div>
                  <dt className="text-white/70">IP</dt>
                  <dd>{row.ipAddress || "—"}</dd>
                </div>
                <div>
                  <dt className="text-white/70">reCAPTCHA score</dt>
                  <dd>
                    {row.recaptchaScore != null
                      ? row.recaptchaScore.toFixed(3)
                      : "—"}
                  </dd>
                </div>
              </dl>
            );
          })()}
        </div>
      ) : null}
    </div>
  );
}
