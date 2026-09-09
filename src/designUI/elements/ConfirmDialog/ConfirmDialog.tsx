"use client";

import { useEffect } from "react";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import type { ConfirmDialogProps } from "./types";

export default function ConfirmDialog({
  isOpen,
  isLoading,
  title,
  message,
  confirmLabel,
  cancelLabel,
  closeConfirm,
  handleConfirm,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) closeConfirm();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, closeConfirm]);

  if (!isOpen) return null;

  return (
    <Container
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#171717]/60 p-4"
      onClick={() => !isLoading && closeConfirm()}
    >
      <Container
        className="flex w-full max-w-[380px] flex-col items-center rounded-[16px] bg-white p-6 text-center sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <Container className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDEBEB]">
          <Icon name="FaTrashAlt" width={18} height={18} color="#E5484D" />
        </Container>

        <span className="font-sans text-[15px] font-semibold text-[#171717] lg:text-[16px]">{title}</span>
        <span className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#8A8A86]">{message}</span>

        <Container className="mt-6 flex w-full items-center gap-3">
          <button
            type="button"
            onClick={closeConfirm}
            disabled={isLoading}
            className="h-[40px] flex-1 cursor-pointer rounded-full border border-[#E4E4E4] bg-white font-sans text-[13px] font-medium text-[#171717] transition-colors duration-200 hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex h-[40px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#E5484D] font-sans text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#D33D42] disabled:cursor-wait disabled:opacity-70"
          >
            {isLoading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {confirmLabel}
          </button>
        </Container>
      </Container>
    </Container>
  );
}
