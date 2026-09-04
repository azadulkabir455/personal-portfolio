export interface FeaturedProjectsIntro {
  badge: string;
  description: string;
}

export interface FeaturedProjectsCta {
  label: string;
  link: string;
}

export interface FeaturedProjectSecondaryCta {
  label: string;
  href: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  publishedDate: string;
  ctaLabel?: string;
  ctaLink?: string;
  image: string;
  reverse?: boolean;
  secondaryCta?: FeaturedProjectSecondaryCta;
}

export interface FeaturedProjectsContent {
  intro: FeaturedProjectsIntro;
  availableTags: string[];
  projects: FeaturedProject[];
  cta: FeaturedProjectsCta;
}

export const featuredProjectsContent: FeaturedProjectsContent = {
  intro: {
    badge: "Featured Projects",
    description:
      "Each project showcases my approach to solving real-world problems through user-centered design. By combining research, strategy, and modern UI principles, I create digital products that are intuitive, visually refined, and built to deliver measurable results.",
  },
  availableTags: [
    "User Experience Research",
    "Clean Wire Framing",
    "Rapid Prototype Testing",
    "Usability Flow Testing",
    "Smart Interaction Design",
  ],
  projects: [
    {
      id: "software-agency-website",
      title: "Software Agency Website | Business Website",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      publishedDate: "June 4, 2026",
      ctaLabel: "View Details",
      ctaLink: "#",
      image: "/images/featureprojects/p1.png",
      secondaryCta: { label: "Git Repo", href: "#" },
    },
    {
      id: "real-estate-landing-page",
      title: "Real Estate Landing Page | SaaS Platform",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      publishedDate: "May 18, 2026",
      ctaLabel: "View Details",
      ctaLink: "#",
      image: "/images/featureprojects/p2.png",
    },
    {
      id: "open-mail-marketing-website",
      title: "Open Mail Marketing Website | FinTech Product",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      publishedDate: "April 9, 2026",
      ctaLabel: "View Details",
      ctaLink: "#",
      image: "/images/featureprojects/p3.png",
      secondaryCta: { label: "Git Repo", href: "#" },
    },
    {
      id: "user-centric-and-intuitive",
      title: "User-Centric And Intuitive | Business Website",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      publishedDate: "March 2, 2026",
      ctaLabel: "View Details",
      ctaLink: "#",
      image: "/images/featureprojects/p4.png",
    },
  ],
  cta: {
    label: "Let's Talk For Your Next Project",
    link: "#",
  },
};
