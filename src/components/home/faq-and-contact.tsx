import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { buttonVariants } from "@/components/ui/button";
import { contact } from "@/config/contact";

const topics = ["projects", "idea", "development", "estimate", "brief"] as const;

export async function HomeFaq() {
  const t = await getTranslations("HomeFaq");
  const items = topics.map((topic) => ({
    question: t(`items.${topic}.question`),
    answer: t(`items.${topic}.answer`),
  }));

  return (
    <section aria-labelledby="home-faq-title" className="grid gap-8 py-6 sm:py-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-10">
      <div className="space-y-3">
        <h2 id="home-faq-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
      </div>
      <FaqAccordion type="single" items={items} />
    </section>
  );
}

export async function HomeContact({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const t = await getTranslations("HomeContact");

  return (
    <section id="contact" aria-labelledby="home-contact-title" className="flex scroll-mt-28 flex-col gap-8 py-6 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
      <div className="max-w-xl space-y-3">
        <Heading id="home-contact-title" className={standalone ? "text-3xl font-semibold tracking-tight" : "text-xl font-semibold tracking-tight"}>{t("title")}</Heading>
        <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${contact.email}`} className={buttonVariants({ size: "lg" })}>{t("email")}</a>
        <a href={`https://wa.me/${contact.phone.slice(1)}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", variant: "outline" })}>{t("whatsapp")}</a>
      </div>
    </section>
  );
}
