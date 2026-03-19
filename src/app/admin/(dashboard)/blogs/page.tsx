import { BlogsTable } from "@/components/admin/blogs-table";

export const metadata = {
  title: "Blogs | Admin T2B",
};

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold text-white">Blog</h1>
      <BlogsTable />
    </div>
  );
}
