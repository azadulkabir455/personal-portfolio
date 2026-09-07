"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { termsAndConditionsContent } from "@/designUI/utilities/content/termsAndConditions";

export function useTermsAndConditions() {
  return useSectionContent("termsAndConditions", termsAndConditionsContent);
}
