export type BlogPostType = "native" | "external";

export interface BlogPost {
  type: BlogPostType;
  category: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  image: string;
  href: string;
  ctaLabel: string;
}

export interface BlogIntro {
  badge: string;
  description: string;
}

export interface BlogContent {
  intro: BlogIntro;
  posts: BlogPost[];
}

export const blogContent: BlogContent = {
  intro: {
    badge: "Let's dive into my article on UI and UX",
    description:
      "These articles reflect my approach to UI/UX design from solving real user problems and building scalable design systems to sharing practical workflows.",
  },
  posts: [
    {
      type: "native",
      category: "UX Research",
      title: "How I Structure A UX Audit Before Touching Figma",
      excerpt:
        "A repeatable framework for auditing an existing product's flow, friction points, and information hierarchy before any redesign work starts.",
      publishedDate: "June 4th, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/ux-audit-framework",
      ctaLabel: "Read Article",
    },
    {
      type: "native",
      category: "Design Systems",
      title: "Building A Design System That Survives Real Product Growth",
      excerpt:
        "Notes on token structure, component contracts, and the governance habits that keep a design system usable past the first six months.",
      publishedDate: "April 22nd, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/design-systems-that-scale",
      ctaLabel: "Read Article",
    },
    {
      type: "external",
      category: "Case Study",
      title: "Redesigning A Flight Booking Flow — Full Breakdown On Medium",
      excerpt:
        "The complete process behind the ShareTrip flight booking redesign, published as a long-form case study on Medium.",
      publishedDate: "March 10th, 2026",
      image: "/images/blog/blog.png",
      href: "https://medium.com/@example/flight-booking-redesign",
      ctaLabel: "Read On Medium",
    },
  ],
};
