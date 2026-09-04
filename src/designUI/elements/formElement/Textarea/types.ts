import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  containerClassName?: string;
}
