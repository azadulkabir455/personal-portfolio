"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { journeyContent } from "@/designUI/utilities/content/journey";

export function useJourney() {
  return useSectionContent("journey", journeyContent);
}
