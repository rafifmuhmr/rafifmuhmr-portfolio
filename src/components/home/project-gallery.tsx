"use client";

import {useRef, useState} from "react";
import Image from "next/image";
import {Dialog} from "@base-ui/react/dialog";
import {ArrowLeftIcon, ArrowRightIcon, CloseIcon, MaximizeIcon} from "@solar-icons/react/linear";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export function ProjectGallery({images, title}: {images: string[]; title: string}) {
  const t = useTranslations("ProjectDetail");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const trigger = useRef<HTMLButtonElement | null>(null);
  if (!images.length) return null;
  const move = (direction: number) => setSelected((index) => (index + direction + images.length) % images.length);
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <ul className="grid gap-6 md:grid-cols-2">
      {images.map((src, index) => <li key={src} className={cn(index === 0 && "md:col-span-2")}>
        <button type="button" aria-label={t("enlarge", {number: index + 1, title})} aria-haspopup="dialog"
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[12px] bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          onClick={(event) => {trigger.current = event.currentTarget; setSelected(index); setOpen(true);}}>
          <Image src={src} alt={`${title} — ${t("gallery")} ${index + 1}`} width={2400} height={1813}
            sizes={index === 0 ? "(min-width: 1280px) 1280px, 100vw" : "(min-width: 1280px) 628px, (min-width: 768px) 50vw, 100vw"}
            className="h-auto w-full" />
          <span aria-hidden="true" className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100"><MaximizeIcon className="size-4" /></span>
        </button>
      </li>)}
    </ul>
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-md" />
      <Dialog.Popup finalFocus={trigger} className="fixed inset-3 z-[71] flex flex-col gap-4 outline-none sm:inset-6"
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1);}
        }}>
        <header className="flex shrink-0 items-center justify-between gap-4">
          <div className="min-w-0 space-y-1"><Dialog.Title className="truncate text-sm font-medium">{title}</Dialog.Title><Dialog.Description className="text-xs text-muted-foreground">{t("gallery")}</Dialog.Description></div>
          <div className="flex items-center gap-2">
            <span role="status" aria-live="polite" aria-atomic="true" className="mr-2 whitespace-nowrap text-sm tabular-nums text-muted-foreground">{selected + 1} / {images.length}</span>
            <Dialog.Close render={<Button variant="outline" size="icon-lg" aria-label={t("closeGallery")} />}><CloseIcon className="size-4" aria-hidden="true" /></Dialog.Close>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto">
          <Image key={images[selected]} src={images[selected]} alt={`${title} — ${t("gallery")} ${selected + 1}`} width={2400} height={1813} sizes="100vw" className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain" />
        </div>
        <div className="flex shrink-0 items-center justify-center gap-3 pb-2">
          <Button variant="outline" size="icon-lg" onClick={() => move(-1)} aria-label={t("previousImage")}><ArrowLeftIcon className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="icon-lg" onClick={() => move(1)} aria-label={t("nextImage")}><ArrowRightIcon className="size-4" aria-hidden="true" /></Button>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>;
}
