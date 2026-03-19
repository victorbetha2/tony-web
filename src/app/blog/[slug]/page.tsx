import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import Link from "next/link";
import { Calendar, ArrowLeft, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    try {
        const { slug } = await params;
        const post = await getPostBySlug(slug);
        return {
            title: `${post.title} | T2B Team`,
            description: post.excerpt,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                images: [`/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`],
            },
        };
    } catch (e: unknown) {
        console.error(e);
        return { title: "Blog | T2B Team" };
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    let post;
    try {
        post = await getPostBySlug(slug);
    } catch (error: unknown) {
        console.error(error);
        notFound();
    }

    // Get reading time estimate (words / 200 = minutes)
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-32 pb-24">
                {/* Post Hero */}
                <section className="mb-16 relative">
                    <div className="container mx-auto px-6 max-w-4xl relative z-10">
                        <Link href="/blog" className="inline-flex items-center text-accent hover:text-accent-hover mb-8 transition-colors font-medium">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Volver al Blog
                        </Link>

                        <AnimatedSection>
                            <div className="flex flex-wrap gap-4 items-center mb-6">
                                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-3 py-1 text-sm">
                                    {post.category}
                                </Badge>
                                <span className="flex items-center text-muted text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(post.date).toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })}
                                </span>
                                <span className="text-muted text-sm">• {readingTime} min de lectura</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-8 leading-[1.1]">
                                {post.title}
                            </h1>

                            {/* Author info */}
                            <div className="flex items-center gap-4 py-6 border-y border-surface/50">
                                <div className="w-12 h-12 rounded-full bg-surface border border-surface/50 overflow-hidden flex items-center justify-center shadow-lg shadow-accent/10">
                                    <img
                                        src="/cropped-T2B-Orilla.png"
                                        alt="T2B Team"
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="font-heading font-semibold text-white">T2B Team</p>
                                    <p className="text-sm text-muted">Educación Financiera</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Post Image Hero */}
                <div className="container mx-auto px-6 max-w-5xl mb-16">
                    <AnimatedSection delay={0.1}>
                        <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative border border-surface/50">
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={`/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Content & Sidebar */}
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 relative">

                        {/* Share Sidebar (Sticky Desktop) */}
                        <div className="hidden lg:block w-16 flex-shrink-0">
                            <div className="sticky top-32 flex flex-col gap-4">
                                <span className="text-xs font-semibold text-muted uppercase tracking-widest text-center mb-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Compartir</span>
                                <button type="button" className="w-12 h-12 rounded-full bg-surface border border-surface/50 flex items-center justify-center text-muted hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10 transition-all">
                                    <Twitter size={20} />
                                </button>
                                <button type="button" className="w-12 h-12 rounded-full bg-surface border border-surface/50 flex items-center justify-center text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all">
                                    <Linkedin size={20} />
                                </button>
                                <button type="button" className="w-12 h-12 rounded-full bg-surface border border-surface/50 flex items-center justify-center text-muted hover:text-white hover:border-white/50 transition-all">
                                    <LinkIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <AnimatedSection delay={0.2} className="flex-1 max-w-3xl">
                            <article className="prose prose-invert prose-lg max-w-none">
                                <BlogMarkdown source={post.content} />
                            </article>
                        </AnimatedSection>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
