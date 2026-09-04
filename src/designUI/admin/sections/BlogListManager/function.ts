"use client";

import { useMemo, useState } from "react";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { BlogPost } from "@/designUI/utilities/content/blog";
import type { SelectOption } from "@/designUI/elements/formElement/Select/types";
import type { DateRangeValue } from "@/designUI/elements/formElement/DatePicker/types";

function buildCategoryOptions(): SelectOption[] {
  const options: SelectOption[] = [{ value: "", label: "All Categories" }];

  blogListContent.categories.forEach((category) => {
    options.push({ value: category.label, label: category.label });
    category.subCategories?.forEach((sub) => {
      options.push({ value: sub.label, label: sub.label, group: category.label });
    });
  });

  return options;
}

function buildTagOptions(): SelectOption[] {
  return [
    { value: "", label: "All Tags" },
    ...blogListContent.suggestions.map((tag) => ({ value: tag, label: tag })),
  ];
}

function toDateInputValue(publishedDate: string) {
  const parsed = new Date(publishedDate);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const PAGE_SIZE = 10;
const EMPTY_DATE_RANGE: DateRangeValue = { from: "", to: "" };

export function useBlogListManager() {
  const [posts, setPosts] = useState<BlogPost[]>(blogListContent.posts);
  const [categoryFilter, setCategoryFilterState] = useState("");
  const [tagFilter, setTagFilterState] = useState("");
  const [dateFilter, setDateFilterState] = useState<DateRangeValue>(EMPTY_DATE_RANGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewPost, setViewPost] = useState<BlogPost | null>(null);

  const setCategoryFilter = (value: string) => {
    setCategoryFilterState(value);
    setCurrentPage(1);
  };

  const setTagFilter = (value: string) => {
    setTagFilterState(value);
    setCurrentPage(1);
  };

  const setDateFilter = (value: DateRangeValue) => {
    setDateFilterState(value);
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (categoryFilter && post.category !== categoryFilter) return false;
      if (tagFilter && !(post.tags ?? []).includes(tagFilter)) return false;

      if (dateFilter.from || dateFilter.to) {
        const postDate = toDateInputValue(post.publishedDate);
        if (!postDate) return false;
        if (dateFilter.from && postDate < dateFilter.from) return false;
        if (dateFilter.to && postDate > dateFilter.to) return false;
      }

      return true;
    });
  }, [posts, categoryFilter, tagFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const toggleSelect = (href: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((current) =>
      current.size === paginatedPosts.length
        ? new Set()
        : new Set(paginatedPosts.map((post) => post.href)),
    );
  };

  const deletePost = (href: string) => {
    setPosts((current) => current.filter((post) => post.href !== href));
    setSelected((current) => {
      const next = new Set(current);
      next.delete(href);
      return next;
    });
  };

  const bulkDelete = () => {
    setPosts((current) => current.filter((post) => !selected.has(post.href)));
    setSelected(new Set());
  };

  return {
    posts: paginatedPosts,
    filteredCount: filteredPosts.length,
    totalCount: posts.length,
    currentPage: safePage,
    totalPages,
    goToPage,
    categoryOptions: buildCategoryOptions(),
    tagOptions: buildTagOptions(),
    categoryFilter,
    setCategoryFilter,
    tagFilter,
    setTagFilter,
    dateFilter,
    setDateFilter,
    selected,
    toggleSelect,
    toggleSelectAll,
    deletePost,
    bulkDelete,
    viewPost,
    setViewPost,
  };
}
