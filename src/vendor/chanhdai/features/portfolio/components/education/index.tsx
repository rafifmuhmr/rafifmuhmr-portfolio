import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/vendor/chanhdai/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/vendor/chanhdai/features/portfolio/components/panel-title-copy"
import type { Education as EducationEntry } from "@/vendor/chanhdai/features/portfolio/types/education"

import { EducationItem } from "./education-item"

const ID = "education"

export function Education({ items: EDUCATION, title, empty }: { items: EducationEntry[]; title: string; empty?: string }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{title}</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>
      {empty && EDUCATION.length === 0 && <p className="p-4 text-sm text-muted-foreground">{empty}</p>}

      {EDUCATION.map((item) => (
        <div
          key={item.id}
          id={`education-${item.id}`}
          className="screen-line-bottom scroll-mt-14 p-4"
        >
          <EducationItem key={item.id} item={item} />
        </div>
      ))}
    </Panel>
  )
}
