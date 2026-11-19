"use client";

import {useState, useSyncExternalStore} from "react";
import {useTranslations} from "next-intl";
import {AltArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, DocumentTextIcon, ShareIcon, CloseIcon} from "@solar-icons/react/linear";
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
import {CopyFeedbackIcon, CopyFeedbackLabel, useCopyFeedback} from "@/components/ui/copy-feedback";
import {CopyButton} from "@/components/ui/copy-button";
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
  const linkCopy = useCopyFeedback();
  const [shareError, setShareError] = useState(false);
  const [manualPlatform, setManualPlatform] = useState<"Instagram" | "Substack" | null>(null);
  const linkLabel = t(linkCopy.status === "copied" ? "linkCopied" : linkCopy.status === "failed" ? "copyError" : "copyLink");
  async function shareToDevice() {
    setShareError(false);
    try {await navigator.share({title, url});} catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareError(true);
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
        <CopyButton
          text={markdown} label={t("copyPage")} copiedLabel={t("copied")} errorLabel={t("copyError")}
          aria-label={t("copyPage")} showLabel variant="secondary" size="md"
          className={article ? "rounded-l-lg rounded-r-none bg-secondary px-2.5 shadow-none sm:px-3" : "rounded-l-lg rounded-r-none bg-secondary px-2.5 shadow-none min-[400px]:px-3"}
          labelClassName={article ? "hidden sm:inline-flex" : "hidden min-[400px]:inline-flex"}
        />
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
          <DropdownMenuItem closeOnClick={false} onClick={() => void linkCopy.copy(url)}><CopyFeedbackIcon status={linkCopy.status} link /><CopyFeedbackLabel text={linkLabel} /></DropdownMenuItem>
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
    <span role="status" className="sr-only">{linkCopy.status !== "idle" && linkLabel}</span>
    {shareError && <p role="status" className="w-full text-sm text-destructive">{t("shareError")}</p>}
  </div>
  <Dialog.Root open={manualPlatform !== null} onOpenChange={(open) => {if (!open) setManualPlatform(null);}}>
    <Dialog.Portal><Dialog.Backdrop className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm" />
      <Dialog.Popup className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-none">
        <Dialog.Title className="pr-8 text-lg font-semibold">{t("shareOn", {platform: manualPlatform ?? ""})}</Dialog.Title>
        <Dialog.Description className="text-sm leading-6 text-muted-foreground">{t(article ? "manualArticleShare" : "manualShare", {platform: manualPlatform ?? ""})}</Dialog.Description>
        <div className="flex flex-wrap gap-3">
          <CopyButton text={url} label={t("copyLink")} copiedLabel={t("linkCopied")} errorLabel={t("copyError")} showLabel variant="secondary" size="md" className="rounded-lg" />
          <Button size="lg" nativeButton={false} render={<a href={manualPlatform === "Instagram" ? "https://www.instagram.com/" : "https://substack.com/notes"} target="_blank" rel="noopener noreferrer" />}>{t("openIn", {platform: manualPlatform ?? ""})}</Button>
        </div>
        <Dialog.Close render={<Button variant="ghost" size="icon-lg" aria-label={t("close")} className="absolute top-3 right-3" />}><CloseIcon className="size-4" aria-hidden="true" /></Dialog.Close>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root></>;
}
