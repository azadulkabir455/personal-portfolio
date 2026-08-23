export interface FeaturedProjectsIntro {
  badge: string;
  description: string;
}

export interface FeaturedProjectsCta {
  label: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  image: string;
  reverse?: boolean;
}

export interface FeaturedProjectsContent {
  intro: FeaturedProjectsIntro;
  projects: FeaturedProject[];
  cta: FeaturedProjectsCta;
}

export const featuredProjectsContent: FeaturedProjectsContent = {
  intro: {
    badge: "Featured Projects",
    description:
      "Each project showcases my approach to solving real-world problems through user-centered design. By combining research, strategy, and modern UI principles, I create digital products that are intuitive, visually refined, and built to deliver measurable results.",
  },
  projects: [
    {
      title: "Software Agency Website | Business Website",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      ctaLabel: "View Details",
      image: "/images/featureprojects/p1.png",
    },
    {
      title: "Real Estate Landing Page | SaaS Platform",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      ctaLabel: "View Details",
      image: "/images/featureprojects/p2.png",
    },
    {
      title: "Open Mail Marketing Website | FinTech Product",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      ctaLabel: "View Details",
      image: "/images/featureprojects/p3.png",
    },
    {
      title: "User-Centric And Intuitive | Business Website",
      description: "Mobile-first landing page, redesign for improving user experience",
      tags: [
        "User Experience Research",
        "Clean Wire Framing",
        "Rapid Prototype Testing",
        "Usability Flow Testing",
        "Smart Interaction Design",
      ],
      ctaLabel: "View Details",
      image: "/images/featureprojects/p4.png",
    },
  ],
  cta: {
    label: "Let's Talk For Your Next Project",
  },
};
