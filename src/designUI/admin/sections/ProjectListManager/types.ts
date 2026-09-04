import type { FeaturedProject } from "@/designUI/utilities/content/featuredProjects";

export interface ProjectListRowProps {
  project: FeaturedProject;
  checked: boolean;
  onToggle: () => void;
  onView: () => void;
  onDelete: () => void;
}

export interface ProjectViewModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}
