"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Icon from "@/designUI/elements/Icon/Icon";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import { filterIconNames } from "./function";
import type { IconSelectProps } from "./types";

export default function IconSelect({
  id,
  label,
  value,
  onChange,
  error,
  containerClassName = "",
}: IconSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterIconNames(query), [query]);

  return (
    <div className={clsx("relative flex flex-col gap-1", containerClassName)}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((current) => !current)}
        className={clsx(
          "flex h-[44px] w-full items-center gap-2 rounded-[10px] border bg-white px-3 font-sans text-[13px] text-[#171717] transition-colors duration-200 lg:h-[52px] lg:gap-3 lg:px-4 lg:text-[14px]",
          error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
        )}
      >
        {value ? (
          <>
            <Icon name={value} width={16} height={16} />
            <span>{value}</span>
          </>
        ) : (
          <span className="text-[#8A8A86]">Select an icon</span>
        )}
      </button>
      <span className="pointer-events-none absolute top-0 left-3 -translate-y-1/2 rounded-[6px] bg-white px-1 font-sans text-[10px] text-[#8A8A86] lg:text-[11px]">
        {label}
      </span>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-2 flex w-full flex-col gap-3 rounded-[10px] border border-[#E4E4E4] bg-white p-3 shadow-lg">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icon name..."
            className="h-[38px] w-full rounded-[8px] border border-[#E4E4E4] px-3 font-sans text-[13px] outline-none focus:border-[#242423]"
          />

          <div className="grid max-h-[220px] grid-cols-6 gap-2 overflow-y-auto">
            {results.map((name) => (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setIsOpen(false);
                  setQuery("");
                }}
                className={clsx(
                  "flex h-[36px] w-[36px] items-center justify-center rounded-[8px] transition-colors duration-150 hover:bg-[#F7F7F7]",
                  value === name && "bg-[#242423] text-white",
                )}
              >
                <Icon name={name} width={16} height={16} />
              </button>
            ))}
          </div>
        </div>
      )}

      <FieldError message={error} />
    </div>
  );
}
