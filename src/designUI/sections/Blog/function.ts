"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogContent } from "@/designUI/utilities/content/blog";
import { blogListContent } from "@/designUI/utilities/content/blogList";

const FEATURED_POST_COUNT = 3;

export function useBlog() {
  const { data, isLoading } = useSectionContent("blog", blogContent);

  return {
    data: {
      intro: data.intro,
      posts: blogListContent.posts.slice(0, FEATURED_POST_COUNT),
    },
    isLoading,
  };
}
