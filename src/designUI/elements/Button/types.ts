import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "filled" | "plain";
export type ButtonAs = "button" | "span";
export type ButtonIconMotion = "diagonal" | "vertical";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: ButtonAs;
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  iconMotion?: ButtonIconMotion;
  children?: ReactNode;
}
