import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "filled" | "plain";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  children?: ReactNode;
}
