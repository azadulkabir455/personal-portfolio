import NextImage from "next/image";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import type { StorageFileCardProps } from "../types";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

function isImageFile(name: string) {
  return IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
}

export default function StorageFileCard({ file, onView, onDelete, isDeleting }: StorageFileCardProps) {
  return (
    <Container className="group relative aspect-square overflow-hidden rounded-[12px] border border-[#E4E4E4] bg-[#FAFAFA]">
      <button
        type="button"
        onClick={onView}
        className="flex h-full w-full cursor-pointer items-center justify-center"
      >
        {isImageFile(file.name) ? (
          <NextImage src={file.url} alt={file.name} fill className="object-cover" unoptimized />
        ) : (
          <Container className="flex flex-col items-center gap-2 px-3 text-center">
            <Icon name="FaFileAlt" width={28} height={28} color="#8A8A86" />
            <Text className="line-clamp-2 font-sans text-[11px] text-[#8A8A86]">{file.name}</Text>
          </Container>
        )}
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
        disabled={isDeleting}
        aria-label="Delete file"
        className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#171717]/70 text-white transition-opacity duration-200 group-hover:opacity-100 disabled:cursor-wait md:opacity-0"
      >
        {isDeleting ? (
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <Icon name="FaTimes" width={12} height={12} />
        )}
      </button>
    </Container>
  );
}
