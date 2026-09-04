export type BlogPostType = "native" | "external";

export interface BlogPost {
  type: BlogPostType;
  category: string;
  tags?: string[];
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
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
}

export const blogContent: BlogContent = {
  intro: {
    badge: "Let's dive into my article on UI and UX",
    description:
      "These articles reflect my approach to UI/UX design from solving real user problems and building scalable design systems to sharing practical workflows.",
  },
};
