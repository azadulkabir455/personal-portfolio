import { forwardRef } from "react";
import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import type { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, type = "text", label, error, endAdornment, containerClassName = "", className = "", ...props },
  ref,
) {
  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder=" "
          aria-invalid={Boolean(error)}
          className={clsx(
            "peer h-[52px] w-full rounded-[10px] border bg-white px-4 font-sans text-[14px] text-[#171717] outline-none transition-colors duration-200",
            endAdornment && "pr-12",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(
            "pointer-events-none absolute left-3 rounded-[6px] bg-white px-1 font-sans text-[#8A8A86] transition-all duration-200",
            "top-0 -translate-y-1/2 text-[11px]",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px]",
            "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:text-[#242423]",
          )}
        >
          {label}
        </label>
        {endAdornment && (
          <span className="absolute top-0 right-0 flex h-full items-center">{endAdornment}</span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
});

export default Input;
