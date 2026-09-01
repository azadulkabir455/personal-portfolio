import type { BlogIntro, BlogPost } from "@/designUI/utilities/content/blog";

export interface BlogProps {
  intro?: BlogIntro;
  posts?: BlogPost[];
}
