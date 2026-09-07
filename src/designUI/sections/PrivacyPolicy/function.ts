"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { privacyPolicyContent } from "@/designUI/utilities/content/privacyPolicy";

export function usePrivacyPolicy() {
  return useSectionContent("privacyPolicy", privacyPolicyContent);
}
