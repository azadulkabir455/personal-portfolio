"use client";

import { usePathname } from "next/navigation";
import { adminNav } from "@/designUI/admin/utilities/content/adminNav";

export function useAdminTopbar() {
  const pathname = usePathname();

  const title = (() => {
    for (const item of adminNav) {
      if (item.href === pathname) return item.label;
      const child = item.children?.find((navChild) => navChild.href === pathname);
      if (child) return child.label;
    }
    return "Dashboard";
  })();

  return { title };
}
