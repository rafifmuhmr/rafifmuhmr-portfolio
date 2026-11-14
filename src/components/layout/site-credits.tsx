import {getTranslations} from "next-intl/server";

const linkClass = "block w-fit text-muted-foreground underline-offset-4 decoration-1 [text-decoration-skip-ink:none] transition-colors hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const headingClass = "mb-4 font-medium text-foreground";

export async function SiteCredits({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: "Credits"});
  return (
    <>
      <div className="grid content-start gap-6 md:row-span-2 md:grid-rows-subgrid">
      <section aria-label={t("typeface")}>
        <h2 className={headingClass}>{t("typeface")}</h2>
        <ul className="space-y-3">
          <li><a target="_blank" href="https://fonts.google.com/specimen/Plus+Jakarta+Sans" className={linkClass} rel="noopener noreferrer">Plus Jakarta Sans</a></li>
          <li><a target="_blank" href="https://fonts.google.com/specimen/JetBrains+Mono" className={linkClass} rel="noopener noreferrer">JetBrains Mono</a></li>
        </ul>
      </section>
      <section aria-label={t("weather")}>
        <h2 className={headingClass}>{t("weather")}</h2>
        <a target="_blank" href="https://openweathermap.org/" className={linkClass} rel="noopener noreferrer">OpenWeather</a>
      </section>
      </div>
      <div className="grid content-start gap-6 md:row-span-2 md:grid-rows-subgrid">
      <section aria-label={t("icons")}>
        <h2 className={headingClass}>{t("icons")}</h2>
        <ul className="space-y-3">
          <li><a target="_blank" href="https://www.figma.com/community/file/1166831539721848736" className={linkClass} rel="noopener noreferrer">Solar Icons</a></li>
          <li><a target="_blank" href="https://www.figma.com/community/file/1166831539721848736" className={linkClass} rel="noopener noreferrer">480 Design</a></li>
          <li><a target="_blank" href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener noreferrer" className={linkClass}>CC BY 4.0</a></li>
        </ul>
      </section>
      <section aria-label={t("logos")}>
        <h2 className={headingClass}>{t("logos")}</h2>
        <ul className="space-y-3">
          <li><a target="_blank" href="https://thesvg.org/" className={linkClass} rel="noopener noreferrer">theSVG</a></li>
          <li><a target="_blank" href="https://github.com/glincker/thesvg/blob/main/LICENSE" className={linkClass} rel="license noopener noreferrer">MIT License</a></li>
        </ul>
      </section>
      </div>

    </>
  );
}
