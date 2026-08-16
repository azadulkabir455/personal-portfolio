import type { ComponentProps, ReactNode } from "react";
import type NextLink from "next/link";

export interface LinkProps extends ComponentProps<typeof NextLink> {
  className?: string;
  children?: ReactNode;
}
