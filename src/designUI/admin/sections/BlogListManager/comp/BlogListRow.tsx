import Link from "next/link";
import NextImage from "next/image";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import type { BlogListRowProps } from "../types";

const actionButtonClassName =
  "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] transition-colors duration-150";

export default function BlogListRow({ post, checked, onToggle, onView, onDelete }: BlogListRowProps) {
  return (
    <Container className="flex items-center gap-3 rounded-[12px] border border-[#E4E4E4] bg-white p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={`Select ${post.title}`}
        className="h-4 w-4 shrink-0 cursor-pointer accent-[#242423]"
      />

      <Container className="relative h-[52px] w-[72px] shrink-0 overflow-hidden rounded-[8px] bg-[#F7F7F7]">
        <NextImage src={post.image} alt={post.title} fill className="object-cover" />
      </Container>

      <Container className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Text className="truncate font-sans text-[13px] font-semibold text-[#171717] lg:text-[14px]">
          {post.title}
        </Text>
        <Text className="font-sans text-[11px] text-[#8A8A86] lg:text-[12px]">
          {post.category} · {post.publishedDate}
        </Text>
      </Container>

      <Container className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onView}
          aria-label="View"
          className={`${actionButtonClassName} bg-[#F7F7F7] text-[#171717] hover:bg-[#E4E4E4]`}
        >
          <Icon name="FaEye" width={13} height={13} />
        </button>
        <Link
          href={`/admin/blog/edit/${encodeURIComponent(post.href)}`}
          aria-label="Edit"
          className={`${actionButtonClassName} bg-[#F7F7F7] text-[#171717] hover:bg-[#E4E4E4]`}
        >
          <Icon name="FaPen" width={12} height={12} />
        </Link>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete"
          className={`${actionButtonClassName} bg-[#FDEBEB] text-[#E5484D] hover:bg-[#FBD8D8]`}
        >
          <Icon name="FaTrashAlt" width={13} height={13} />
        </button>
      </Container>
    </Container>
  );
}
