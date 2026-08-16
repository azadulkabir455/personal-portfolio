"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { heroContent } from "@/designUI/utilities/content/hero";

export function useHero() {
  return useSectionContent("hero", heroContent);
}
