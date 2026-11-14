import {getTranslations, setRequestLocale} from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-12 sm:px-6">
      <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>

      <p className="text-center text-muted-foreground">
        {t("description")}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button>{t("primary")}</Button>
        <Button variant="outline">{t("outline")}</Button>
        <Button variant="ghost">{t("ghost")}</Button>
      </div>

      <p className="font-sans">{t("font")}</p>
      <p className="font-mono">TypeScript / React / Next.js</p>
      </div>
    </main>
  );
}
