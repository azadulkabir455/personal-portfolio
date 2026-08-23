"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";

export function useFeaturedProjects() {
  return useSectionContent("featuredProjects", featuredProjectsContent);
}
