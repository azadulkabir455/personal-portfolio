import clsx from "clsx";
import type { FieldErrorProps } from "./types";

export default function FieldError({ message, className = "" }: FieldErrorProps) {
  return (
    <span
      className={clsx(
        "block min-h-[16px] font-sans text-[11px] leading-[16px] text-[#E5484D]",
        className,
      )}
    >
      {message}
    </span>
  );
}
