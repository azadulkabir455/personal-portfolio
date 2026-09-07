"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { getFeaturedProjectsForPublic } from "@/firebase/projectService";

export function useFeaturedProjects() {
  const { data: sectionData, isLoading } = useSectionContent("featuredProjects", {
    intro: featuredProjectsContent.intro,
    availableTags: featuredProjectsContent.availableTags,
    cta: featuredProjectsContent.cta,
  });
  const { data: projects } = useFirestoreCollection(
    getFeaturedProjectsForPublic,
    featuredProjectsContent.projects,
  );

  return { data: { ...sectionData, projects }, isLoading };
}
