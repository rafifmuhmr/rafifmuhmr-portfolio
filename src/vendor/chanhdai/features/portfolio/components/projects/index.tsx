import type { Project } from "@/vendor/chanhdai/features/portfolio/types/projects"
import { CollapsibleList } from "@/vendor/chanhdai/components/collapsible-list"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/vendor/chanhdai/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/vendor/chanhdai/features/portfolio/components/panel-title-copy"

import { ProjectItem } from "./project-item"

const ID = "projects"

export function Projects({ items: PROJECTS, title, empty }: { items: Project[]; title: string; empty?: string }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{title}</a>
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>
      {empty && PROJECTS.length === 0 && <p className="p-4 text-sm text-muted-foreground">{empty}</p>}

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  )
}
