import type { RecognitionEntry } from "@/vendor/chanhdai/features/portfolio/types/recognition"
import { CollapsibleList } from "@/vendor/chanhdai/components/collapsible-list"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/vendor/chanhdai/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/vendor/chanhdai/features/portfolio/components/panel-title-copy"

import { RecognitionItem } from "./recognition-item"

const ID = "recognition"

export function Recognition({ items: RECOGNITION, title, empty }: { items: RecognitionEntry[]; title: string; empty?: string }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{title}</a>
          <PanelTitleSup>({RECOGNITION.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>
      {empty && RECOGNITION.length === 0 && <p className="p-4 text-sm text-muted-foreground">{empty}</p>}

      <CollapsibleList
        items={RECOGNITION}
        max={4}
        keyExtractor={(entry) => entry.key}
        renderItem={(entry) => <RecognitionItem entry={entry} />}
      />
    </Panel>
  )
}
