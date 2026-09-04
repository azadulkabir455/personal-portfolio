"use client";

import { useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import EditableLabelRow from "@/designUI/admin/comp/EditableLabelRow/EditableLabelRow";
import type { BlogCategoryCardProps } from "../types";

export default function BlogCategoryCard({
  category,
  onRename,
  onRemove,
  onAddSubCategory,
  onRenameSubCategory,
  onRemoveSubCategory,
}: BlogCategoryCardProps) {
  const [subDraft, setSubDraft] = useState("");
  const subCategories = category.subCategories ?? [];

  const submitSubCategory = () => {
    if (!subDraft.trim()) return;
    onAddSubCategory(subDraft);
    setSubDraft("");
  };

  return (
    <Container className="flex flex-col gap-3 rounded-[12px] border border-[#E4E4E4] bg-[#FAFAFA] p-4">
      <Container className="rounded-[10px] bg-white p-3">
        <EditableLabelRow
          label={category.label}
          count={category.count}
          size="md"
          onRename={onRename}
          onRemove={onRemove}
        />
      </Container>

      <Container className="flex flex-col gap-2 pl-4">
        <span className="font-sans text-[10px] font-semibold tracking-[0.5px] text-[#8A8A86] uppercase">
          Subcategories
        </span>

        <Container className="flex flex-col">
          {subCategories.map((sub, index) => {
            const isLast = index === subCategories.length - 1;

            return (
              <Container key={sub.id} className="relative py-1.5 pl-5">
                <span className="absolute top-0 left-0 h-1/2 w-4 rounded-bl-[6px] border-b border-l border-[#D9D9D9]" />
                {!isLast && <span className="absolute top-1/2 left-0 h-1/2 w-px bg-[#D9D9D9]" />}
                <EditableLabelRow
                  label={sub.label}
                  count={sub.count}
                  size="sm"
                  onRename={(label) => onRenameSubCategory(sub.id, label)}
                  onRemove={() => onRemoveSubCategory(sub.id)}
                />
              </Container>
            );
          })}
        </Container>

        <Container className="flex items-center gap-2 rounded-[8px] border border-dashed border-[#D9D9D9] bg-white p-1.5 pl-3">
          <Icon name="FaPlus" width={9} height={9} color="#8A8A86" />
          <input
            value={subDraft}
            onChange={(event) => setSubDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submitSubCategory()}
            placeholder="Add subcategory"
            className="h-7 w-full bg-transparent font-sans text-[12px] text-[#171717] outline-none placeholder:text-[#8A8A86]"
          />
          <button
            type="button"
            onClick={submitSubCategory}
            className="shrink-0 cursor-pointer rounded-[6px] px-2 py-1 font-sans text-[12px] font-medium text-[#171717] hover:bg-[#F7F7F7]"
          >
            Add
          </button>
        </Container>
      </Container>
    </Container>
  );
}
