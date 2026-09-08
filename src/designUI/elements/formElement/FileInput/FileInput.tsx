"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import NextImage from "next/image";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import { uploadFile } from "@/lib/uploadClient";
import { getUploadValidationError } from "@/lib/uploadValidation";
import type { FileInputProps } from "./types";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

function isImageFile(url: string | null) {
  if (!url) return false;
  return IMAGE_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));
}

function getFileName(url: string | null) {
  if (!url) return "";
  return url.split("/").pop() ?? url;
}

export default function FileInput({
  label,
  error,
  value,
  onChange,
  folder,
  accept = "image/*",
  hint = "PNG, JPG, WEBP or PDF, up to 3MB",
  containerClassName = "",
}: FileInputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentValue = value ?? null;

  const handleFiles = async (file: File | null) => {
    if (!file) {
      onChange(null);
      return;
    }

    const validationError = getUploadValidationError(file.name, file.size);
    if (validationError) {
      setUploadError(validationError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const showImagePreview = Boolean(currentValue) && isImageFile(currentValue);
  const showFilePreview = Boolean(currentValue) && !showImagePreview;

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <span className="font-sans text-[11px] font-semibold text-[#8A8A86] lg:text-[12px]">{label}</span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => !isUploading && inputRef.current?.click()}
        onKeyDown={(event) => event.key === "Enter" && !isUploading && inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          if (!isUploading) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!isUploading) void handleFiles(event.dataTransfer.files?.[0] ?? null);
        }}
        className={clsx(
          "relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed bg-[#FAFAFA] text-center transition-colors duration-200",
          isUploading && "cursor-wait",
          showImagePreview && "p-2 lg:p-3",
          showFilePreview && "p-3",
          !currentValue && !isUploading && "gap-2 px-4 py-6 lg:gap-3 lg:px-6 lg:py-10",
          isUploading && "gap-2 px-4 py-6 lg:gap-3 lg:px-6 lg:py-10",
          error || uploadError
            ? "border-[#E5484D]"
            : isDragging
              ? "border-[#242423] bg-white"
              : "border-[#E4E4E4] hover:border-[#242423]",
        )}
      >
        {isUploading ? (
          <>
            <span className="h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-[#E4E4E4] border-t-[#171717]" />
            <span className="font-sans text-[13px] font-medium text-[#171717] lg:text-[14px]">Uploading...</span>
          </>
        ) : showImagePreview ? (
          <div className="relative h-[160px] w-full overflow-hidden rounded-[10px] bg-white lg:h-[200px]">
            <NextImage src={currentValue as string} alt={label} fill className="object-contain" unoptimized />
          </div>
        ) : showFilePreview ? (
          <div className="flex w-full items-center gap-3 rounded-[10px] bg-white p-3">
            <Icon name="FaFileAlt" width={28} height={28} color="#8A8A86" />
            <span className="min-w-0 flex-1 truncate text-left font-sans text-[13px] font-medium text-[#171717] lg:text-[14px]">
              {getFileName(currentValue)}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void handleFiles(null);
              }}
              className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#171717]/70 text-white"
              aria-label="Remove file"
            >
              <Icon name="FaTimes" width={12} height={12} />
            </button>
          </div>
        ) : (
          <>
            <Icon name="FaCloudUploadAlt" width={26} height={26} color="#8A8A86" />
            <span className="font-sans text-[13px] font-medium text-[#171717] lg:text-[14px]">
              Choose a file or drag &amp; drop it here
            </span>
            <span className="font-sans text-[11px] text-[#8A8A86] lg:text-[12px]">{hint}</span>
            <span className="mt-1 rounded-full border border-[#E4E4E4] bg-white px-3 py-1.5 font-sans text-[12px] font-medium text-[#171717] transition-colors duration-200 hover:border-[#242423] lg:px-4 lg:py-2 lg:text-[13px]">
              Browse File
            </span>
          </>
        )}

        {showImagePreview && !isUploading && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              void handleFiles(null);
            }}
            className="absolute top-4 right-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#171717]/70 text-white"
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
        onChange={(event) => void handleFiles(event.target.files?.[0] ?? null)}
      />

      <FieldError message={uploadError ?? error} />
    </div>
  );
}
