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
    label: "Global",
    href: "/admin/global",
    icon: "FaGlobe",
    children: [
      { label: "Header", href: "/admin/global/header" },
      { label: "Footer", href: "/admin/global/footer" },
      { label: "Blog", href: "/admin/global/blog" },
    ],
  },
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
      { label: "Services", href: "/admin/landing/services" },
      { label: "Case Study", href: "/admin/landing/case-study" },
    ],
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: "FaComment",
    children: [
      { label: "All Blogs", href: "/admin/blog" },
      { label: "Add Blog", href: "/admin/blog/add" },
      { label: "Categories", href: "/admin/blog/categories" },
    ],
  },
  {
    label: "Project",
    href: "/admin/project",
    icon: "FaLightbulb",
    children: [
      { label: "All Project", href: "/admin/project" },
      { label: "Add Project", href: "/admin/project/add" },
      { label: "Tag", href: "/admin/project/tag" },
    ],
  },
];
