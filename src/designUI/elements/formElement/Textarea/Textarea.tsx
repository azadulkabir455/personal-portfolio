import { forwardRef } from "react";
import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import type { TextareaProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, error, rows = 4, containerClassName = "", className = "", ...props },
  ref,
) {
  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          placeholder=" "
          aria-invalid={Boolean(error)}
          className={clsx(
            "peer w-full resize-none rounded-[10px] border bg-white px-3 pt-5 pb-2 font-sans text-[13px] text-[#171717] outline-none transition-colors duration-200 lg:px-4 lg:pt-6 lg:text-[14px]",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(
            "pointer-events-none absolute left-3 font-sans text-[#8A8A86] transition-all duration-200 lg:left-4",
            "top-2 text-[10px] lg:text-[11px]",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13px] lg:peer-placeholder-shown:text-[14px]",
            "peer-focus:top-2 peer-focus:text-[10px] lg:peer-focus:text-[11px]",
          )}
        >
          {label}
        </label>
      </div>
      <FieldError message={error} />
    </div>
  );
});

export default Textarea;
