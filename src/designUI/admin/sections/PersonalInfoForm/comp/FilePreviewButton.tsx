"use client";

import { useEffect, useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";

function getFileName(file: File | string | null) {
  if (!file) return "";
  if (typeof file === "string") return file.split("/").pop() ?? file;
  return file.name;
}

export default function FilePreviewButton({
  file,
  label = "View",
  kind = "pdf",
}: {
  file: File | string | null;
  label?: string;
  kind?: "pdf" | "image";
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(typeof file === "string" ? file : null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof file === "string") {
      setPreviewUrl(file);
      return;
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  if (!previewUrl) return null;

  const fileName = getFileName(file);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-[32px] shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-[#388EFF]/30 bg-[#EAF3FF] px-3 font-sans text-[11px] font-semibold text-[#388EFF] transition-colors duration-200 hover:bg-[#DCEBFF] lg:h-[36px] lg:px-4 lg:text-[12px]"
      >
        <Icon name="FaEye" width={13} height={13} color="#388EFF" />
        {label}
      </button>

      {isOpen && (
        <Container
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/60 p-4"
          onClick={() => setIsOpen(false)}
        >
          <Container
            className="flex h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[16px] bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <Container className="flex items-center justify-between border-b border-[#E4E4E4] px-4 py-3">
              <span className="truncate font-sans text-[13px] font-medium text-[#171717]">{fileName}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F7F7F7] text-[#171717] hover:bg-[#E4E4E4]"
              >
                <Icon name="FaTimes" width={12} height={12} />
              </button>
            </Container>
            {kind === "image" ? (
              <Container className="flex h-full w-full flex-1 items-center justify-center bg-[#FAFAFA] p-6">
                <img src={previewUrl} alt={fileName} className="max-h-full max-w-full object-contain" />
              </Container>
            ) : (
              <iframe src={`${previewUrl}#navpanes=0`} title={fileName} className="h-full w-full flex-1" />
            )}
          </Container>
        </Container>
      )}
    </>
  );
}
