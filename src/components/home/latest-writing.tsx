import {ArrowRightUpIcon} from "@solar-icons/react/linear";
import {getLocale, getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

// Temporary layout examples, not published posts. Replace with CMS articles.
const previews = ["design", "development", "thoughts"] as const;

export async function LatestWriting() {
  const [t, locale] = await Promise.all([getTranslations("LatestWriting"), getLocale()]);
  const date = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  }).format(new Date("2026-11-18T00:00:00Z"));

  return (
    <section id="writing" aria-labelledby="latest-writing-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <h2 id="latest-writing-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {t("seeAll")}<ArrowRightUpIcon aria-hidden="true" className="size-4" />
        </Link>
      </header>
      <p className="mb-4 text-xs text-muted-foreground">{t("previewNotice")}</p>
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {previews.map((key) => (
          <li key={key}>
            <article className="min-w-0">
            <Link href="/blog" className="group block rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] bg-muted px-6 text-center" aria-hidden="true">
                <span className="text-sm text-muted-foreground">{t("coverPending")}</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex w-fit items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">{t(`examples.${key}.category`)}</span>
                  <time className="shrink-0 text-sm text-muted-foreground" dateTime="2026-11-18">{date}</time>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="line-clamp-2 text-base font-medium leading-6 underline-offset-4 decoration-1 [text-decoration-skip-ink:none] group-hover:underline group-focus-visible:underline">{t(`examples.${key}.title`)}</h3>
                  <p className="truncate text-sm leading-6 text-muted-foreground">{t(`examples.${key}.description`)}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{t("readTime", {minutes: key === "design" ? 5 : key === "development" ? 4 : 3})}</p>
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
