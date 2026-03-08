import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
    title: "Contacto | T2B Team",
    description: "Ponte en contacto con el equipo de T2B Team. Estamos aquí para ayudarte.",
};

export default function Contacto() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Hablemos de tus metas</h1>
                        <p className="text-muted text-lg">
                            Si tienes preguntas sobre nuestros cursos, servicios de mentoría o simplemente quieres saludar, llena el formulario y te responderemos pronto.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <AnimatedSection delay={0.1} className="lg:col-span-1 space-y-8">
                            <div className="p-6 bg-surface/30 rounded-2xl border border-surface/50 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mb-4">
                                    <Mail size={24} />
                                </div>
                                <h3 className="font-heading font-semibold text-xl mb-2">Email</h3>
                                <p className="text-muted mb-4">Escríbenos directamente a nuestro correo.</p>
                                <a href="mailto:contacto@t2bteam.net" className="text-accent hover:text-accent-hover font-medium">contacto@t2bteam.net</a>
                            </div>

                            <div className="p-6 bg-surface/30 rounded-2xl border border-surface/50 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mb-4">
                                    <Phone size={24} />
                                </div>
                                <h3 className="font-heading font-semibold text-xl mb-2">Teléfono</h3>
                                <p className="text-muted mb-4">Llámanos o escríbenos por WhatsApp para una atención rápida.</p>
                                <a href="tel:+50432664877" className="text-accent hover:text-accent-hover font-medium">+504 3266-4877</a>
                            </div>

                            <div className="p-6 bg-surface/30 rounded-2xl border border-surface/50 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mb-4">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="font-heading font-semibold text-xl mb-2">Ubicación</h3>
                                <p className="text-muted mb-4">Trabajamos de forma remota para llegar a toda la comunidad hispana en el mundo.</p>
                                <span className="text-white font-medium">100% Online</span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2} className="lg:col-span-2">
                            <ContactForm />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
