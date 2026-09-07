"use client";

import { useState } from "react";
import { pageVisibilityItems } from "@/designUI/admin/utilities/content/pageVisibility";
import { topBarContent, type TopBarNavLink } from "@/designUI/utilities/content/topbar";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";

export function usePageVisibilityList() {
  const { data } = useSectionContent("topbar", topBarContent);
  const [navLinks, setNavLinks] = useState<TopBarNavLink[]>(topBarContent.navLinks);
  const [syncedNavLinks, setSyncedNavLinks] = useState(data.navLinks);
  const { run } = useSaveStatus();

  if (data.navLinks !== syncedNavLinks) {
    setSyncedNavLinks(data.navLinks);
    setNavLinks(data.navLinks);
  }

  const toggle = (href: string) => {
    const updated = navLinks.map((link) =>
      link.href === href ? { ...link, enabled: !link.enabled } : link,
    );
    setNavLinks(updated);
    run(() => saveSectionContent("topbar", { ...data, navLinks: updated }));
  };

  const isEnabled = (href: string) => navLinks.find((link) => link.href === href)?.enabled ?? true;

  return { items: pageVisibilityItems, isEnabled, toggle };
}
