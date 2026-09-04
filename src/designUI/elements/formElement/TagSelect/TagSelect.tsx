"use client";

import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import ChevronDownIcon from "@/designUI/utilities/icons/icon/ChevronDownIcon";
import type { TagSelectProps } from "./types";

export default function TagSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  containerClassName = "",
}: TagSelectProps) {
  const availableOptions = options.filter((option) => !value.includes(option));

  const addTag = (tag: string) => {
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <div className="relative">
        <select
          id={id}
          value=""
          disabled={availableOptions.length === 0}
          onChange={(event) => addTag(event.target.value)}
          className={clsx(
            "peer h-[44px] w-full appearance-none rounded-[10px] border bg-white px-3 pr-9 font-sans text-[13px] text-[#8A8A86] outline-none transition-colors duration-200 lg:h-[52px] lg:px-4 lg:pr-10 lg:text-[14px]",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
          )}
        >
          <option value="" disabled hidden>
            {availableOptions.length === 0 ? "No more tags available" : "Select a tag to add"}
          </option>
          {availableOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-3 -translate-y-1/2 rounded-[6px] bg-white px-1 font-sans text-[10px] text-[#8A8A86] lg:text-[11px]"
        >
          {label}
        </label>

        <ChevronDownIcon
          color="#8A8A86"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 lg:right-4"
        />
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-full bg-[#F7F7F7] py-1 pr-1.5 pl-3 font-sans text-[12px] text-[#171717]"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-[#8A8A86] hover:bg-[#E4E4E4] hover:text-[#171717]"
              >
                <Icon name="FaTimes" width={9} height={9} />
              </button>
            </span>
          ))}
        </div>
      )}

      <FieldError message={error} />
    </div>
  );
}
