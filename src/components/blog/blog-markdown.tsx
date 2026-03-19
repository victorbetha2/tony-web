import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ className, ...props }) => (
    <h2
      className={`text-3xl font-heading font-bold mt-12 mb-6 ${className ?? ""}`}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={`text-2xl font-heading font-semibold mt-8 mb-4 border-b border-surface/50 pb-2 ${className ?? ""}`}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={`text-lg text-muted/90 mb-6 leading-relaxed ${className ?? ""}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={`list-disc pl-6 mb-6 text-muted/90 space-y-2 ${className ?? ""}`}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={`list-decimal pl-6 mb-6 text-muted/90 space-y-2 ${className ?? ""}`}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={`pl-2 ${className ?? ""}`} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={`border-l-4 border-accent pl-6 italic text-xl my-8 text-white/90 bg-surface/30 p-6 rounded-r-2xl ${className ?? ""}`}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={`text-accent underline hover:text-accent-hover transition-colors font-medium cursor-pointer ${className ?? ""}`}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={`font-semibold text-white ${className ?? ""}`} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`rounded-xl border border-surface/50 my-8 max-w-full h-auto ${className ?? ""}`}
      alt={alt ?? ""}
      {...props}
    />
  ),
};

export function BlogMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
