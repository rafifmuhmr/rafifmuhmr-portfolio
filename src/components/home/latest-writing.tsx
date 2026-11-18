import {ArrowRightUpIcon} from "@solar-icons/react/linear";
import {getLocale, getTranslations} from "next-intl/server";
import {blogPosts, getReadingMinutes} from "@/config/blog";
import Image from "next/image";
import {Link} from "@/i18n/navigation";

export async function LatestWriting({all = false}: {all?: boolean} = {}) {
  const [t, locale] = await Promise.all([getTranslations("LatestWriting"), getLocale()]);
  const language = locale === "id" ? "id" : "en";
  const posts = all ? blogPosts : blogPosts.slice(0, 3);
  const date = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });

  return (
    <section id="blog" aria-labelledby="latest-writing-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="min-w-0 space-y-3">
          {all ? <h1 id="latest-writing-title" className="text-3xl font-semibold tracking-tight">{t("allTitle")}</h1> : <h2 id="latest-writing-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>}
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
        {!all && <Link href="/blog" className="inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {t("seeAll")}<ArrowRightUpIcon aria-hidden="true" className="size-4" />
        </Link>}
      </header>
      <ul className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="min-w-0">
            <article className="min-w-0">
            <Link href={{pathname: "/blog/[slug]", params: {slug: post.slug}}} className="group block w-full min-w-0 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] bg-muted px-6 text-center" aria-hidden="true">
                {post.cover ? <Image src={post.cover} alt="" fill sizes="(min-width: 1280px) 411px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : <span className="text-sm text-muted-foreground">{t("coverPending")}</span>}
              </div>
              <div className="mt-3 min-w-0">
                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <span className="inline-flex h-6 w-fit max-w-full items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"><span className="truncate">{post.category[language]}</span></span>
                  <time className="text-right text-sm whitespace-nowrap text-muted-foreground" dateTime={post.date}>{date.format(new Date(`${post.date}T00:00:00Z`))}</time>
                </div>
                <div className="mt-3 min-w-0 space-y-1">
                  <h3 className="line-clamp-2 wrap-break-word text-base font-medium leading-6 underline-offset-4 decoration-1 [text-decoration-skip-ink:none] group-hover:underline group-focus-visible:underline">{post.title[language]}</h3>
                  <p className="truncate text-sm leading-6 text-muted-foreground">{post.description[language]}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{t("readTime", {minutes: getReadingMinutes(post, language)})}</p>
                </div>
              </div>
            </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
