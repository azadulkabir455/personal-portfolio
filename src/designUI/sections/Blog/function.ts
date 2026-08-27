"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogContent } from "@/designUI/utilities/content/blog";

export function useBlog() {
  return useSectionContent("blog", blogContent);
}
