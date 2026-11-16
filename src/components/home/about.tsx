import {Children, cloneElement, isValidElement, type ReactNode} from "react";
import {ScrollRevealText} from "./scroll-reveal-text";
import {getTranslations} from "next-intl/server";
import {contact} from "@/config/contact";
import {IntroItemLink} from "./intro-item";
import {LocalGreeting} from "./local-greeting";

function revealWords(content: ReactNode): ReactNode {
  return Children.map(content, (node) => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((word, index) => !word.trim() ? word : (
        <span key={index} data-reveal-word className="text-muted-foreground">{word}</span>
      ));
    }
    if (isValidElement<{children?: ReactNode; "data-reveal-fixed"?: boolean}>(node)) {
      if (node.props["data-reveal-fixed"]) return node;
      return cloneElement(node, {}, revealWords(node.props.children));
    }
    return node;
  });
}

export async function About() {
  const t = await getTranslations("About");
  return (
    <section id="about" aria-labelledby="about-title" className="py-6 sm:py-8 lg:py-10">
      <div className="w-full space-y-8">
        <header className="space-y-3">
          <h2 id="about-title" className="text-xl font-semibold tracking-tight">{t("label")}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </header>
        <div className="space-y-4">
        <LocalGreeting />
        <ScrollRevealText>
          <p>{revealWords(t.rich("intro", {name: (chunks) => <span data-reveal-fixed className="text-foreground">{chunks}</span>}))}</p>
          <p>{revealWords(t("experience"))}</p>
          <p>{revealWords(t.rich("personal", {company: (chunks) => <IntroItemLink href={contact.companyUrl} className="font-medium">{chunks}</IntroItemLink>}))}</p>
        </ScrollRevealText>
        </div>
      </div>
    </section>
  );
}
