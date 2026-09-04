"use client";

import { useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import BlogCategoryCard from "./comp/BlogCategoryCard";
import EditableLabelRow from "@/designUI/admin/comp/EditableLabelRow/EditableLabelRow";
import { useBlogCategoriesManager } from "./function";

export default function BlogCategoriesManager() {
  const {
    categories,
    tags,
    addCategory,
    renameCategory,
    removeCategory,
    addSubCategory,
    renameSubCategory,
    removeSubCategory,
    addTag,
    renameTag,
    removeTag,
  } = useBlogCategoriesManager();

  const [categoryDraft, setCategoryDraft] = useState("");
  const [tagDraft, setTagDraft] = useState("");

  const submitCategory = () => {
    if (!categoryDraft.trim()) return;
    addCategory(categoryDraft);
    setCategoryDraft("");
  };

  const submitTag = () => {
    if (!tagDraft.trim()) return;
    addTag(tagDraft);
    setTagDraft("");
  };

  return (
    <Container className="flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10">
      <Container className="flex flex-col gap-1.5 lg:gap-2">
        <Text variant="h2" className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]">
          Blog Categories
        </Text>
        <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
          Manage categories, subcategories, and tags used across blog posts.
        </Text>
      </Container>

      <Container className="flex flex-col gap-4">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Categories</span>
        </Container>

        <Container className="flex items-center gap-2">
          <input
            value={categoryDraft}
            onChange={(event) => setCategoryDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submitCategory()}
            placeholder="New category name"
            className="h-[44px] w-full rounded-[10px] border border-[#E4E4E4] bg-white px-3 font-sans text-[13px] text-[#171717] outline-none focus:border-[#242423] lg:h-[52px] lg:px-4 lg:text-[14px]"
          />
          <Button type="button" className="shrink-0 whitespace-nowrap" onClick={submitCategory}>
            + Add Category
          </Button>
        </Container>

        <Container className="flex flex-col gap-3">
          {categories.map((category) => (
            <BlogCategoryCard
              key={category.id}
              category={category}
              onRename={(label) => renameCategory(category.id, label)}
              onRemove={() => removeCategory(category.id)}
              onAddSubCategory={(label) => addSubCategory(category.id, label)}
              onRenameSubCategory={(subId, label) => renameSubCategory(category.id, subId, label)}
              onRemoveSubCategory={(subId) => removeSubCategory(category.id, subId)}
            />
          ))}
        </Container>
      </Container>

      <Container className="mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 lg:mt-4 lg:pt-8">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">Tags</span>

        <Container className="flex items-center gap-2">
          <input
            value={tagDraft}
            onChange={(event) => setTagDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submitTag()}
            placeholder="New tag name"
            className="h-[44px] w-full rounded-[10px] border border-[#E4E4E4] bg-white px-3 font-sans text-[13px] text-[#171717] outline-none focus:border-[#242423] lg:h-[52px] lg:px-4 lg:text-[14px]"
          />
          <Button type="button" className="shrink-0 whitespace-nowrap" onClick={submitTag}>
            + Add Tag
          </Button>
        </Container>

        <Container className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {tags.map((tag) => (
            <Container key={tag} className="rounded-[10px] border border-[#E4E4E4] px-3 py-2">
              <EditableLabelRow
                label={tag}
                size="sm"
                onRename={(label) => renameTag(tag, label)}
                onRemove={() => removeTag(tag)}
              />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
}
