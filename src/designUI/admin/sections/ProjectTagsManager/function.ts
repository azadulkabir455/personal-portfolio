"use client";

import { useState } from "react";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { saveSectionContent } from "@/firebase/sectionContent";

export function useProjectTagsManager() {
  const [tags, setTags] = useState<string[]>(featuredProjectsContent.availableTags);

  const persist = (nextTags: string[]) => {
    saveSectionContent("featuredProjects", { availableTags: nextTags }).catch(console.error);
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => {
      const next = [...current, trimmed];
      persist(next);
      return next;
    });
  };

  const renameTag = (oldTag: string, newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => {
      const next = current.map((tag) => (tag === oldTag ? trimmed : tag));
      persist(next);
      return next;
    });
  };

  const removeTag = (tag: string) => {
    setTags((current) => {
      const next = current.filter((item) => item !== tag);
      persist(next);
      return next;
    });
  };

  return { tags, addTag, renameTag, removeTag };
}
