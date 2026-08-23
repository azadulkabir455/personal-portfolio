"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { recentDesignContent } from "@/designUI/utilities/content/recentDesign";

export function useRecentDesign() {
  return useSectionContent("recentDesign", recentDesignContent);
}
