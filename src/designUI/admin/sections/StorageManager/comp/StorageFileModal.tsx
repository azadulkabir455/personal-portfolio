"use client";

import { useEffect } from "react";
import NextImage from "next/image";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import type { StorageFileModalProps } from "../types";

const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

function isImageFile(name: string) {
  return imageExtensions.some((ext) => name.toLowerCase().endsWith(ext));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function StorageFileModal({ file, onClose, onDelete, isDeleting }: StorageFileModalProps) {
  useEffect(() => {
    if (!file) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [file, onClose]);

  if (!file) return null;

  return (
    <Container
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/60 p-4"
      onClick={onClose}
    >
      <Container
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-y-auto rounded-[16px] bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <Container className="mb-4 flex items-start justify-between gap-4">
          <Container className="flex min-w-0 flex-col gap-1">
            <Text className="truncate font-sans text-[15px] font-semibold text-[#171717]">
              {file.name}
            </Text>
            <Text className="font-sans text-[12px] text-[#8A8A86]">{formatBytes(file.size)}</Text>
          </Container>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F7F7F7] text-[#171717] hover:bg-[#E4E4E4]"
          >
            <Icon name="FaTimes" width={12} height={12} />
          </button>
        </Container>

        <Container className="relative mb-4 h-[320px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#F7F7F7]">
          {isImageFile(file.name) ? (
            <NextImage src={file.url} alt={file.name} fill className="object-contain" unoptimized />
          ) : (
            <Container className="flex h-full w-full flex-col items-center justify-center gap-2">
              <Icon name="FaFileAlt" width={40} height={40} color="#8A8A86" />
            </Container>
          )}
        </Container>

        <button
          type="button"
          onClick={() => onDelete(file)}
          disabled={isDeleting}
          className="flex cursor-pointer items-center justify-center gap-2 self-start rounded-full bg-[#FDEBEB] px-4 py-2 font-sans text-[13px] font-medium text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] disabled:cursor-wait disabled:opacity-70"
        >
          {isDeleting ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E5484D]/40 border-t-[#E5484D]" />
          ) : (
            <Icon name="FaTrashAlt" width={14} height={14} />
          )}
          Delete File
        </button>
      </Container>
    </Container>
  );
}
