import type { InputHTMLAttributes, ReactNode } from "react";

export type InputType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "password";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  type?: InputType;
  label: string;
  error?: string;
  endAdornment?: ReactNode;
  containerClassName?: string;
}
