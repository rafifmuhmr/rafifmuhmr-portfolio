export const headerNavigation = [
  { title: "homeLabel", href: "/" },
  { title: "work", href: "/work" },
  { title: "about", href: "/about" },
  { title: "blog", href: "/blog" },
  { title: "contact", href: "/contact" },
] as const;

export function getNavigationCurrent(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  if (pathname.startsWith(`${href}/`)) return "location";
  return undefined;
}
