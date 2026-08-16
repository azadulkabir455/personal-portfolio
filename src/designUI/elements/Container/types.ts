import type { HTMLAttributes, ReactNode } from "react";

export type ContainerVariant = "div" | "span" | "section";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  variant?: ContainerVariant;
  className?: string;
  children?: ReactNode;
  [key: `data-${string}`]: unknown;
}
