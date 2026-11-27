import BehanceIcon from "@thesvg/react/behance";
import DribbbleIcon from "@thesvg/react/dribbble";
import { ArrowRightUpIcon, LinkIcon } from "@solar-icons/react/linear";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { StackIcon } from "@/components/home/stack-icon";
import { pendingMetadata, type PendingPageProps } from "@/components/pages/pending-page";
import { routing } from "@/i18n/routing";

const brandIcons = { behance: BehanceIcon, dribbble: DribbbleIcon };

const groups = [
  { category: "design", items: [
    { id: "figma", title: "Figma Community", href: "https://www.figma.com/community", icon: "figma" },
    { id: "mobbin", title: "Mobbin", href: "https://mobbin.com/" },
    { id: "pageflows", title: "Page Flows", href: "https://pageflows.com/" },
    { id: "behance", title: "Behance", href: "https://www.behance.net/", icon: "behance" },
    { id: "dribbble", title: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
  ] },
  { category: "frontend", items: [
    { id: "shadcn", title: "shadcn/ui", href: "https://ui.shadcn.com/", icon: "shadcn-ui" },
    { id: "tailwind", title: "Tailwind CSS", href: "https://tailwindcss.com/docs", icon: "tailwind-css" },
    { id: "mdn", title: "MDN Web Docs", href: "https://developer.mozilla.org/en-US/docs/Web" },
    { id: "nextjs", title: "Next.js Docs", href: "https://nextjs.org/docs/app", icon: "nextdotjs" },
    { id: "hairline", title: "Hairline UI", href: "https://hairlineui.com/" },
  ] },
  { category: "inspiration", items: [
    { id: "chanhdai", title: "Chánh Đại", href: "https://chanhdai.com/" },
    { id: "tailark", title: "Tailark", href: "https://tailark.com/" },
    { id: "landbook", title: "Landbook", href: "https://land-book.com/" },
    { id: "godly", title: "Godly", href: "https://godly.website/" },
    { id: "nuha", title: "Nuha Maulana", href: "https://www.nuhamaulana.com/bookmark" },
  ] },
] as const;

export async function generateMetadata(props: PendingPageProps) {
  return pendingMetadata(props, "bookmarks", "/bookmarks");
}

export default async function BookmarksPage({ params }: PendingPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [nav, t] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("BookmarksPage"),
  ]);

  return (
    <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="section-gap mx-auto flex max-w-7xl flex-col py-6 sm:py-8 lg:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{nav("bookmarks")}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </header>

        <div className="divide-y divide-border border-y border-border">
          {groups.map(({ category, items }) => (
            <section key={category} aria-labelledby={`bookmarks-${category}`} className="grid gap-4 py-6 lg:grid-cols-3 lg:gap-6 lg:py-8">
              <h2 id={`bookmarks-${category}`} className="text-xl font-semibold tracking-tight">
                {t(`categories.${category}`)}
              </h2>
              <ul className="flex min-w-0 flex-col gap-4 lg:col-span-2">
                {items.map((item) => {
                  const BrandIcon = item.id === "behance" || item.id === "dribbble" ? brandIcons[item.id] : null;

                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group group/stack flex w-fit max-w-full flex-col gap-1 rounded-sm text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <span className="grid size-5 shrink-0 place-items-center text-muted-foreground [&>span]:size-full" aria-hidden>
                            {BrandIcon ? (
                            <BrandIcon className="size-5 grayscale transition-[filter] group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none" />
                          ) : "icon" in item ? <StackIcon name={item.icon} /> : <LinkIcon className="size-5" />}
                          </span>
                          <span className="min-w-0 underline-offset-4 group-hover:underline group-focus-visible:underline">{item.title}</span>
                          <ArrowRightUpIcon className="size-3 shrink-0 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground" aria-hidden />
                        </span>
                        <span className="block pl-7 leading-6 text-muted-foreground">{t(`items.${item.id}`)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
