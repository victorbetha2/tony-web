import { ContactsTable } from "@/components/admin/contacts-table";

export const metadata = {
  title: "Contactos | Admin T2B",
};

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold text-white">
        Mensajes de contacto
      </h1>
      <ContactsTable />
    </div>
  );
}
