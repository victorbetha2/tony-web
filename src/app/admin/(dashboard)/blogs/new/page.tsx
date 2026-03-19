import { auth } from "@/auth";
import { BlogForm } from "@/components/admin/blog-form";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Nuevo artículo | Admin T2B",
};

export default async function NewBlogPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  return <BlogForm mode="create" />;
}
