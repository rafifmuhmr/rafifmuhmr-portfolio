import type {Metadata} from "next";
import Image from "next/image";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {blogPosts, getReadingMinutes} from "@/config/blog";
import {isPreview, site} from "@/config/site";
import {routing} from "@/i18n/routing";
import {ProjectPageActions} from "@/components/home/project-page-actions";
import {Separator} from "@/components/ui/separator";
import {BlogBreadcrumb} from "@/components/blog/blog-breadcrumb";
import {TableOfContents} from "@/components/blog/table-of-contents";
import {DetailNavigation} from "@/components/navigation/detail-navigation";
import {blogMarkdown, blogUrl} from "@/lib/blog-markdown";

type Props = {params: Promise<{locale: string; slug: string}>};

export function generateStaticParams() {
  return blogPosts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const url = blogUrl(post, locale);
  return {
    title: post.title[locale], description: post.description[locale],
    alternates: {canonical: url, languages: {en: blogUrl(post, "en"), id: blogUrl(post, "id")}},
    robots: {index: !post.preview && !isPreview, follow: !isPreview},
    openGraph: {type: "article", url, siteName: site.name, title: post.title[locale], description: post.description[locale], authors: [site.owner], publishedTime: post.date, locale: locale === "id" ? "id_ID" : "en_US", ...(post.cover ? {images: [{url: new URL(post.cover, site.url).href, alt: post.coverAlt[locale]}]} : {})},
    twitter: {card: "summary_large_image", title: post.title[locale], description: post.description[locale], ...(post.cover ? {images: [new URL(post.cover, site.url).href]} : {})},
  };
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("BlogDetail");
  const index = blogPosts.indexOf(post);
  const previous = blogPosts[index - 1];
  const next = blogPosts[index + 1];
  const adjacent = (item: typeof previous) => item ? {slug: item.slug, title: item.title[locale]} : null;
  const date = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${post.date}T00:00:00Z`));

  const contents = [...post.sections.map((section) => ({id: section.id, title: section.title[locale]})), ...(post.references.length ? [{id: "references", title: t("references")}] : [])];
  const author = <div className="flex items-center gap-3">
    <Image src="/images/rafifmuhmr-pp.png" alt="" width={40} height={40} className="size-8 shrink-0 rounded-lg object-cover sm:size-10" />
    <p className="min-w-0 text-sm font-medium leading-6">{site.owner}</p>
  </div>;

  return <main className="w-full px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:pt-30">
    {!post.preview && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title[locale], description: post.description[locale],
      datePublished: post.date, inLanguage: locale, mainEntityOfPage: blogUrl(post, locale), url: blogUrl(post, locale),
      author: {"@type": "Person", name: site.owner, url: `${site.url}/${locale}`},
      ...(post.cover ? {image: new URL(post.cover, site.url).href} : {}),
      citation: post.references.map((reference) => reference.url),
    }).replace(/</g, "\\u003c")}} />}
    <div className="mx-auto w-full max-w-7xl space-y-8 sm:space-y-12">
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
        <BlogBreadcrumb title={post.title[locale]} label={t("breadcrumb")} />
        <ProjectPageActions kind="article" title={post.title[locale]} url={blogUrl(post, locale)} markdownUrl={`/${locale}/blog/${post.slug}/markdown`} markdown={blogMarkdown(post, locale)} previous={adjacent(previous)} next={adjacent(next)} />
      </div>
      <article className="grid min-w-0 grid-cols-1 items-start gap-y-8 sm:gap-y-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-x-12 xl:gap-x-16">
        <header className="min-w-0 space-y-6 lg:col-start-1 lg:row-start-1">
          <span className="inline-flex h-6 items-center rounded-md border border-border bg-muted/50 px-2 text-xs font-medium text-muted-foreground">{post.category[locale]}</span>
          <div className="space-y-4">
            <h1 className="text-3xl font-medium leading-tight tracking-tight wrap-break-word sm:text-4xl lg:text-5xl">{post.title[locale]}</h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{post.description[locale]}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>{date}</time>
            <Separator orientation="vertical" className="h-4 self-center!" />
            <span>{t("readTime", {minutes: getReadingMinutes(post, locale)})}</span>
          </div>
          <div className="lg:hidden">{author}</div>
        </header>
        <details className="min-w-0 lg:hidden">
          <summary className="cursor-pointer text-sm font-medium">{t("onThisPage")}</summary>
          <div className="pt-4"><TableOfContents items={contents} label={t("onThisPage")} /></div>
        </details>
        <div className="min-w-0 space-y-8 sm:space-y-12 lg:col-start-1 lg:row-start-2">
        <figure className="space-y-3">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[12px] bg-muted px-6 text-center">
            {post.cover ? <Image src={post.cover} alt={post.coverAlt[locale]} fill sizes="(min-width: 1280px) 960px, (min-width: 1024px) 70vw, 100vw" className="object-cover" /> : <span className="text-sm text-muted-foreground">{t("coverPending")}</span>}
          </div>
          {post.cover && <figcaption className="text-xs leading-5 text-muted-foreground">{t("photoBy")} <a href={post.coverCredit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">{post.coverCredit.name} / Unsplash</a></figcaption>}
        </figure>
        <div className="min-w-0 space-y-10 sm:space-y-12">
          {post.sections.map((section) => <section key={section.id} aria-labelledby={section.id} className="space-y-4">
            <h2 id={section.id} tabIndex={-1} className="scroll-mt-56 outline-none text-xl font-semibold tracking-tight sm:text-2xl">{section.title[locale]}</h2>
            {section.paragraphs[locale].map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
          </section>)}
          {post.references.length > 0 && <section aria-labelledby="references" className="space-y-4">
            <h2 id="references" tabIndex={-1} className="scroll-mt-56 text-xl font-semibold tracking-tight outline-none sm:text-2xl">{t("references")}</h2>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {post.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">{reference.title}</a></li>)}
            </ul>
          </section>}
          <DetailNavigation pathname="/blog/[slug]" label={t("articleNavigation")}
            previousLabel={t("previous")} nextLabel={t("next")}
            previous={adjacent(previous)} next={adjacent(next)} />
        </div>
        </div>
        <aside className="hidden h-full min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:block">
          <div className="sticky top-52 max-h-[calc(100dvh-14rem)] space-y-8 overflow-y-auto pr-1 pb-2">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">{t("onThisPage")}</h2>
              <TableOfContents items={contents} label={t("onThisPage")} />
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">{t("writtenBy")}</h2>
              {author}
            </div>
          </div>
        </aside>
      </article>
    </div>
  </main>;
}
