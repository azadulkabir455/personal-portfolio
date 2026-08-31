import type { BlogCategory } from "@/designUI/utilities/content/blogList";

export type BlogSortDirection = "asc" | "desc";
export type BlogViewMode = "grid" | "list";

export interface CategorySidebarProps {
  categories: BlogCategory[];
  activeCategories: string[];
  expandedCategoryId: string | null;
  onToggleCategory: (label: string) => void;
  onClearCategories: () => void;
  activeSubCategories: string[];
  onToggleSubCategory: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onClose?: () => void;
}

export interface BlogToolbarProps {
  activeCategories: string[];
  onClearCategories: () => void;
  suggestions: string[];
  activeTag: string | null;
  onToggleTag: (tag: string) => void;
  resultsCount: number;
  sortDirection: BlogSortDirection;
  onToggleSortDirection: () => void;
  onOpenFilter: () => void;
}
