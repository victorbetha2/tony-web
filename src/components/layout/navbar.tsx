"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Mic, Book, User, UserPlus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/herramientas", label: "Herramientas", icon: Wrench },
    { href: "/podcast", label: "Podcast", icon: Mic },
    { href: "/blog", label: "Blog", icon: Book },
    { href: "/quiero-informacion", label: "Inscribite", icon: UserPlus },
    { href: "/contacto", label: "Contacto", icon: User },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] md:w-auto flex justify-center">
            {/* Desktop & Tablet Navbar (Pill Shape) */}
            <nav className="flex items-center gap-1 md:gap-2 px-2 py-2 bg-[#141414]/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl justify-between w-full md:w-auto">
                {/* Home */}
                <Link
                    href="/"
                    className={cn(
                        "flex shrink-0 items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full text-white transition-all duration-300 overflow-hidden",
                        pathname === "/" ? "bg-white/20 shadow-inner" : "bg-white/5 hover:bg-white/15"
                    )}
                >
                    <img
                        src="/cropped-T2B-Orilla.png"
                        alt="T2B Logo"
                        className="w-7 h-7 object-contain"
                    />
                </Link>

                <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2 hidden sm:block"></div>

                {/* Main Links */}
                <div className="hidden sm:flex items-center gap-1 md:gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-muted hover:text-white hover:bg-white/5"
                                )}
                            >
                                <link.icon size={16} className={isActive ? "text-accent" : ""} />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions (Menu) */}
                <div className="flex items-center">
                    {/* Mobile Toggle */}
                    <button
                        className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <div
                className={cn(
                    "fixed inset-0 top-[80px] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out sm:hidden rounded-3xl mx-4 shadow-2xl border border-white/10",
                    mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto h-[70vh]" : "-translate-y-4 opacity-0 pointer-events-none h-0"
                )}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-2xl font-heading font-bold hover:text-accent transition-colors flex items-center gap-3"
                    >
                        <link.icon size={24} />
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}
