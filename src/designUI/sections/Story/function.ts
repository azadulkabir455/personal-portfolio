"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { storyContent } from "@/designUI/utilities/content/story";

export function useStory() {
  return useSectionContent("story", storyContent);
}
