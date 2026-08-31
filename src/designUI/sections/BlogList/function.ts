"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { BlogSortDirection, BlogViewMode } from "./types";

const POSTS_PER_PAGE = 6;
const LOAD_MORE_DELAY = 600;

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMoreRef = useRef(false);

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

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

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

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [activeCategories, activeTag, sortDirection]);

  const hasMore = visibleCount < posts.length;
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);

  useEffect(() => {
    if (!hasMore) return;
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || isLoadingMoreRef.current) return;

      isLoadingMoreRef.current = true;
      setIsLoadingMore(true);

      window.setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length));
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
      }, LOAD_MORE_DELAY);
    }, { rootMargin: "300px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, posts.length]);

  return {
    categories: data.categories,
    suggestions: data.suggestions,
    resultsCount: posts.length,
    posts,
    visiblePosts,
    hasMore,
    isLoadingMore,
    loadMoreRef,
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
    isFilterOpen,
    openFilter,
    closeFilter,
  };
}
