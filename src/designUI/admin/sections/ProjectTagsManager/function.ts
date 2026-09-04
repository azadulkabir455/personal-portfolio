"use client";

import { useState } from "react";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";

export function useProjectTagsManager() {
  const [tags, setTags] = useState<string[]>(featuredProjectsContent.availableTags);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => [...current, trimmed]);
  };

  const renameTag = (oldTag: string, newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => current.map((tag) => (tag === oldTag ? trimmed : tag)));
  };

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((item) => item !== tag));
  };

  return { tags, addTag, renameTag, removeTag };
}
