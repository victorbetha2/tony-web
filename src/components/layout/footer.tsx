import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { TikTokIcon } from "@/components/ui/tiktok-icon";

export function Footer() {
    return (
        <footer className="bg-surface border-t border-surface/50 pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <img
                                src="/cropped-T2B-Orilla.png"
                                alt="T2B Team"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mb-6">
                            Educación financiera, emprendimiento y mentalidad para crear una vida con propósito y libertad.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/tonyt2b/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.youtube.com/@TonyT2B" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <Youtube size={20} />
                            </a>
                            <a href="https://www.facebook.com/TonyT2B" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.tiktok.com/@tonyt2b" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <TikTokIcon className="w-5 h-5 fill-current" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">Enlaces</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="text-muted hover:text-white transition-colors">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/herramientas" className="text-muted hover:text-white transition-colors">Herramientas</Link>
                            </li>
                            <li>
                                <Link href="/podcast" className="text-muted hover:text-white transition-colors">Podcast</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted hover:text-white transition-colors">Blog</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">Contacto</h3>
                        <p className="text-muted text-sm mb-2">
                            <a href="mailto:info@t2bteam.net" className="hover:text-white transition-colors">
                                info@t2bteam.net
                            </a>
                        </p>
                        <p className="text-muted text-sm mb-6">
                            <a href="tel:+50432664877" className="hover:text-white transition-colors">
                                +504 3266-4877
                            </a>
                        </p>
                        <Link href="/contacto" className="text-accent text-sm hover:text-accent-hover transition-colors font-medium">
                            Escríbenos un mensaje &rarr;
                        </Link>
                    </div>
                </div>

                <div className="border-t border-surface/50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted">
                    <p>&copy; {new Date().getFullYear()} T2B Team. Todos los derechos reservados.</p>
                    <p className="mt-2 md:mt-0">
                        Diseñado para la excelencia de los negocios. Página diseñada por{" "}
                        <a
                            href="https://uniklabs.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline transition-all"
                        >
                            UnikLabs
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
