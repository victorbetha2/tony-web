"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, LogOut, LayoutDashboard, BookOpen, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/contacts", label: "Contactos", icon: Mail },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1 p-4">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-accent/15 text-accent border border-accent/30"
                : "text-[#9CA3AF] hover:bg-white/5 hover:text-white border border-transparent"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#171717] transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
            <img src="/cropped-T2B-Orilla.png" alt="T2B" className="h-9 w-9 object-contain" />
            <div>
              <p className="font-heading text-sm font-bold tracking-tight">T2B Team</p>
              <p className="text-xs text-[#9CA3AF]">Admin</p>
            </div>
          </div>
          <NavLinks onNavigate={() => setOpen(false)} />
          <div className="mt-auto border-t border-white/10 p-4">
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/15 text-[#9CA3AF] hover:text-white hover:bg-white/5"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/10 bg-[#0B0B0B]/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-white hover:bg-white/10"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="flex-1 text-center font-heading text-sm font-semibold text-[#9CA3AF]">
            Panel
          </span>
          <div className="w-10 shrink-0" aria-hidden />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
