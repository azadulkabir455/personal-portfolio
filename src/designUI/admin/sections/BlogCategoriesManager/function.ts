"use client";

import { useState } from "react";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { BlogCategory } from "@/designUI/utilities/content/blogList";
import { saveSectionContent } from "@/firebase/sectionContent";

let idCounter = 0;
function generateId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function useBlogCategoriesManager() {
  const [categories, setCategories] = useState<BlogCategory[]>(blogListContent.categories);
  const [tags, setTags] = useState<string[]>(blogListContent.suggestions);

  const persist = (nextCategories: BlogCategory[], nextTags: string[]) => {
    saveSectionContent("blogList", { categories: nextCategories, suggestions: nextTags }).catch(
      console.error,
    );
  };

  const addCategory = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setCategories((current) => {
      const next = [...current, { id: generateId("category"), label: trimmed, count: 0 }];
      persist(next, tags);
      return next;
    });
  };

  const renameCategory = (id: string, label: string) => {
    setCategories((current) => {
      const next = current.map((category) => (category.id === id ? { ...category, label } : category));
      persist(next, tags);
      return next;
    });
  };

  const removeCategory = (id: string) => {
    setCategories((current) => {
      const next = current.filter((category) => category.id !== id);
      persist(next, tags);
      return next;
    });
  };

  const addSubCategory = (categoryId: string, label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setCategories((current) => {
      const next = current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subCategories: [
                ...(category.subCategories ?? []),
                { id: generateId("sub"), label: trimmed, count: 0 },
              ],
            }
          : category,
      );
      persist(next, tags);
      return next;
    });
  };

  const renameSubCategory = (categoryId: string, subId: string, label: string) => {
    setCategories((current) => {
      const next = current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subCategories: category.subCategories?.map((sub) =>
                sub.id === subId ? { ...sub, label } : sub,
              ),
            }
          : category,
      );
      persist(next, tags);
      return next;
    });
  };

  const removeSubCategory = (categoryId: string, subId: string) => {
    setCategories((current) => {
      const next = current.map((category) =>
        category.id === categoryId
          ? { ...category, subCategories: category.subCategories?.filter((sub) => sub.id !== subId) }
          : category,
      );
      persist(next, tags);
      return next;
    });
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => {
      const next = [...current, trimmed];
      persist(categories, next);
      return next;
    });
  };

  const renameTag = (oldTag: string, newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => {
      const next = current.map((tag) => (tag === oldTag ? trimmed : tag));
      persist(categories, next);
      return next;
    });
  };

  const removeTag = (tag: string) => {
    setTags((current) => {
      const next = current.filter((item) => item !== tag);
      persist(categories, next);
      return next;
    });
  };

  return {
    categories,
    tags,
    addCategory,
    renameCategory,
    removeCategory,
    addSubCategory,
    renameSubCategory,
    removeSubCategory,
    addTag,
    renameTag,
    removeTag,
  };
}
