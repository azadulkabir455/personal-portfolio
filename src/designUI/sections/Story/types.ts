import type { ReactNode } from "react";
import type { StoryStat } from "@/designUI/utilities/content/story";

export interface ProcessPillProps {
  className?: string;
  image?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export type StatItemProps = StoryStat;
