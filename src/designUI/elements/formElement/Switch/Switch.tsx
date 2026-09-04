"use client";

import clsx from "clsx";
import type { SwitchProps } from "./types";

export default function Switch({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: SwitchProps) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "inline-flex items-center gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      {label && <span className="font-sans text-[13px] font-medium text-[#171717]">{label}</span>}

      <span
        className={clsx(
          "relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full transition-colors duration-200",
          checked
            ? "bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)]"
            : "bg-[#E4E4E4]",
        )}
      >
        <span
          className={clsx(
            "inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[23px]" : "translate-x-[3px]",
          )}
        />
      </span>

      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
    </label>
  );
}
