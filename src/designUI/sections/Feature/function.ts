"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { featureContent } from "@/designUI/utilities/content/feature";
import { defaultSectionVisibility } from "@/designUI/admin/utilities/content/landingSections";

const visibilityKeyByHref: Record<string, string> = {
  "#story": "story",
  "#journey": "journey",
  "#featured-projects": "featuredProjects",
};

export function useFeature() {
  const { data } = useSectionContent("feature", featureContent);
  const { data: sectionVisibility } = useSectionContent("homeSections", defaultSectionVisibility);

  const links = data.links.filter((link) => {
    const visibilityKey = visibilityKeyByHref[link.href];
    return visibilityKey ? sectionVisibility[visibilityKey] : true;
  });

  return { links };
}
