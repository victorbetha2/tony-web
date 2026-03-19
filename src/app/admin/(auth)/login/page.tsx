import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin | T2B Team",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4">
      <AdminLoginForm />
    </div>
  );
}
