"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { journeyContent } from "@/designUI/utilities/content/journey";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { toTelLink } from "@/designUI/utilities/phone";

export function useJourney() {
  const { data, isLoading } = useSectionContent("journey", journeyContent);
  const { data: personalInfo } = useSectionContent("personalInfo", personalInfoContent);

  return {
    data: { ...data, intro: { ...data.intro, ctaLink: toTelLink(personalInfo.phone) } },
    phone: personalInfo.phone,
    isLoading,
  };
}
