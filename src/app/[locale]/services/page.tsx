import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

const services = ["uiux", "frontend", "graphic"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const [nav, t] = await Promise.all([getTranslations("Navigation"), getTranslations("ServicesPage")]);
  return { title: nav("services"), description: t("description") };
}

export default function ServicesPage() {
  const nav = useTranslations("Navigation");
  const t = useTranslations("ServicesPage");

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{nav("services")}</h1>
        <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service} className="space-y-3 rounded-xl border border-border p-5">
            <h2 className="font-medium">{t(`${service}.title`)}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t(`${service}.description`)}</p>
          </li>
        ))}
      </ul>
      <Link href="/contact" className={buttonVariants({ size: "lg" })}>{nav("cta")}</Link>
    </main>
  );
}
