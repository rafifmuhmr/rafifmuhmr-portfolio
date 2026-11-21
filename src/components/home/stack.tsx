import {getTranslations} from "next-intl/server";
import {stackGroups} from "@/config/stack";
import {StackIcon} from "./stack-icon";

export async function Stack() {
  const t = await getTranslations("Stack");
  return (
    <section id="stack" aria-labelledby="stack-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 space-y-3">
        <h2 id="stack-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
      </header>
      <div>
        {stackGroups.map((group, index) => (
          <div key={group.key} className="grid gap-y-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[12rem_minmax(0,1fr)]">
            <h3 id={`stack-${group.key}`} className="flex items-baseline gap-2 text-sm leading-6 font-medium sm:pr-4">
              <span aria-hidden="true" className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              {t(`categories.${group.key}`)}
            </h3>
            <ul aria-labelledby={`stack-${group.key}`} className="flex min-w-0 flex-wrap gap-3 sm:pl-4">
              {group.items.map((item) => (
                <li key={item.icon} className="flex">
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    className="group/stack inline-flex min-h-6 items-center gap-2 rounded-md border border-border bg-muted/50 px-2 py-0.5 font-sans text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    <StackIcon name={item.icon} />{item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
