"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { useFirestoreCollection } from "@/customHooks/useFirestoreCollection";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { getPublishedPosts } from "@/firebase/blogService";
import type { BlogPost } from "@/designUI/utilities/content/blog";

const RELATED_POST_COUNT = 3;

export function useBlogDetails(post: BlogPost) {
  const { data } = useSectionContent("blogDetails", blogDetailsContent);
  const { data: posts } = useFirestoreCollection(getPublishedPosts, blogListContent.posts);

  return {
    backLabel: data.backLabel,
    backHref: data.backHref,
    othersPostIntro: data.othersPostIntro,
    relatedPosts: posts.filter((item) => item.href !== post.href).slice(0, RELATED_POST_COUNT),
  };
}
