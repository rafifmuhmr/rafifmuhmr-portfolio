import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeContact } from "@/components/home/faq-and-contact";

export async function generateMetadata(): Promise<Metadata> {
  const [nav, t] = await Promise.all([getTranslations("Navigation"), getTranslations("HomeContact")]);
  return { title: nav("contact"), description: t("description") };
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:pt-20">
      <HomeContact standalone />
    </main>
  );
}
