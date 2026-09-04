import type { BlogCategory } from "@/designUI/utilities/content/blogList";

export interface BlogCategoryCardProps {
  category: BlogCategory;
  onRename: (label: string) => void;
  onRemove: () => void;
  onAddSubCategory: (label: string) => void;
  onRenameSubCategory: (subId: string, label: string) => void;
  onRemoveSubCategory: (subId: string) => void;
}
