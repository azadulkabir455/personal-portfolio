import type { IconName } from "@/designUI/elements/Icon/types";

export interface AdminNavChild {
  label: string;
  href: string;
}

export interface AdminNavItem {
  label: string;
  href: string;
  icon: IconName;
  children?: AdminNavChild[];
}

export const adminNav: AdminNavItem[] = [
  { label: "Home", href: "/admin", icon: "FaHome" },
  {
    label: "Landing",
    href: "/admin/landing",
    icon: "FaLayerGroup",
    children: [
      { label: "Hero", href: "/admin/landing/hero" },
      { label: "Feature", href: "/admin/landing/feature" },
      { label: "Story", href: "/admin/landing/story" },
      { label: "Journey", href: "/admin/landing/journey" },
      { label: "Featured Projects", href: "/admin/landing/featured-projects" },
      { label: "Recent Design", href: "/admin/landing/recent-design" },
      { label: "Case Study", href: "/admin/landing/case-study" },
      { label: "Services", href: "/admin/landing/services" },
      { label: "Blog", href: "/admin/landing/blog" },
    ],
  },
];
