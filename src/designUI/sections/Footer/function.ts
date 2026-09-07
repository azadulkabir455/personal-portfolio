"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { footerContent } from "@/designUI/utilities/content/footer";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { toTelLink } from "@/designUI/utilities/phone";

export function useFooter() {
  const { data, isLoading } = useSectionContent("footer", footerContent);
  const { data: personalInfo } = useSectionContent("personalInfo", personalInfoContent);

  return {
    data: {
      ...data,
      profile: {
        ...data.profile,
        resumeHref: personalInfo.cv,
        ctaHref: toTelLink(personalInfo.phone),
      },
    },
    phone: personalInfo.phone,
    isLoading,
  };
}
