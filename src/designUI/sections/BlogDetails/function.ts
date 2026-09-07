"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { getPublishedPosts } from "@/firebase/blogService";

const RELATED_POST_COUNT = 3;

export function useBlogDetails() {
  const { data, isLoading } = useSectionContent("blogDetails", blogDetailsContent);
  const { data: posts } = useFirestoreCollection(getPublishedPosts, blogListContent.posts);

  return {
    data,
    isLoading,
    relatedPosts: posts.slice(0, RELATED_POST_COUNT),
  };
}
