"use client";

import { useState } from "react";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { BlogCategory } from "@/designUI/utilities/content/blogList";

let idCounter = 0;
function generateId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function useBlogCategoriesManager() {
  const [categories, setCategories] = useState<BlogCategory[]>(blogListContent.categories);
  const [tags, setTags] = useState<string[]>(blogListContent.suggestions);

  const addCategory = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setCategories((current) => [...current, { id: generateId("category"), label: trimmed, count: 0 }]);
  };

  const renameCategory = (id: string, label: string) => {
    setCategories((current) =>
      current.map((category) => (category.id === id ? { ...category, label } : category)),
    );
  };

  const removeCategory = (id: string) => {
    setCategories((current) => current.filter((category) => category.id !== id));
  };

  const addSubCategory = (categoryId: string, label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subCategories: [
                ...(category.subCategories ?? []),
                { id: generateId("sub"), label: trimmed, count: 0 },
              ],
            }
          : category,
      ),
    );
  };

  const renameSubCategory = (categoryId: string, subId: string, label: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subCategories: category.subCategories?.map((sub) =>
                sub.id === subId ? { ...sub, label } : sub,
              ),
            }
          : category,
      ),
    );
  };

  const removeSubCategory = (categoryId: string, subId: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? { ...category, subCategories: category.subCategories?.filter((sub) => sub.id !== subId) }
          : category,
      ),
    );
  };

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
