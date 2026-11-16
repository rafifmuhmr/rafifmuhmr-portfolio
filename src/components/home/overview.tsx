import {getTranslations} from "next-intl/server";
import {LightbulbIcon, SelectionIcon, MenIcon} from "@solar-icons/react/linear";
import {contact} from "@/config/contact";
import {socialLinks} from "@/config/socials";
import {SocialIcon} from "@/components/layout/social-icon";
import {IconTile} from "@/components/ui/icon-tile";
import {ContactItem} from "./contact-item";
import {IntroItem, IntroItemContent, IntroItemIcon, IntroItemLink} from "./intro-item";

export async function Overview() {
  const t = await getTranslations("Overview");
  return (
    <section aria-labelledby="overview-title" className="py-6 sm:py-8 lg:py-10">
      <h2 id="overview-title" className="sr-only">{t("title")}</h2>
      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-x-24">
        <div>
          <header className="mb-8 space-y-3">
            <h3 className="text-xl font-semibold tracking-tight">{t("details")}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{t("detailsDescription")}</p>
          </header>
          <div className="space-y-4">
          <IntroItem className="font-medium">
            <IntroItemIcon aria-hidden="true"><LightbulbIcon className="size-4" /></IntroItemIcon>
            <IntroItemContent>Co-founder <IntroItemLink href={contact.companyUrl} className="font-medium text-foreground">@{contact.company}</IntroItemLink></IntroItemContent>
          </IntroItem>
          <IntroItem className="font-medium">
            <IntroItemIcon aria-hidden="true"><SelectionIcon className="size-4" /></IntroItemIcon>
            <IntroItemContent>UI/UX Designer <IntroItemLink href={contact.companyUrl} className="font-medium text-foreground">@{contact.company}</IntroItemLink></IntroItemContent>
          </IntroItem>
          <ContactItem kind="email" value={contact.email} />
          <ContactItem kind="phone" value={contact.phone} display={contact.phoneDisplay} />
          <IntroItem className="font-medium">
            <IntroItemIcon aria-hidden="true"><MenIcon className="size-4" /></IntroItemIcon>
            <IntroItemContent aria-label={t("pronouns", {value: contact.pronouns})}>{contact.pronouns}</IntroItemContent>
          </IntroItem>
          </div>
        </div>

        <nav aria-labelledby="overview-socials-title">
          <header className="mb-8 space-y-3">
            <h3 id="overview-socials-title" className="text-xl font-semibold tracking-tight">{t("follow")}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{t("followDescription")}</p>
          </header>
          <ul className="space-y-4">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a href={social.href} target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-6 w-fit items-center gap-4 rounded-md text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <IconTile className="size-6 transition-colors group-hover:text-foreground [&_[data-social-icon]]:size-4"><SocialIcon platform={social.platform} /></IconTile>
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium">{social.label}</span>
                    <span className="text-muted-foreground underline-offset-4 decoration-1 [text-decoration-skip-ink:none] transition-colors group-hover:text-foreground group-hover:underline">@rafifmuhmr</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
