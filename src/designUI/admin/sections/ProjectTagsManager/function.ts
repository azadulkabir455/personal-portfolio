"use client";

import { useState } from "react";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSectionContent } from "@/customHooks/useSectionContent";

export function useProjectTagsManager() {
  const { data } = useSectionContent("featuredProjects", featuredProjectsContent);
  const [tags, setTags] = useState<string[]>(data.availableTags);
  const [syncedData, setSyncedData] = useState(data);

  if (syncedData !== data) {
    setSyncedData(data);
    setTags(data.availableTags);
  }

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
