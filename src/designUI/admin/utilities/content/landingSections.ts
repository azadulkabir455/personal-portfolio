export interface LandingSectionItem {
  key: string;
  label: string;
  href: string;
}

export const landingSections: LandingSectionItem[] = [
  { key: "hero", label: "Hero", href: "/admin/landing/hero" },
  { key: "feature", label: "Feature", href: "/admin/landing/feature" },
  { key: "story", label: "Story", href: "/admin/landing/story" },
  { key: "journey", label: "Journey", href: "/admin/landing/journey" },
  { key: "featuredProjects", label: "Featured Projects", href: "/admin/landing/featured-projects" },
  { key: "recentDesign", label: "Recent Design", href: "/admin/landing/recent-design" },
  { key: "caseStudy", label: "Case Study", href: "/admin/landing/case-study" },
  { key: "services", label: "Services", href: "/admin/landing/services" },
  { key: "blog", label: "Blog", href: "/admin/landing/blog" },
];
