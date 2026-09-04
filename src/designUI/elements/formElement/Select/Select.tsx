"use client";

import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import ChevronDownIcon from "@/designUI/utilities/icons/icon/ChevronDownIcon";
import type { SelectProps } from "./types";

export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  containerClassName = "",
}: SelectProps) {
  const groups = Array.from(new Set(options.map((option) => option.group).filter(Boolean)));
  const ungrouped = options.filter((option) => !option.group);
  const hasEmptyOption = options.some((option) => option.value === "");

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={clsx(
            "peer h-[44px] w-full appearance-none rounded-[10px] border bg-white px-3 font-sans text-[13px] text-[#171717] outline-none transition-colors duration-200 lg:h-[52px] lg:px-4 lg:text-[14px]",
            value ? "pr-16 lg:pr-[68px]" : "pr-9 lg:pr-10",
            !value && "text-[#8A8A86]",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
          )}
        >
          {!hasEmptyOption && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {ungrouped.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {groups.map((group) => (
            <optgroup key={group} label={group}>
              {options
                .filter((option) => option.group === group)
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>

        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-3 -translate-y-1/2 rounded-[6px] bg-white px-1 font-sans text-[10px] text-[#8A8A86] lg:text-[11px]"
        >
          {label}
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear selection"
            className="absolute top-1/2 right-8 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717] lg:right-9"
          >
            <Icon name="FaTimes" width={10} height={10} />
          </button>
        )}

        <ChevronDownIcon
          color="#8A8A86"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 lg:right-4"
        />
      </div>

      <FieldError message={error} />
    </div>
  );
}
