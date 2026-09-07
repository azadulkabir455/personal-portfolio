"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { getFeaturedProjectsForPublic } from "@/firebase/projectService";
import { toTelLink } from "@/designUI/utilities/phone";

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
  const { data: personalInfo } = useSectionContent("personalInfo", personalInfoContent);

  return {
    data: {
      ...sectionData,
      projects,
      cta: { ...sectionData.cta, link: toTelLink(personalInfo.phone) },
    },
    phone: personalInfo.phone,
    isLoading,
  };
}
