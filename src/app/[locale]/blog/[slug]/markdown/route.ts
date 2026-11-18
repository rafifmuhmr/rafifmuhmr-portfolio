import {blogPosts} from "@/config/blog";
import {blogMarkdown} from "@/lib/blog-markdown";

export async function GET(_request: Request, {params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post || (locale !== "en" && locale !== "id")) return new Response("Not found", {status: 404});
  return new Response(blogMarkdown(post, locale), {headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
  }});
}
