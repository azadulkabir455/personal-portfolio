"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import NextImage from "next/image";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import type { FileInputProps } from "./types";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

function isImageFile(file: File | string | null) {
  if (!file) return false;
  if (typeof file === "string") return IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext));
  return file.type.startsWith("image/");
}

function getFileName(file: File | string | null) {
  if (!file) return "";
  if (typeof file === "string") return file.split("/").pop() ?? file;
  return file.name;
}

export default function FileInput({
  label,
  error,
  value,
  onChange,
  accept = "image/*",
  hint = "JPEG or PNG, up to 5MB",
  containerClassName = "",
}: FileInputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | string | null>(value ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof value === "string" ? value : null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      onChange(null);
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onChange(file);
  };

  const showImagePreview = Boolean(previewUrl) && isImageFile(selectedFile);
  const showFilePreview = Boolean(previewUrl) && !showImagePreview;

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <span className="font-sans text-[11px] font-semibold text-[#8A8A86] lg:text-[12px]">{label}</span>

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
          showImagePreview && "p-2 lg:p-3",
          showFilePreview && "p-3",
          !previewUrl && "gap-2 px-4 py-6 lg:gap-3 lg:px-6 lg:py-10",
          error
            ? "border-[#E5484D]"
            : isDragging
              ? "border-[#242423] bg-white"
              : "border-[#E4E4E4] hover:border-[#242423]",
        )}
      >
        {showImagePreview ? (
          <div className="relative h-[160px] w-full overflow-hidden rounded-[10px] bg-white lg:h-[200px]">
            <NextImage src={previewUrl as string} alt={label} fill className="object-contain" unoptimized />
          </div>
        ) : showFilePreview ? (
          <div className="flex w-full items-center gap-3 rounded-[10px] bg-white p-3">
            <Icon name="FaFileAlt" width={28} height={28} color="#8A8A86" />
            <span className="min-w-0 flex-1 truncate text-left font-sans text-[13px] font-medium text-[#171717] lg:text-[14px]">
              {getFileName(selectedFile)}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleFiles(null);
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

        {showImagePreview && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleFiles(null);
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
        onChange={(event) => handleFiles(event.target.files?.[0] ?? null)}
      />

      <FieldError message={error} />
    </div>
  );
}
