import { forwardRef } from "react";
import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import type { TextareaProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, error, rows = 4, resizable = false, containerClassName = "", className = "", ...props },
  ref,
) {
  return (
    <div className={clsx("flex flex-col gap-1", resizable && "h-full", containerClassName)}>
      <div className={clsx("relative", resizable && "flex-1")}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          placeholder=" "
          aria-invalid={Boolean(error)}
          className={clsx(
            "peer w-full rounded-[10px] border bg-white px-3 pt-5 pb-2 font-sans text-[13px] text-[#171717] outline-none transition-colors duration-200 lg:px-4 lg:pt-6 lg:text-[14px]",
            resizable ? "h-full min-h-[120px] resize-y" : "resize-none",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(
            "pointer-events-none absolute left-3 rounded-[6px] bg-white px-1 font-sans text-[#8A8A86] transition-all duration-200 lg:left-4",
            "top-0 -translate-y-1/2 text-[10px] lg:text-[11px]",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:rounded-none peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-[13px] lg:peer-placeholder-shown:text-[14px]",
            "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:rounded-[6px] peer-focus:bg-white peer-focus:px-1 peer-focus:text-[10px] peer-focus:text-[#242423] lg:peer-focus:text-[11px]",
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
