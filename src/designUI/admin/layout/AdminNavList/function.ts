"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { AdminNavItem } from "@/designUI/admin/utilities/content/adminNav";

export function useAdminNavList(items: AdminNavItem[]) {
  const pathname = usePathname();
  const activeParent = items.find((item) =>
    item.children?.some((child) => pathname === child.href),
  );
  const [openLabel, setOpenLabel] = useState<string | null>(activeParent?.label ?? null);

  const toggle = (label: string) => {
    setOpenLabel((current) => (current === label ? null : label));
  };

  const isActive = (href: string) => pathname === href;

  return { openLabel, toggle, isActive };
}
