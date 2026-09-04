import type { FeaturedProjectSecondaryCta } from "@/designUI/utilities/content/featuredProjects";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  ctaLabel?: string;
  ctaLink?: string;
  image: string;
  reverse?: boolean;
  secondaryCta?: FeaturedProjectSecondaryCta;
}
