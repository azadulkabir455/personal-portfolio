export interface PageVisibilityItem {
  key: string;
  label: string;
  href: string;
}

export const pageVisibilityItems: PageVisibilityItem[] = [
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "blog", label: "Blog", href: "/blog" },
];
