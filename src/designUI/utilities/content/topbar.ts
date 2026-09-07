export interface TopBarNavLink {
  label: string;
  href: string;
  enabled: boolean;
}

export interface TopBarContent {
  experienceLabel: string;
  talkLabel: string;
  resumeLabel: string;
  navLinks: TopBarNavLink[];
}

export const topBarContent: TopBarContent = {
  experienceLabel: "With 7+ Years of Experience",
  talkLabel: "Let's Talk",
  resumeLabel: "My Resume",
  navLinks: [
    { label: "Home", href: "/", enabled: true },
    { label: "Projects", href: "/projects", enabled: true },
    { label: "Blogs", href: "/blog", enabled: true },
  ],
};
