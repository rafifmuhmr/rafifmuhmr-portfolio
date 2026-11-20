import { ArrowRightIcon } from "@solar-icons/react/linear";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollRevealText } from "./scroll-reveal-text";

function revealWords(text: string) {
  return text.split(/(\s+)/).map((word, index) => word.trim() ? (
    <span key={index} data-reveal-word className="text-muted-foreground">{word}</span>
  ) : word);
}

export async function About() {
  const t = await getTranslations("About");

  return (
    <section id="about" aria-label={t("label")} className="space-y-6 py-6 sm:py-8 lg:py-10">
      <ScrollRevealText>
        <p>{revealWords(t("homeIntro"))}</p>
        <p>{revealWords(t("homeApproach"))}</p>
      </ScrollRevealText>
      <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 px-4")}>
        {t("homeCta")}
        <ArrowRightIcon size={16} className="shrink-0" aria-hidden="true" />
      </Link>
    </section>
  );
}
