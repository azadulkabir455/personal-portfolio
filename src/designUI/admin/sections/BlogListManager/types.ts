import type { BlogPost } from "@/designUI/utilities/content/blog";

export interface BlogListRowProps {
  post: BlogPost;
  checked: boolean;
  onToggle: () => void;
  onView: () => void;
  onDelete: () => void;
}

export interface BlogViewModalProps {
  post: BlogPost | null;
  onClose: () => void;
}
