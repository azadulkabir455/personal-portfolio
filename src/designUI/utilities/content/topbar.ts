export interface TopBarNavLink {
  label: string;
  href: string;
}

export interface TopBarContent {
  experienceLabel: string;
  talkLabel: string;
  talkHref: string;
  resumeLabel: string;
  resumeHref: string;
  navLinks: TopBarNavLink[];
}

export const topBarContent: TopBarContent = {
  experienceLabel: "With 7+ Years of Experience",
  talkLabel: "Let's Talk",
  talkHref: "https://wa.me/",
  resumeLabel: "My Resume",
  resumeHref: "/resume.pdf",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blog" },
  ],
};
