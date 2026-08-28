"use client";

import { useMemo, useState } from "react";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { BlogSortDirection, BlogViewMode } from "./types";

export function useBlogList() {
  const { data } = useSectionContent("blogList", blogListContent);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    data.categories[0]?.id ?? null,
  );
  const [sortDirection, setSortDirection] = useState<BlogSortDirection>("asc");
  const [viewMode, setViewMode] = useState<BlogViewMode>("grid");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const toggleCategory = (label: string) => {
    setActiveCategories((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );
  };

  const clearCategories = () => setActiveCategories([]);

  const toggleSubCategory = (id: string) => {
    setActiveSubCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const posts = useMemo(() => {
    let filtered = activeCategories.length
      ? data.posts.filter((post) => activeCategories.includes(post.category))
      : data.posts;

    if (activeTag) {
      filtered = filtered.filter((post) => post.tags?.includes(activeTag));
    }

    return [...filtered].sort((a, b) =>
      sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
    );
  }, [data.posts, activeCategories, activeTag, sortDirection]);

  return {
    categories: data.categories,
    suggestions: data.suggestions,
    resultsCount: posts.length,
    posts,
    activeCategories,
    expandedCategoryId,
    sortDirection,
    viewMode,
    activeTag,
    toggleCategory,
    clearCategories,
    activeSubCategories,
    toggleSubCategory,
    toggleExpanded,
    toggleSortDirection,
    toggleTag,
    setViewMode,
  };
}
