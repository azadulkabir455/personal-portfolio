"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { projectsContent } from "@/designUI/utilities/content/projects";
import { getFeaturedProjectsForPublic } from "@/firebase/projectService";

export function useProjects() {
  const { data: sectionData, isLoading } = useSectionContent("projects", {
    intro: projectsContent.intro,
  });
  const { data: projects } = useFirestoreCollection(
    getFeaturedProjectsForPublic,
    projectsContent.projects,
  );

  return { data: { ...sectionData, projects }, isLoading };
}
