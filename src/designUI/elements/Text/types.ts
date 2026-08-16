import type { HTMLAttributes, ReactNode } from "react";

export type TextVariant = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  className?: string;
  children?: ReactNode;
  [key: `data-${string}`]: unknown;
}
