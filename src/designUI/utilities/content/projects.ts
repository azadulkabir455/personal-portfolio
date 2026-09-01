import { featuredProjectsContent } from "./featuredProjects";
import type { FeaturedProject } from "./featuredProjects";

export type { FeaturedProject };

export interface ProjectsIntro {
  badge: string;
  description: string;
}

export interface ProjectsContent {
  intro: ProjectsIntro;
  projects: FeaturedProject[];
}

export const projectsContent: ProjectsContent = {
  intro: {
    badge: "Selected Projects",
    description:
      "A closer look at the products I've designed — from research and wireframes to polished, shippable interfaces.",
  },
  projects: featuredProjectsContent.projects,
};
