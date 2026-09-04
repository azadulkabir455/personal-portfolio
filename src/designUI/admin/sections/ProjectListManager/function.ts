"use client";

import { useMemo, useState } from "react";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import type { FeaturedProject } from "@/designUI/utilities/content/featuredProjects";
import type { SelectOption } from "@/designUI/elements/formElement/Select/types";
import type { DateRangeValue } from "@/designUI/elements/formElement/DatePicker/types";

function buildTagOptions(): SelectOption[] {
  return [
    { value: "", label: "All Tags" },
    ...featuredProjectsContent.availableTags.map((tag) => ({ value: tag, label: tag })),
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

export function useProjectListManager() {
  const [projects, setProjects] = useState<FeaturedProject[]>(featuredProjectsContent.projects);
  const [searchQuery, setSearchQueryState] = useState("");
  const [tagFilter, setTagFilterState] = useState("");
  const [dateFilter, setDateFilterState] = useState<DateRangeValue>(EMPTY_DATE_RANGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewProject, setViewProject] = useState<FeaturedProject | null>(null);

  const setSearchQuery = (value: string) => {
    setSearchQueryState(value);
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

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      if (query && !project.title.toLowerCase().includes(query)) return false;
      if (tagFilter && !project.tags.includes(tagFilter)) return false;

      if (dateFilter.from || dateFilter.to) {
        const projectDate = toDateInputValue(project.publishedDate);
        if (!projectDate) return false;
        if (dateFilter.from && projectDate < dateFilter.from) return false;
        if (dateFilter.to && projectDate > dateFilter.to) return false;
      }

      return true;
    });
  }, [projects, searchQuery, tagFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const toggleSelect = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((current) =>
      current.size === paginatedProjects.length
        ? new Set()
        : new Set(paginatedProjects.map((project) => project.id)),
    );
  };

  const deleteProject = (id: string) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    setSelected((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

  const bulkDelete = () => {
    setProjects((current) => current.filter((project) => !selected.has(project.id)));
    setSelected(new Set());
  };

  return {
    projects: paginatedProjects,
    filteredCount: filteredProjects.length,
    totalCount: projects.length,
    currentPage: safePage,
    totalPages,
    goToPage,
    tagOptions: buildTagOptions(),
    searchQuery,
    setSearchQuery,
    tagFilter,
    setTagFilter,
    dateFilter,
    setDateFilter,
    selected,
    toggleSelect,
    toggleSelectAll,
    deleteProject,
    bulkDelete,
    viewProject,
    setViewProject,
  };
}
