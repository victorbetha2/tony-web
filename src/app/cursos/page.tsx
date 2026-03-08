import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PiggyBank, Receipt, TrendingUp, Briefcase, GraduationCap, Building2 } from "lucide-react";

export const metadata = {
    title: "Cursos | T2B Team",
    description: "Aprende finanzas, inversión y negocios con nuestros cursos especializados.",
};

const courses = [
    {
        title: "Finanzas Personales desde Cero",
        desc: "Aprende a controlar tu dinero, elimina deudas y crea tu primer fondo de emergencia. El curso fundamental para tomar el control.",
        icon: PiggyBank,
        level: "Principiante",
        link: "#"
    },
    {
        title: "Sistema de Presupuesto Inteligente",
        desc: "Construye un sistema financiero personal que funcione en piloto automático para ti con la regla 50/30/20.",
        icon: Receipt,
        level: "Principiante",
        link: "#"
    },
    {
        title: "Inversión para Principiantes",
        desc: "Cómo empezar a invertir con poco dinero, entender la bolsa de valores y empezar a generar interés compuesto.",
        icon: TrendingUp,
        level: "Intermedio",
        link: "#"
    },
    {
        title: "Mentalidad de Emprendedor",
        desc: "Desarrolla la resiliencia, disciplina y enfoque necesarios para lanzar y escalar tu propio negocio con éxito.",
        icon: GraduationCap,
        level: "Intermedio",
        link: "#"
    },
    {
        title: "Finanzas para Negocios",
        desc: "Separa tus finanzas personales de las del negocio, aprende a leer estados financieros y mejora tu flujo de caja.",
        icon: Briefcase,
        level: "Avanzado",
        link: "#"
    },
    {
        title: "Bienes Raíces Fundamentos",
        desc: "Estrategias prácticas para invertir en propiedades, analizar el mercado y generar ingresos pasivos a largo plazo.",
        icon: Building2,
        level: "Avanzado",
        link: "#"
    }
];

export default function Cursos() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatedSection className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">Cursos y Programas</h1>
                        <p className="text-muted text-lg md:text-xl">
                            Nuestra academia está diseñada para llevarte paso a paso, desde ordenar tus finanzas personales hasta construir riqueza generacional.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <Card className="h-full flex flex-col group relative overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(2,132,199,0.2)]">
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform blur-xl" />

                                    <CardHeader className="relative z-10 flex-1">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                                                <course.icon size={28} />
                                            </div>
                                            <span className="text-xs font-medium text-muted bg-surface/50 px-3 py-1 rounded-full border border-surface">
                                                {course.level}
                                            </span>
                                        </div>
                                        <CardTitle className="text-2xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-hover transition-all">
                                            {course.title}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {course.desc}
                                        </CardDescription>
                                    </CardHeader>

                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
