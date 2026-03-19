import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = {
    title: "Blog | T2B Team",
    description: "Artículos sobre finanzas, negocios y mentalidad.",
};

export const dynamic = "force-dynamic";

export default async function Blog() {
    const posts = await getAllPosts();

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatedSection className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-heading font-bold mb-6">Blog y Recursos</h1>
                        <p className="text-muted text-lg">
                            Aprende nuevas estrategias cada semana para mejorar tus finanzas personales, hacer crecer tu negocio y fortalecer tu mentalidad.
                        </p>
                    </AnimatedSection>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 text-muted">
                            <p>Proximamente nuevos artículos...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <AnimatedSection key={post.slug} delay={index * 0.1}>
                                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                                        <Card className="h-full flex flex-col overflow-hidden border-surface/50 group-hover:border-accent/50 transition-colors">
                                            <div className="h-48 bg-surface w-full relative overflow-hidden">
                                                {post.image ? (
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                                                        <div className="absolute inset-0 bg-surface flex items-center justify-center text-muted">
                                                            <span className="font-heading font-bold text-xl opacity-30">{post.category}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <CardContent className="p-6 flex-1 flex flex-col pt-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <Badge variant="secondary" className="bg-surface text-accent border border-accent/20">
                                                        {post.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted">{new Date(post.date).toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "numeric" })}</span>
                                                </div>
                                                <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-muted text-sm line-clamp-3 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <span className="text-accent text-sm font-medium mt-auto flex items-center group-hover:underline">
                                                    Leer artículo &rarr;
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
