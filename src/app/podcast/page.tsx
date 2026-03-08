import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PlayCircle, Mic } from "lucide-react";

export const metadata = {
    title: "Podcast | T2B Team",
    description: "Escucha nuestras conversaciones sobre finanzas, negocios y mentalidad.",
};

const episodesT2B = [
    {
        title: "No te deseo suerte",
        duration: "45 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=XV_yPQ95DpI&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8"
    },
    {
        title: "Adolescencia",
        duration: "52 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=5uNXbJEbHMU&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8&index=2"
    },
    {
        title: "Cuando te atrevas",
        duration: "38 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=8FmX52rZu5Q&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8&index=3"
    },
    {
        title: "Trastornos del Neurodesarrollo",
        duration: "42 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=XtCBOaA6XuY&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8&index=4"
    },
];

const episodesNegopoly = [
    {
        title: "📱 APPLE - Series The Magnificent 7",
        duration: "42 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=61k1dtrXKCs&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0"
    },
    {
        title: "📦 AMAZON - The Magnificent 7 Series",
        duration: "45 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=urDzBm4FQoU&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0&index=2"
    },
    {
        title: "🚘 TESLA – The Magnificent 7 Series",
        duration: "38 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=zfHY6G83wSg&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0&index=3"
    },
    {
        title: "🔴 1ero de Mayo⚒; Origen y Consecuencias",
        duration: "52 min",
        date: "Reciente",
        link: "https://www.youtube.com/watch?v=gmqMSbuQ9QY&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0&index=4"
    },
];

export default function Podcast() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatedSection className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">Nuestros Podcasts</h1>
                        <p className="text-muted text-lg md:text-xl">
                            Conversaciones profundas y estrategias prácticas para líderes, emprendedores y cualquier persona lista para transformar su vida financiera.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Podcast 1: Open Solo podcast */}
                        <AnimatedSection delay={0.1}>
                            <div className="bg-surface/30 border border-surface/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 relative z-10">
                                    <div className="w-24 h-24 rounded-2xl bg-surface border border-surface/50 flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden">
                                        <img
                                            src="/Open-podcast-b.png"
                                            alt="Open Solo podcast"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-heading font-bold mb-2">Open Solo podcast</h2>
                                        <p className="text-muted mb-4 max-w-sm">Conversaciones directas sobre finanzas prácticas, mentalidad y negocios.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a
                                                href="https://www.youtube.com/watch?v=XV_yPQ95DpI&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button size="sm" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white rounded-full">
                                                    YouTube
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <h3 className="font-heading font-semibold text-lg border-b border-surface/50 pb-2">Últimos Episodios</h3>
                                    {episodesT2B.map((ep, i) => (
                                        <a
                                            key={i}
                                            href={ep.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <div className="flex items-center justify-between p-4 hover:bg-surface/50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-surface">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                                        <PlayCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white group-hover:text-accent transition-colors">{ep.title}</p>
                                                        <p className="text-xs text-muted mt-1">{ep.date} • {ep.duration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Podcast 2: NEGOPOLY */}
                        <AnimatedSection delay={0.2}>
                            <div className="bg-surface/30 border border-surface/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 relative z-10">
                                    <div className="w-24 h-24 rounded-2xl bg-surface border border-surface/50 flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden">
                                        <img
                                            src="/Negopoly.png"
                                            alt="NEGOPOLY podcast"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-heading font-bold mb-2">NEGOPOLY</h2>
                                        <p className="text-muted mb-4 max-w-sm">Ideas y Liderazgo. Crecimiento personal, filosofía de vida y desarrollo profesional.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a
                                                href="https://www.youtube.com/watch?v=61k1dtrXKCs&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button size="sm" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white rounded-full">
                                                    YouTube
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <h3 className="font-heading font-semibold text-lg border-b border-surface/50 pb-2">Últimos Episodios</h3>
                                    {episodesNegopoly.map((ep, i) => (
                                        <a
                                            key={i}
                                            href={ep.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <div className="flex items-center justify-between p-4 hover:bg-surface/50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-surface">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                                        <PlayCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white group-hover:text-accent transition-colors">{ep.title}</p>
                                                        <p className="text-xs text-muted mt-1">{ep.date} • {ep.duration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
