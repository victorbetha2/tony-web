import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "./LeadForm";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Quiero más información | T2B Team",
  description:
    "Déjanos tus datos después del evento y te mostraremos la mejor ruta según tus metas: cursos, herramientas, mentoría o acompañamiento.",
};

export default function QuieroInformacionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-heading font-bold text-white leading-tight mb-4 text-balance">
                Estás a un paso de transformar tu forma de pensar, administrar y crecer
              </h1>
              <p className="text-muted text-base md:text-lg mb-6 leading-relaxed">
                Déjanos tus datos y te mostraremos la mejor ruta según tus metas: cursos,
                herramientas, mentoría o acompañamiento personalizado.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-1 text-sm md:text-base text-foreground/90 italic mb-8">
                En T2B ayudamos a personas, familias y emprendedores a tomar control de sus
                finanzas, desarrollar visión y construir una vida con más propósito.
              </blockquote>
              <div className="flex justify-center md:justify-start">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 bg-accent text-white hover:bg-accent-hover shadow-[0_0_15px_rgba(2,132,199,0.3)] hover:shadow-[0_0_20px_rgba(2,132,199,0.5)] border border-transparent px-6 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background scroll-smooth"
                >
                  Quiero más información
                  <ChevronDown className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>

            <div className="order-1 md:order-2 relative w-full max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-surface/50 shadow-[0_0_40px_rgba(2,132,199,0.12)]">
                <Image
                  src="/tony_Team.jpg"
                  alt="Tony de T2B Team compartiendo con un grupo en sesión de taller"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-14">
          <h2 className="text-center text-lg font-heading font-semibold text-white mb-6">
            Áreas en las que podemos acompañarte
          </h2>
          <p className="text-center text-muted text-sm max-w-xl mx-auto mb-8">
            Elige tu enfoque en el formulario más abajo; aquí tienes un vistazo rápido.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl mx-auto">
            {[
              "Finanzas personales",
              "Finanzas familiares",
              "Emprendimiento",
              "Desarrollo personal",
              "Liderazgo",
              "Ventas",
            ].map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-xl bg-surface/40 border border-surface/60 text-sm text-foreground/90"
              >
                {label}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <LeadForm />
        </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
