"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { featureContent } from "@/designUI/utilities/content/feature";

export function useFeature() {
  return useSectionContent("feature", featureContent);
}
