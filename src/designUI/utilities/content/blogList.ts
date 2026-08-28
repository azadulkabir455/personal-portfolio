import type { BlogPost } from "./blog";

export interface BlogCategory {
  id: string;
  label: string;
  count: number;
  subCategories?: { id: string; label: string; count: number }[];
}

export interface BlogListContent {
  categories: BlogCategory[];
  suggestions: string[];
  posts: BlogPost[];
}

export const blogListContent: BlogListContent = {
  suggestions: ["Ux Theory", "Micro-interactions"],
  categories: [
    {
      id: "user-experience",
      label: "User Experience",
      count: 4,
      subCategories: [
        { id: "sub-category-1", label: "Research", count: 2 },
        { id: "sub-category-2", label: "Usability Testing", count: 2 },
      ],
    },
    { id: "user-interface", label: "User Interface", count: 3 },
    { id: "interaction", label: "Interaction", count: 3 },
  ],
  posts: [
    {
      type: "native",
      category: "User Experience",
      tags: ["Ux Theory"],
      title: "How I Structure A UX Audit Before Touching Figma",
      excerpt:
        "A repeatable framework for auditing an existing product's flow, friction points, and information hierarchy before any redesign work starts.",
      publishedDate: "June 24, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/ux-audit-framework",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "User Interface",
      tags: ["Micro-interactions"],
      title: "The Subtle Power Of Micro-Interactions In Art Auction Platforms",
      excerpt:
        "Why small motion cues around bidding, countdowns, and confirmations build the trust a live auction interface depends on.",
      publishedDate: "June 12, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/micro-interactions-art-auctions",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "Interaction",
      tags: ["Micro-interactions"],
      title: "Designing Drag-And-Drop That Doesn't Fight The User",
      excerpt:
        "Hit-area sizing, drop-zone feedback, and the small physics details that make drag interactions feel predictable instead of fiddly.",
      publishedDate: "May 30, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/drag-and-drop-interaction-design",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "User Interface",
      tags: ["Ux Theory"],
      title: "Building A Design System That Survives Real Product Growth",
      excerpt:
        "Notes on token structure, component contracts, and the governance habits that keep a design system usable past the first six months.",
      publishedDate: "May 18, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/design-systems-that-scale",
      ctaLabel: "View Details",
    },
    {
      type: "external",
      category: "User Experience",
      tags: ["Ux Theory"],
      title: "Redesigning A Flight Booking Flow — Full Breakdown On Medium",
      excerpt:
        "The complete process behind the ShareTrip flight booking redesign, published as a long-form case study on Medium.",
      publishedDate: "April 27, 2026",
      image: "/images/blog/blog.png",
      href: "https://medium.com/@example/flight-booking-redesign",
      ctaLabel: "Read On Medium",
    },
    {
      type: "native",
      category: "Interaction",
      tags: ["Micro-interactions"],
      title: "Scroll-Triggered Animation Without Hurting Performance",
      excerpt:
        "A practical checklist for using scroll-linked motion in marketing pages without tanking Lighthouse scores on low-end devices.",
      publishedDate: "April 9, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/scroll-triggered-animation-performance",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "User Experience",
      tags: ["Ux Theory"],
      title: "Card Sorting At Small Scale: What Still Works With 5 Users",
      excerpt:
        "Running lightweight information-architecture research on a startup timeline, and what the results are actually good for.",
      publishedDate: "March 21, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/card-sorting-small-scale-research",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "User Interface",
      title: "A Practical Approach To Dark Mode Color Tokens",
      excerpt:
        "How I structure surface, border, and text tokens so a dark theme doesn't become a second design system to maintain.",
      publishedDate: "March 2, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/dark-mode-color-tokens",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "Interaction",
      tags: ["Micro-interactions"],
      title: "Form Validation Timing: Inline, On Blur, Or On Submit",
      excerpt:
        "Comparing three validation timing strategies against real error rates from a multi-step checkout form redesign.",
      publishedDate: "February 14, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/form-validation-timing",
      ctaLabel: "View Details",
    },
    {
      type: "native",
      category: "User Experience",
      tags: ["Ux Theory"],
      title: "Mapping Drop-Off Points In A B2B Onboarding Flow",
      excerpt:
        "Using session recordings and funnel analytics together to find where a SaaS onboarding flow was quietly losing new accounts.",
      publishedDate: "January 30, 2026",
      image: "/images/blog/blog.png",
      href: "/blog/b2b-onboarding-drop-off",
      ctaLabel: "View Details",
    },
  ],
};
