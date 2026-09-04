"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import NextImage from "next/image";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import type { FileInputProps } from "./types";

export default function FileInput({
  label,
  error,
  value,
  onChange,
  accept = "image/*",
  containerClassName = "",
}: FileInputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof value === "string" ? value : null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      onChange(null);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">{label}</span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => event.key === "Enter" && inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files?.[0] ?? null);
        }}
        className={clsx(
          "relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed bg-[#FAFAFA] text-center transition-colors duration-200",
          previewUrl ? "p-3" : "gap-3 px-6 py-10",
          error
            ? "border-[#E5484D]"
            : isDragging
              ? "border-[#242423] bg-white"
              : "border-[#E4E4E4] hover:border-[#242423]",
        )}
      >
        {previewUrl ? (
          <div className="relative h-[200px] w-full overflow-hidden rounded-[10px] bg-white">
            <NextImage src={previewUrl} alt={label} fill className="object-contain" unoptimized />
          </div>
        ) : (
          <>
            <Icon name="FaCloudUploadAlt" width={32} height={32} color="#8A8A86" />
            <span className="font-sans text-[14px] font-medium text-[#171717]">
              Choose a file or drag &amp; drop it here
            </span>
            <span className="font-sans text-[12px] text-[#8A8A86]">
              JPEG or PNG, up to 5MB
            </span>
            <span className="mt-1 rounded-full border border-[#E4E4E4] bg-white px-4 py-2 font-sans text-[13px] font-medium text-[#171717] transition-colors duration-200 hover:border-[#242423]">
              Browse File
            </span>
          </>
        )}

        {previewUrl && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleFiles(null);
            }}
            className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#171717]/70 text-white"
            aria-label="Remove image"
          >
            <Icon name="FaTimes" width={12} height={12} />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files?.[0] ?? null)}
      />

      <FieldError message={error} />
    </div>
  );
}
