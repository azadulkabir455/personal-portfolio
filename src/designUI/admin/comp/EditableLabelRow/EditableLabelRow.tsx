"use client";

import { useState } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import type { EditableLabelRowProps } from "./types";

const iconButtonClassName =
  "flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-[6px] transition-colors duration-150";

export default function EditableLabelRow({
  label,
  count,
  size = "md",
  onRename,
  onRemove,
}: EditableLabelRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) onRename(trimmed);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Container className="flex items-center gap-2">
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") save();
            if (event.key === "Escape") {
              setDraft(label);
              setIsEditing(false);
            }
          }}
          className="h-8 w-full rounded-[6px] border border-[#242423] bg-white px-2 font-sans text-[13px] text-[#171717] outline-none"
        />
        <button
          type="button"
          onClick={save}
          aria-label="Save"
          className={`${iconButtonClassName} bg-[#242423] text-white hover:bg-[#171717]`}
        >
          <Icon name="FaCheck" width={11} height={11} />
        </button>
      </Container>
    );
  }

  return (
    <Container className="flex items-center justify-between gap-2">
      <Container className="flex min-w-0 items-center gap-2">
        <Text
          className={clsx(
            "truncate font-sans",
            size === "md" ? "text-[14px] font-semibold text-[#171717]" : "text-[13px] text-[#616161]",
          )}
        >
          {label}
        </Text>
        {typeof count === "number" && (
          <span className="shrink-0 rounded-full bg-[#F7F7F7] px-2 py-0.5 font-sans text-[11px] text-[#8A8A86]">
            {count}
          </span>
        )}
      </Container>
      <Container className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Rename"
          className={`${iconButtonClassName} text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]`}
        >
          <Icon name="FaPen" width={11} height={11} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className={`${iconButtonClassName} bg-[#FDEBEB] text-[#E5484D] hover:bg-[#FBD8D8]`}
        >
          <Icon name="FaTrashAlt" width={11} height={11} />
        </button>
      </Container>
    </Container>
  );
}
