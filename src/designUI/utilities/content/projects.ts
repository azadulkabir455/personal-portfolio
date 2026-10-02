import { featuredProjectsContent } from "./featuredProjects";
import type { FeaturedProject, FeaturedProjectsIntro } from "./featuredProjects";

export type { FeaturedProject };

export interface ProjectsContent {
  intro: FeaturedProjectsIntro;
  projects: FeaturedProject[];
}

export const projectsContent: ProjectsContent = {
  intro: featuredProjectsContent.intro,
  projects: featuredProjectsContent.projects,
};
