import {AltArrowRightIcon} from "@solar-icons/react/linear";
import {Link} from "@/i18n/navigation";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";

export function BlogBreadcrumb({title, label}: {title: string; label: string}) {
  return <Breadcrumb aria-label={label} className="min-w-0 max-w-full">
    <BreadcrumbList className="min-w-0 flex-nowrap gap-2">
      <BreadcrumbItem className="shrink-0">
        <BreadcrumbLink render={<Link href="/blog" />} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Blog</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="shrink-0"><AltArrowRightIcon /></BreadcrumbSeparator>
      <BreadcrumbItem className="min-w-0">
        <BreadcrumbPage className="block max-w-44 truncate sm:max-w-72">{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>;
}
