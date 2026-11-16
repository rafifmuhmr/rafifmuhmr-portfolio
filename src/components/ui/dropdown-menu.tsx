"use client";

import {Menu} from "@base-ui/react/menu";
import {cn} from "@/lib/utils";

export function DropdownMenu(props: Menu.Root.Props) {return <Menu.Root {...props} />;}
export function DropdownMenuTrigger(props: Menu.Trigger.Props) {return <Menu.Trigger data-slot="dropdown-menu-trigger" {...props} />;}
export function DropdownMenuContent({className, align = "end", sideOffset = 8, ...props}: Menu.Popup.Props & Pick<Menu.Positioner.Props, "align" | "sideOffset">) {
  return <Menu.Portal><Menu.Positioner align={align} sideOffset={sideOffset} collisionPadding={12} className="z-[60] outline-none"><Menu.Popup data-slot="dropdown-menu-content" className={cn("min-w-48 max-w-[calc(100vw-24px)] rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none", className)} {...props} /></Menu.Positioner></Menu.Portal>;
}
export function DropdownMenuItem({className, ...props}: Menu.Item.Props) {
  return <Menu.Item data-slot="dropdown-menu-item" className={cn("flex cursor-default items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0", className)} {...props} />;
}
