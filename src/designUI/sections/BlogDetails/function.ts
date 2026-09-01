"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { blogContent } from "@/designUI/utilities/content/blog";

export function useBlogDetails() {
  const { data, isLoading } = useSectionContent("blogDetails", blogDetailsContent);

  return {
    data,
    isLoading,
    relatedPosts: blogContent.posts,
  };
}
