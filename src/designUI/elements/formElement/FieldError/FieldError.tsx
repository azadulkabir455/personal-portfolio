import clsx from "clsx";
import type { FieldErrorProps } from "./types";

export default function FieldError({ message, className = "" }: FieldErrorProps) {
  return (
    <span
      className={clsx(
        "block min-h-[14px] font-sans text-[10px] leading-[14px] text-[#E5484D] lg:min-h-[16px] lg:text-[11px] lg:leading-[16px]",
        className,
      )}
    >
      {message}
    </span>
  );
}
