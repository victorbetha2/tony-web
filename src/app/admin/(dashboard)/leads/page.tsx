import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { LeadsTable } from "@/components/admin/leads-table";

export const metadata = {
  title: "Leads (eventos) | Admin T2B",
};

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-3xl font-bold text-white">
          Leads post-evento
        </h1>
        <a
          href="/quiero-informacion"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
        >
          Abrir landing pública
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <p className="text-sm text-[#9CA3AF]">
        Envíos desde{" "}
        <Link href="/quiero-informacion" className="text-accent hover:underline">
          /quiero-informacion
        </Link>
        . Úsala en conferencias para captar interesados.
      </p>
      <LeadsTable />
    </div>
  );
}
