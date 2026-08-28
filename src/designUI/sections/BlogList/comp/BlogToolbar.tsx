import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { CrossCircleIcon, SortIcon } from "@/designUI/utilities/icons";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { BlogToolbarProps } from "../types";

const chipClassName =
  "flex h-[44px] items-center gap-[12px] rounded-[4px] border border-[#E5E6E6] bg-white px-[10px] py-[10px]";

const labelClassName =
  "font-sans text-[14px] leading-[28px] font-medium tracking-[0.25px] text-[#242423] md:text-[12px] md:leading-[24px] lg:text-[14px] lg:leading-[28px]";

export default function BlogToolbar({
  activeCategories,
  onClearCategories,
  suggestions,
  activeTag,
  onToggleTag,
  resultsCount,
  sortDirection,
  onToggleSortDirection,
}: BlogToolbarProps) {
  return (
    <Container className="flex flex-wrap items-center justify-between gap-[12px]">
      <Container className="flex flex-wrap items-center gap-[8px]">
        <Container className={chipClassName}>
          <Text className={labelClassName}>Filter</Text>

          {activeCategories.length > 0 && (
            <Container className="flex items-center gap-[8px]">
              <Container className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#006CFF]">
                <Text className="font-sans text-[14px] leading-[18px] font-light tracking-normal text-white">
                  {activeCategories.length}
                </Text>
              </Container>
              <button
                type="button"
                onClick={onClearCategories}
                aria-label="Clear all filters"
                className="flex items-center"
              >
                <CrossCircleIcon width={24} height={24} />
              </button>
            </Container>
          )}
        </Container>

        {suggestions.length > 0 && (
          <Container className="flex flex-wrap items-center gap-[12px]">
            <Text
              className={clsx(
                sora.className,
                "text-[14px] leading-[18px] font-bold tracking-normal text-[#2A2E34] md:text-[12px] lg:text-[14px]",
              )}
            >
              Suggestion:
            </Text>
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onToggleTag(suggestion)}
                className={clsx(
                  "cursor-pointer font-sans text-[14px] leading-[18px] font-light tracking-normal text-[#006CFF] md:text-[12px] lg:text-[14px]",
                  activeTag === suggestion ? "underline" : "hover:underline",
                )}
              >
                {suggestion}
                {index < suggestions.length - 1 ? "," : ""}
              </button>
            ))}
          </Container>
        )}
      </Container>

      <Container className="flex h-[44px] items-center justify-between gap-[8px] rounded-[4px] border border-[#E5E6E6] bg-white p-[10px]">
        <Text className="font-sans text-[14px] leading-[18px] font-light tracking-normal text-[#242423] md:text-[12px] lg:text-[14px]">
          {resultsCount} results
        </Text>
        <button
          type="button"
          onClick={onToggleSortDirection}
          aria-label="Toggle alphabetical sort direction"
          className="flex items-center justify-center rounded-[4px] border border-[#D7D7D7] p-[6px]"
        >
          <SortIcon
            width={19}
            height={14}
            className={clsx("transition-transform duration-200", sortDirection === "desc" && "rotate-180")}
          />
        </button>
      </Container>
    </Container>
  );
}
