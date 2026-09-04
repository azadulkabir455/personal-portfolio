"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { blogListContent } from "@/designUI/utilities/content/blogList";

const RELATED_POST_COUNT = 3;

export function useBlogDetails() {
  const { data, isLoading } = useSectionContent("blogDetails", blogDetailsContent);

  return {
    data,
    isLoading,
    relatedPosts: blogListContent.posts.slice(0, RELATED_POST_COUNT),
  };
}
