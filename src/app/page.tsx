import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContactForm } from "@/components/forms/contact-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  User, Users, LineChart,
  PiggyBank, Receipt, TrendingUp, Calculator,
  Mic, PlayCircle, ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/4 -right-[20%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 -left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-balance leading-[1.1] mb-6">
                Domina tus finanzas. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">Construye tu libertad.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted mb-8 text-balance max-w-xl">
                Educación financiera, emprendimiento y mentalidad para crear una vida con propósito. Aprende a administrar, invertir y multiplicar tu dinero.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/herramientas">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ver Herramientas
                  </Button>
                </Link>
                <Link href="#contacto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Contáctenos
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative hidden lg:block h-[600px]">
              {/* Replace with actual image when available, using placeholder gradient for now */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-surface to-accent/20 border border-surface/50 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://i0.wp.com/t2bteam.net/wp-content/uploads/2026/03/Eventos-3.png?resize=1024%2C1024&ssl=1')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CURSOS DESTACADOS */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Aprende a dominar tu dinero</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedSection delay={0.1}>
                <Card className="h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-surface/50 group-hover:text-accent/10 transition-colors pointer-events-none">
                    <PiggyBank size={120} />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl mb-2">Finanzas Personales</CardTitle>
                    <CardDescription>Aprende a controlar tu dinero desde cero, elimina deudas y crea tu primer fondo de emergencia.</CardDescription>
                  </CardHeader>

                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-surface/50 group-hover:text-accent/10 transition-colors pointer-events-none">
                    <Receipt size={120} />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl mb-2">Presupuesto Inteligente</CardTitle>
                    <CardDescription>Construye un sistema financiero personal que funcione en piloto automático para ti.</CardDescription>
                  </CardHeader>

                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Card className="h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-surface/50 group-hover:text-accent/10 transition-colors pointer-events-none">
                    <TrendingUp size={120} />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl mb-2">Inversión Principiantes</CardTitle>
                    <CardDescription>Cómo empezar a invertir con poco dinero, entender el mercado y generar interés compuesto.</CardDescription>
                  </CardHeader>

                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* MENTORÍA Y PODCAST */}
        <section className="py-24 bg-surface/20 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Mentoring */}
              <AnimatedSection>
                <h2 className="text-3xl font-heading font-bold mb-8">Acompañamiento personalizado</h2>
                <div className="bg-surface/40 rounded-2xl p-8 border border-surface/50">
                  <ul className="space-y-6 mb-8">
                    <li className="flex items-center gap-4 text-lg">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                        <User size={20} />
                      </div>
                      Mentoría financiera personal
                    </li>
                    <li className="flex items-center gap-4 text-lg">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                        <LineChart size={20} />
                      </div>
                      Mentoría para emprendedores
                    </li>
                    <li className="flex items-center gap-4 text-lg">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                        <Users size={20} />
                      </div>
                      Planificación financiera familiar
                    </li>
                  </ul>
                  <Link href="/contacto">
                    <Button className="w-full md:w-auto">Agendar sesión &rarr;</Button>
                  </Link>
                </div>
              </AnimatedSection>

              {/* Podcasts */}
              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl font-heading font-bold mb-8">Escucha nuestras conversaciones</h2>
                <div className="space-y-6">
                  {/* Podcast 1 */}
                  <a
                    href="https://www.youtube.com/watch?v=XV_yPQ95DpI&list=PLvkDJOzCzxOinpC7uzxPfmtqaKTJZ5XF8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="hover:-translate-y-2 transition-transform cursor-pointer overflow-hidden border-surface/50 hover:border-accent/50">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-surface border border-surface/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img
                            src="/Open-podcast-b.png"
                            alt="Open Solo podcast"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Open Solo podcast</CardTitle>
                          <CardDescription>Finanzas, mentalidad y negocios</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20">YouTube</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </a>

                  {/* Podcast 2 */}
                  <a
                    href="https://www.youtube.com/watch?v=61k1dtrXKCs&list=PLvkDJOzCzxOiYbH-PFWUq5M10ETN8mlC0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="hover:-translate-y-2 transition-transform cursor-pointer overflow-hidden border-surface/50 hover:border-accent/50">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-surface border border-surface/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img
                            src="/Negopoly.png"
                            alt="NEGOPOLY"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">NEGOPOLY</CardTitle>
                          <CardDescription>Ideas y Liderazgo</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20">YouTube</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* HERRAMIENTAS Y BLOG */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Herramientas */}
              <AnimatedSection>
                <h2 className="text-3xl font-heading font-bold mb-8">Herramientas financieras</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Calculadora de Préstamos",
                      desc: "Esta calculadora permite establecer el valor que va a tener la cuota de un crédito, tomando el monto a tomar prestado, la tasa de interés y el plazo.",
                      icon: Calculator,
                      link: "/herramientas/calculadora-prestamos"
                    },
                    {
                      title: "Calculadora de Ahorro",
                      desc: "Esta calculadora permite establecer el valor de tus ahorros en el tiempo.",
                      icon: PiggyBank,
                      link: "/herramientas/calculadora-ahorro"
                    },
                  ].map((tool, i) => (
                    <Link href={tool.link} key={i}>
                      <Card className="hover:-translate-y-1 hover:border-accent/40 cursor-pointer h-full">
                        <CardHeader className="p-5">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-3">
                            <tool.icon size={20} className="text-accent" />
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed">{tool.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))
                  }
                </div>
              </AnimatedSection>

              {/* Blog Preview */}
              <AnimatedSection delay={0.2}>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-heading font-bold">Aprende cada semana</h2>
                  <Link href="/blog" className="text-accent hover:text-accent-hover font-medium text-sm flex items-center">
                    Ver todo <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Blog Post Card 1 */}
                  <Link href="/blog/5-pequenos-habitos-que-pueden-transformar-tus-finanzas" className="group block h-full">
                    <Card className="h-full flex flex-col overflow-hidden border-surface/50 group-hover:border-accent/50 transition-colors">
                      <div className="h-48 bg-surface w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                        <img
                          src="/images/blog/5-habitos-finanzas.png"
                          alt="Hábitos financieros"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <Badge className="w-fit mb-3">Finanzas</Badge>
                        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          5 Pequeños Hábitos que Pueden Transformar tus Finanzas
                        </h3>
                        <p className="text-muted text-sm mt-auto">07 Mar, 2024</p>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Blog Post Card 2 */}
                  <Link href="/blog/7-pasos-para-una-planificacion-estrategica-imbatible" className="group block h-full">
                    <Card className="h-full flex flex-col overflow-hidden border-surface/50 group-hover:border-accent/50 transition-colors">
                      <div className="h-48 bg-surface w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                        <img
                          src="/images/blog/7-pasos-planificacion.png"
                          alt="Planificación Estratégica"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <Badge className="w-fit mb-3">Negocios</Badge>
                        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          7 Pasos para una Planificación Estratégica Imbatible
                        </h3>
                        <p className="text-muted text-sm mt-auto">08 Mar, 2024</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CHARLAS Y CONFERENCIAS */}
        <section className="py-24 bg-gradient-to-b from-transparent to-surface/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent to-transparent mix-blend-screen" />
          </div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-surface/40 border border-surface/50 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
              <AnimatedSection className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Charlas y conferencias</h2>
                <p className="text-muted text-lg mb-8 max-w-md">
                  Ayudando a miles de personas a entender su dinero, crear negocios escalables y vivir con propósito.
                </p>
                <Link href="/contacto">
                  <Button size="lg">Conócenos</Button>
                </Link>
              </AnimatedSection>
              <AnimatedSection delay={0.2} className="md:w-1/2 w-full flex justify-center md:justify-end">
                <div className="w-full max-w-sm aspect-square bg-gradient-to-tr from-surface to-accent/20 rounded-2xl overflow-hidden relative shadow-2xl">
                  <img
                    src="/Eventos-T2B2.png"
                    alt="Charlas y conferencias de T2B Team"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-24 relative z-10 scroll-mt-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">¿Estás listo para dar el siguiente paso?</h2>
                <p className="text-muted text-lg">Escríbenos y nuestro equipo se pondrá en contacto contigo lo más rápido posible.</p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
