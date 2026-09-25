import type { ReactNode } from "react";

export interface HeroContentCardProps {
  children: ReactNode;
  className?: string;
}

export interface HeroProps {
  isLoading: boolean;
}
