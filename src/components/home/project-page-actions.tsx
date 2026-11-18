"use client";

import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {useTranslations} from "next-intl";
import {AltArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, CopyIcon, DocumentTextIcon, LinkIcon, ShareIcon, CloseIcon} from "@solar-icons/react/linear";
import ChatGPT from "@thesvg/react/openai-chatgpt";
import Claude from "@thesvg/react/claude";
import Cursor from "@thesvg/react/cursor";
import Grok from "@thesvg/react/grok";
import X from "@thesvg/react/x";
import Linkedin from "@thesvg/react/linkedin";
import Threads from "@thesvg/react/threads";
import Instagram from "@thesvg/react/instagram";
import Substack from "@thesvg/react/substack";
import {Dialog} from "@base-ui/react/dialog";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

type AdjacentProject = {slug: string; title: string} | null;
type Props = {kind?: "project" | "article"; title: string; url: string; markdownUrl: string; markdown: string; previous: AdjacentProject; next: AdjacentProject};

const subscribeShare = () => () => {};
const getShareSupport = () => typeof navigator !== "undefined" && typeof navigator.share === "function";
const getServerShareSupport = () => false;

export function ProjectPageActions({kind = "project", title, url, markdownUrl, markdown, previous, next}: Props) {
  const t = useTranslations("ProjectActions");
  const article = kind === "article";
  const canShare = useSyncExternalStore(subscribeShare, getShareSupport, getServerShareSupport);
  const [feedback, setFeedback] = useState<"page" | "link" | "error" | "share-error" | null>(null);
  const [manualPlatform, setManualPlatform] = useState<"Instagram" | "Substack" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {if (timer.current) clearTimeout(timer.current);}, []);
  async function copy(value: string, kind: "page" | "link") {
    try {await navigator.clipboard.writeText(value); setFeedback(kind);} catch {setFeedback("error");}
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFeedback(null), 2000);
  }
  async function shareToDevice() {
    try {await navigator.share({title, url});} catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFeedback("share-error");
    }
  }
  const prompt = t(article ? "articlePrompt" : "prompt", {url: new URL(markdownUrl, url).href});
  const q = encodeURIComponent(prompt);
  const icons = "size-4 [&_path]:fill-current";
  const ai = [
    {name: "ChatGPT", href: `https://chatgpt.com/?hints=search&q=${q}`, icon: <ChatGPT variant="mono" className={icons} aria-hidden="true" />},
    {name: "Claude", href: `https://claude.ai/new?q=${q}`, icon: <Claude variant="mono" className={icons} aria-hidden="true" />},
    {name: "Cursor", href: `https://cursor.com/link/prompt?text=${q}`, icon: <Cursor variant="mono" className={icons} aria-hidden="true" />},
    {name: "Grok", href: `https://grok.com/?q=${q}`, icon: <Grok className={icons} aria-hidden="true" />},
  ];
  const social = [
    {name: "Instagram", platform: "Instagram" as const, icon: <Instagram variant="mono" className={icons} aria-hidden="true" />},
    {name: "Threads", href: `https://www.threads.com/intent/post?text=${encodeURIComponent(`${title} ${url}`)}`, icon: <Threads variant="mono" className={icons} aria-hidden="true" />},
    {name: "X", href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, icon: <X className={icons} aria-hidden="true" />},
    {name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: <Linkedin className={icons} aria-hidden="true" />},
    {name: "Substack", platform: "Substack" as const, icon: <Substack variant="mono" className={icons} aria-hidden="true" />},
  ];
  return <><div className="flex shrink-0 flex-col items-end gap-2">
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center rounded-lg bg-secondary">
        <Button variant="secondary" size="lg" onClick={() => void copy(markdown, "page")} aria-label={t("copyPage")} className="rounded-r-none border-none">
          {feedback === "page" ? <CheckIcon className="size-4" aria-hidden="true" /> : <CopyIcon className="size-4" aria-hidden="true" />}
          <span className={article ? "hidden sm:inline" : "hidden min-[400px]:inline"}>{feedback === "page" ? t("copied") : t("copyPage")}</span>
        </Button>
        <span aria-hidden="true" className="h-4 w-px bg-border" />
        <DropdownMenu><DropdownMenuTrigger render={<Button variant="secondary" size="icon-lg" className="rounded-l-none border-none" aria-label={t("aiOptions")} />}><AltArrowDownIcon className="size-4" aria-hidden="true" /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem render={<a href={markdownUrl} target="_blank" rel="noopener noreferrer" />}><DocumentTextIcon aria-hidden="true" />{t("viewMarkdown")}</DropdownMenuItem>
            {ai.map((item) => <DropdownMenuItem key={item.name} render={<a href={item.href} target="_blank" rel="noopener noreferrer" />}>{item.icon}{t("openIn", {platform: item.name})}</DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DropdownMenu><DropdownMenuTrigger render={<Button variant="secondary" size="icon-lg" aria-label={t(article ? "shareArticle" : "share")} />}><ShareIcon className="size-4" aria-hidden="true" /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => void copy(url, "link")}>{feedback === "link" ? <CheckIcon aria-hidden="true" /> : <LinkIcon aria-hidden="true" />}{feedback === "link" ? t("linkCopied") : t("copyLink")}</DropdownMenuItem>
          {social.map((item) => item.href ? (
            <DropdownMenuItem key={item.name} render={<a href={item.href} target="_blank" rel="noopener noreferrer" />}>{item.icon}{t("shareOn", {platform: item.name})}</DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={item.name} onClick={() => {
              if (canShare) void shareToDevice();
              else if (item.platform) setManualPlatform(item.platform);
            }}>{item.icon}{t("shareOn", {platform: item.name})}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {([{project: previous, direction: "previous", Icon: ArrowLeftIcon}, {project: next, direction: "next", Icon: ArrowRightIcon}] as const).map(({project, direction, Icon}) => project ? <Tooltip key={direction}>
        <TooltipTrigger render={<Button variant="secondary" size="icon-lg" nativeButton={false} aria-label={t(article ? (direction === "previous" ? "previousArticle" : "nextArticle") : direction, {title: project.title})} render={<Link href={{pathname: article ? "/blog/[slug]" : "/work/[slug]", params: {slug: project.slug}}} />} />}><Icon className="size-4" aria-hidden="true" /></TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8} className="gap-3 pl-3 pr-2">
          <span>{t(article ? (direction === "previous" ? "previousArticleLabel" : "nextArticleLabel") : (direction === "previous" ? "previousLabel" : "nextLabel"))}</span>
          <span aria-hidden="true" className="inline-flex size-5 items-center justify-center rounded border border-background/10 bg-background/15 text-background"><Icon className="size-3" /></span>
        </TooltipContent>
      </Tooltip> : null)}
    </div>
    <span role="status" aria-live="polite" className={feedback === "error" || feedback === "share-error" ? "w-full text-sm text-destructive" : "sr-only"}>{feedback === "share-error" ? t("shareError") : feedback === "error" ? t("copyError") : feedback === "page" ? t("copied") : feedback === "link" ? t("linkCopied") : ""}</span>
  </div>
  <Dialog.Root open={manualPlatform !== null} onOpenChange={(open) => {if (!open) setManualPlatform(null);}}>
    <Dialog.Portal><Dialog.Backdrop className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm" />
      <Dialog.Popup className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-none">
        <Dialog.Title className="pr-8 text-lg font-semibold">{t("shareOn", {platform: manualPlatform ?? ""})}</Dialog.Title>
        <Dialog.Description className="text-sm leading-6 text-muted-foreground">{t(article ? "manualArticleShare" : "manualShare", {platform: manualPlatform ?? ""})}</Dialog.Description>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="lg" onClick={() => void copy(url, "link")}>{feedback === "link" ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}{feedback === "link" ? t("linkCopied") : t("copyLink")}</Button>
          <Button size="lg" nativeButton={false} render={<a href={manualPlatform === "Instagram" ? "https://www.instagram.com/" : "https://substack.com/notes"} target="_blank" rel="noopener noreferrer" />}>{t("openIn", {platform: manualPlatform ?? ""})}</Button>
        </div>
        <Dialog.Close render={<Button variant="ghost" size="icon-lg" aria-label={t("close")} className="absolute top-3 right-3" />}><CloseIcon className="size-4" aria-hidden="true" /></Dialog.Close>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root></>;
}
