"use client";

import { useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import EditableLabelRow from "@/designUI/admin/comp/EditableLabelRow/EditableLabelRow";
import { useProjectTagsManager } from "./function";

export default function ProjectTagsManager() {
  const { tags, addTag, renameTag, removeTag } = useProjectTagsManager();
  const [tagDraft, setTagDraft] = useState("");

  const submitTag = () => {
    if (!tagDraft.trim()) return;
    addTag(tagDraft);
    setTagDraft("");
  };

  return (
    <Container className="flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10">
      <Container className="flex flex-col gap-1.5 lg:gap-2">
        <Text variant="h2" className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]">
          Project Tags
        </Text>
        <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
          Manage tags used across featured projects.
        </Text>
      </Container>

      <Container className="flex flex-col gap-4">
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
