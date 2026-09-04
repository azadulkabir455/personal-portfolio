"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import type { DatePickerProps } from "./types";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseValue(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplay(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = "Select a date range",
  containerClassName = "",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fromDate = parseValue(value.from);
  const toDate = parseValue(value.to);
  const [viewDate, setViewDate] = useState(fromDate ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fromDate) setViewDate(fromDate);
  }, [value.from]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const dayTime = (day: number) => new Date(year, month, day).getTime();

  const isFrom = (day: number) => Boolean(fromDate && dayTime(day) === fromDate.getTime());
  const isTo = (day: number) => Boolean(toDate && dayTime(day) === toDate.getTime());
  const isInRange = (day: number) => {
    if (!fromDate || !toDate) return false;
    const time = dayTime(day);
    return time > fromDate.getTime() && time < toDate.getTime();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const selectDay = (day: number) => {
    const picked = new Date(year, month, day);

    if (!fromDate || (fromDate && toDate)) {
      onChange({ from: formatValue(picked), to: "" });
      return;
    }

    if (picked.getTime() < fromDate.getTime()) {
      onChange({ from: formatValue(picked), to: "" });
      return;
    }

    onChange({ from: value.from, to: formatValue(picked) });
    setIsOpen(false);
  };

  const hasValue = Boolean(value.from || value.to);

  const displayText = fromDate
    ? `${formatDisplay(fromDate)} - ${toDate ? formatDisplay(toDate) : "..."}`
    : placeholder;

  return (
    <div ref={containerRef} className={clsx("flex flex-col gap-1", containerClassName)}>
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen((current) => !current)}
          className={clsx(
            "flex h-[44px] w-full cursor-pointer items-center justify-between rounded-[10px] border bg-white px-3 font-sans text-[13px] outline-none transition-colors duration-200 lg:h-[52px] lg:px-4 lg:text-[14px]",
            hasValue ? "pr-16 lg:pr-[68px]" : "pr-9 lg:pr-10",
            fromDate ? "text-[#171717]" : "text-[#8A8A86]",
            error ? "border-[#E5484D]" : "border-[#E4E4E4] focus:border-[#242423]",
          )}
        >
          <span className="truncate">{displayText}</span>
        </button>

        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-3 -translate-y-1/2 rounded-[6px] bg-white px-1 font-sans text-[10px] text-[#8A8A86] lg:text-[11px]"
        >
          {label}
        </label>

        {hasValue && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange({ from: "", to: "" });
            }}
            aria-label="Clear date range"
            className="absolute top-1/2 right-8 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717] lg:right-9"
          >
            <Icon name="FaTimes" width={10} height={10} />
          </button>
        )}

        <Icon
          name="FaRegCalendarAlt"
          width={14}
          height={14}
          color="#8A8A86"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 lg:right-4"
        />

        {isOpen && (
          <div className="absolute top-full left-0 z-20 mt-2 w-[280px] rounded-[12px] border border-[#E4E4E4] bg-white p-3 shadow-lg">
            {fromDate && !toDate && (
              <p className="pb-2 font-sans text-[11px] text-[#8A8A86]">
                Now pick the end date.
              </p>
            )}

            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                aria-label="Previous month"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]"
              >
                <Icon name="FaChevronLeft" width={10} height={10} />
              </button>
              <span className="font-sans text-[13px] font-semibold text-[#171717]">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                aria-label="Next month"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]"
              >
                <Icon name="FaChevronRight" width={10} height={10} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 pb-1">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="flex h-7 items-center justify-center font-sans text-[10px] font-medium text-[#8A8A86]"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, index) =>
                day === null ? (
                  <span key={`empty-${index}`} />
                ) : (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDay(day)}
                    className={clsx(
                      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] font-sans text-[12px] transition-colors duration-150",
                      isFrom(day) || isTo(day)
                        ? "bg-[#242423] text-white"
                        : isInRange(day)
                          ? "bg-[#F0F0F0] text-[#171717]"
                          : isToday(day)
                            ? "border border-[#242423] text-[#171717]"
                            : "text-[#171717] hover:bg-[#F7F7F7]",
                    )}
                  >
                    {day}
                  </button>
                ),
              )}
            </div>

            {hasValue && (
              <button
                type="button"
                onClick={() => {
                  onChange({ from: "", to: "" });
                  setIsOpen(false);
                }}
                className="mt-2 w-full cursor-pointer rounded-[8px] py-1.5 text-center font-sans text-[12px] text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      <FieldError message={error} />
    </div>
  );
}
