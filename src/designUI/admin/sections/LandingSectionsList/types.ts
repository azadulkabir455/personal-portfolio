import type { LandingSectionItem } from "@/designUI/admin/utilities/content/landingSections";

export interface LandingSectionCardProps {
  section: LandingSectionItem;
  enabled: boolean;
  onToggle: (key: string) => void;
}
