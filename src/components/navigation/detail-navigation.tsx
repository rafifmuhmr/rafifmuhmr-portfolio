import {ArrowLeftIcon, ArrowRightIcon} from "@solar-icons/react/linear";
import {Link} from "@/i18n/navigation";

type AdjacentPage = {slug: string; title: string} | null;
type Props = {
  pathname: "/work/[slug]" | "/blog/[slug]";
  previous: AdjacentPage;
  next: AdjacentPage;
  previousLabel: string;
  nextLabel: string;
  label: string;
};

export function DetailNavigation({pathname, previous, next, previousLabel, nextLabel, label}: Props) {
  if (!previous && !next) return null;
  return <nav aria-label={label} className="grid min-w-0 grid-cols-2 items-start gap-6 border-t border-border pt-8">
    {previous && <Link href={{pathname, params: {slug: previous.slug}}} rel="prev"
      className="group col-start-1 block min-w-0 space-y-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      <span className="inline-flex max-w-full items-center gap-2 text-sm leading-6 text-muted-foreground">
        <ArrowLeftIcon className="size-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0">{previousLabel}</span>
      </span>
      <span className="line-clamp-2 wrap-break-word text-base font-medium leading-6 underline-offset-4 decoration-1 [text-decoration-skip-ink:none] group-hover:underline group-focus-visible:underline">{previous.title}</span>
    </Link>}
    {next && <Link href={{pathname, params: {slug: next.slug}}} rel="next"
      className="group col-start-2 block min-w-0 space-y-2 rounded-sm text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      <span className="inline-flex max-w-full items-center justify-end gap-2 text-sm leading-6 text-muted-foreground">
        <span className="min-w-0">{nextLabel}</span>
        <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />
      </span>
      <span className="line-clamp-2 wrap-break-word text-base font-medium leading-6 underline-offset-4 decoration-1 [text-decoration-skip-ink:none] group-hover:underline group-focus-visible:underline">{next.title}</span>
    </Link>}
  </nav>;
}
