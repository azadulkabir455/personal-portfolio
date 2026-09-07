"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { blogContent } from "@/designUI/utilities/content/blog";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { getPublishedPosts } from "@/firebase/blogService";

const FEATURED_POST_COUNT = 3;

export function useBlog() {
  const { data, isLoading } = useSectionContent("blog", blogContent);
  const { data: posts } = useFirestoreCollection(getPublishedPosts, blogListContent.posts);

  return {
    data: {
      intro: data.intro,
      posts: posts.slice(0, FEATURED_POST_COUNT),
    },
    isLoading,
  };
}
