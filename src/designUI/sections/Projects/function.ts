"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { projectsContent } from "@/designUI/utilities/content/projects";

export function useProjects() {
  return useSectionContent("projects", projectsContent);
}
