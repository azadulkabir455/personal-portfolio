import type { FormHTMLAttributes, ReactNode } from "react";

export interface FormContainerProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}
