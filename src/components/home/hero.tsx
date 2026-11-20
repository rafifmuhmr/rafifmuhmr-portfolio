import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {buttonVariants} from "@/components/ui/button";
import {IconTile} from "@/components/ui/icon-tile";
import {cn} from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section aria-labelledby="hero-title" className="grid pt-6 pb-10 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-26 items-stretch gap-8 sm:gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className="flex flex-col justify-between gap-6">
        <IconTile className="size-16 rounded-[12px] p-1 sm:size-19">
          <Image src="/images/rafifmuhmr-pp.png" alt="Rafif Muhammad Muflihur Rodwa" width={72} height={72} sizes="(min-width: 640px) 66px, 54px" className="size-full rounded-md object-cover" />
        </IconTile>
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">UI/UX Designer</p>
          <h1 id="hero-title" className="max-w-full text-[30px] leading-tight font-medium tracking-tight text-balance sm:text-[52px]">
            {t("greeting")}
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6">
        <h2 className="max-w-xl text-xl leading-snug font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl">
          {t("headline")}
        </h2>
        <p className="max-w-xl text-sm leading-6 sm:text-base sm:leading-7 text-pretty text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href="/contact" className={cn(buttonVariants({size: "lg"}), "px-4")}>{t("contact")}</Link>
          <Link href="/work" className={cn(buttonVariants({variant: "outline", size: "lg"}), "px-4")}>{t("work")}</Link>
        </div>
      </div>
    </section>
  );
}
