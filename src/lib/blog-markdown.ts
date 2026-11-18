import {site} from "@/config/site";
import {getReadingMinutes, type BlogLocale, type BlogPost} from "@/config/blog";

export function blogUrl(post: BlogPost, locale: BlogLocale) {
  return `${site.url}/${locale}/blog/${post.slug}`;
}

export function blogMarkdown(post: BlogPost, locale: BlogLocale) {
  const id = locale === "id";
  return [
    `# ${post.title[locale]}`, "",
    ...(post.preview ? [id ? "> Contoh artikel untuk pratinjau layout; belum diterbitkan." : "> Sample article for layout preview; not published.", ""] : []),
    post.description[locale], "",
    `- ${id ? "Penulis" : "Author"}: ${site.owner}`,
    `- ${id ? "Tanggal" : "Date"}: ${post.date}`,
    `- ${id ? "Kategori" : "Category"}: ${post.category[locale]}`,
    `- ${id ? "Waktu baca" : "Reading time"}: ${getReadingMinutes(post, locale)} ${id ? "menit" : "min"}`,
    `- URL: ${blogUrl(post, locale)}`, "",
    ...(post.cover ? [`![${post.coverAlt[locale]}](${new URL(post.cover, site.url).href})`, ""] : []),
    ...post.sections.flatMap((section) => [`## ${section.title[locale]}`, "", ...section.paragraphs[locale].flatMap((paragraph) => [paragraph, ""])]),
    ...(post.references.length ? [`## ${id ? "Referensi" : "References"}`, "", ...post.references.map((reference) => `- [${reference.title}](${reference.url})`), ""] : []),
    ...(post.cover ? [`${id ? "Foto oleh" : "Photo by"} [${post.coverCredit.name} / Unsplash](${post.coverCredit.url}) · [Unsplash License](${post.coverCredit.license})`, ""] : []),
  ].join("\n");
}
