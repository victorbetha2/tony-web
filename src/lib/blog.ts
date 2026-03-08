import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    content: string;
    image?: string;
}

export function getBlogSlugs() {
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }
    return fs.readdirSync(blogDirectory).filter(file => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): BlogPost {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        category: data.category as string,
        image: data.image as string || undefined,
        content,
    };
}

export function getAllPosts(): BlogPost[] {
    const slugs = getBlogSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getCategories(): string[] {
    const posts = getAllPosts();
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories);
}
