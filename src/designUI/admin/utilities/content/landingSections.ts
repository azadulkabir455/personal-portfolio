export interface LandingSectionItem {
  key: string;
  label: string;
  href: string;
  image?: string;
  toggleable?: boolean;
  badgeLabel?: string;
  badgeTooltip?: string;
}

const imageBase = "/images/admin/home/sections";

export const landingSections: LandingSectionItem[] = [
  { key: "hero", label: "Hero", href: "/admin/landing/hero", image: `${imageBase}/hero.png` },
  // {
  //   key: "feature",
  //   label: "Feature",
  //   href: "/admin/landing/feature",
  //   toggleable: false,
  //   badgeLabel: "Auto",
  //   badgeTooltip: "Hides automatically when Story, Journey and Featured Projects are all hidden.",
  // },
  { key: "story", label: "Story", href: "/admin/landing/story", image: `${imageBase}/story.png` },
  { key: "journey", label: "Journey", href: "/admin/landing/journey", image: `${imageBase}/journey.png` },
  {
    key: "featuredProjects",
    label: "Featured Projects",
    href: "/admin/landing/featured-projects",
    image: `${imageBase}/featuresporject.png`,
  },
  {
    key: "recentDesign",
    label: "Recent Design",
    href: "/admin/landing/recent-design",
    image: `${imageBase}/RecentDesign.png`,
  },
  { key: "services", label: "Services", href: "/admin/landing/services", image: `${imageBase}/services.png` },
  { key: "caseStudy", label: "Case Study", href: "/admin/landing/case-study", image: `${imageBase}/casestudy.png` },
  { key: "blog", label: "Blog", href: "/admin/landing/blog", image: `${imageBase}/blogs.png` },
  {
    key: "footer",
    label: "Footer",
    href: "/admin/global/footer",
    toggleable: false,
    badgeLabel: "Always On",
    badgeTooltip: "Footer is shown on every page and can't be hidden.",
    image: `${imageBase}/footer.png`,
  },
];

export const defaultSectionVisibility: Record<string, boolean> = Object.fromEntries(
  landingSections.map((section) => [section.key, true]),
);
