import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { montserrat } from "@/designUI/utilities/fonts/fonts";
import { ChevronDownIcon, CloseIcon } from "@/designUI/utilities/icons";
import type { CategorySidebarProps } from "../types";

const labelClassName =
  "font-sans font-medium text-[14px] leading-[18px] tracking-[0.25px] capitalize text-[#242423]";

const countClassName = clsx(
  montserrat.className,
  "text-[14px] leading-[150%] tracking-[0px] text-center text-[#616161]",
);

const subLabelClassName =
  "font-sans font-medium text-[14px] leading-[18px] tracking-[0.25px] capitalize text-[#616161]";

const checkboxWrapperClassName = "relative flex h-[16px] w-[16px] shrink-0 items-center justify-center";

const checkboxInputClassName =
  "absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[3.2px] border-[0.8px] border-[#D7D7D7] bg-white checked:border-[#388EFF] checked:bg-[#388EFF]";

export default function CategorySidebar({
  categories,
  activeCategories,
  expandedCategoryId,
  onToggleCategory,
  onClearCategories,
  activeSubCategories,
  onToggleSubCategory,
  onToggleExpand,
  onClose,
}: CategorySidebarProps) {
  const totalCount = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <Container
      className={clsx(
        "flex w-full flex-col rounded-[4px] border border-[#D7D7D7] bg-[#FFFFFF] px-[12px] py-[16px] min-[900px]:w-[220px] min-[900px]:shrink-0 lg:w-[280px]",
        onClose && "h-full overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.25)]",
      )}
    >
      {onClose && (
        <Container className="mb-[15px] flex items-center justify-between gap-[8px] border-b-[1.5px] border-[#D7D7D7] pb-[15px]">
          <Text className={labelClassName}>Filter</Text>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filter"
            className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#EAF2FF]"
          >
            <CloseIcon width={10} height={10} />
          </button>
        </Container>
      )}

      <Container className="flex items-center justify-between gap-[8px] border-b-[1.5px] border-[#D7D7D7] py-[15px] pt-0">
        <label className="flex flex-1 cursor-pointer items-center gap-[12px]">
          <Container className={checkboxWrapperClassName}>
            <input
              type="checkbox"
              checked={activeCategories.length === 0}
              onChange={onClearCategories}
              className={checkboxInputClassName}
            />
            {activeCategories.length === 0 && (
              <FaCheck className="pointer-events-none relative h-[8px] w-[8px] text-white" />
            )}
          </Container>
          <Text className={labelClassName}>All Categories</Text>
        </label>
        <Text className={countClassName}>{totalCount}</Text>
      </Container>

      {categories.map((category, index) => {
        const isLast = index === categories.length - 1;
        const isChecked = activeCategories.includes(category.label);
        const isExpanded = expandedCategoryId === category.id || isChecked;

        return (
          <Container
            key={category.id}
            className={clsx(
              "flex flex-col py-[15px]",
              !isLast && "border-b-[1.5px] border-[#D7D7D7]",
            )}
          >
            <Container className="flex items-center justify-between gap-[8px]">
              <label className="flex flex-1 cursor-pointer items-center gap-[12px]">
                <Container className={checkboxWrapperClassName}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCategory(category.label)}
                    className={checkboxInputClassName}
                  />
                  {isChecked && (
                    <FaCheck className="pointer-events-none relative h-[8px] w-[8px] text-white" />
                  )}
                </Container>
                <Text className={labelClassName}>
                  {category.label} <span className={countClassName}>({category.count})</span>
                </Text>
              </label>

              {category.subCategories && (
                <button
                  type="button"
                  onClick={() => onToggleExpand(category.id)}
                  aria-label={`Toggle ${category.label} subcategories`}
                >
                  <ChevronDownIcon
                    className={clsx("transition-transform duration-200", isExpanded && "rotate-180")}
                  />
                </button>
              )}
            </Container>

            {category.subCategories && (
              <Container
                className={clsx(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <Container className="overflow-hidden">
                  <Container className="mt-[15px] flex flex-col gap-[12px] pl-[20px]">
                    {category.subCategories.map((sub) => {
                      const isSubChecked = activeSubCategories.includes(sub.id);

                      return (
                        <Container key={sub.id} className="flex items-center justify-between gap-[8px]">
                          <label className="flex flex-1 cursor-pointer items-center gap-[12px]">
                            <Container className={checkboxWrapperClassName}>
                              <input
                                type="checkbox"
                                checked={isSubChecked}
                                onChange={() => onToggleSubCategory(sub.id)}
                                className={checkboxInputClassName}
                              />
                              {isSubChecked && (
                                <FaCheck className="pointer-events-none relative h-[8px] w-[8px] text-white" />
                              )}
                            </Container>
                            <Text className={subLabelClassName}>{sub.label}</Text>
                          </label>
                          <Text className={countClassName}>{sub.count}</Text>
                        </Container>
                      );
                    })}
                  </Container>
                </Container>
              </Container>
            )}
          </Container>
        );
      })}
    </Container>
  );
}
