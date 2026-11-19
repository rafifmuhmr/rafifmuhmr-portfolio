import { BookIcon, BookmarkIcon, DocumentTextIcon } from "@solar-icons/react/linear";

export const headerNavigation = [
  { title: "homeLabel", href: "/" },
  { title: "work", href: "/work" },
  { title: "services", href: "/services" },
  { title: "about", href: "/about" },
  { title: "blog", href: "/blog" },
] as const;

export const resourceNavigation = [
  { title: "blog", href: "/blog", Icon: DocumentTextIcon },
  { title: "bookmarks", href: "/bookmarks", Icon: BookmarkIcon },
  { title: "bookshelf", href: "/bookshelf", Icon: BookIcon },
] as const;

export function getNavigationCurrent(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  if (pathname.startsWith(`${href}/`)) return "location";
  return undefined;
}
