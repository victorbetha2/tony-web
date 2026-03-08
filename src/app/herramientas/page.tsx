import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Calculator, PiggyBank, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Herramientas | T2B Team",
    description: "Utiliza nuestras calculadoras financieras para planificar tu futuro económico.",
};

const tools = [
    {
        title: "Calculadora de Ahorro",
        desc: "Proyecta el crecimiento de tus ahorros con interés compuesto, aportaciones mensuales y diferentes tasas de rendimiento.",
        icon: PiggyBank,
        link: "/herramientas/calculadora-ahorro"
    },
    {
        title: "Calculadora de Préstamos",
        desc: "Calcula las cuotas de tus créditos, entiende cómo se distribuyen los intereses y planifica tus pagos de forma inteligente.",
        icon: Calculator,
        link: "/herramientas/calculadora-prestamos"
    }
];

export default function Herramientas() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatedSection className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">Herramientas Financieras</h1>
                        <p className="text-muted text-lg md:text-xl text-balance">
                            Simuladores y calculadoras diseñadas para ayudarte a tomar mejores decisiones financieras y visualizar tu progreso.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tools.map((tool, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <Link href={tool.link}>
                                    <Card className="h-full flex flex-col group relative overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(2,132,199,0.2)] cursor-pointer">
                                        <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform blur-xl" />

                                        <CardHeader className="relative z-10 flex-1 p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                                                    <tool.icon size={28} />
                                                </div>
                                                <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight size={24} />
                                                </div>
                                            </div>
                                            <CardTitle className="text-2xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-hover transition-all">
                                                {tool.title}
                                            </CardTitle>
                                            <CardDescription className="text-base leading-relaxed">
                                                {tool.desc}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
