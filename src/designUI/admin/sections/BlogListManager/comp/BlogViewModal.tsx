"use client";

import { useEffect } from "react";
import NextImage from "next/image";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import type { BlogViewModalProps } from "../types";

export default function BlogViewModal({ post, onClose }: BlogViewModalProps) {
  useEffect(() => {
    if (!post) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

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
          <Container className="flex flex-col gap-1">
            <Text className="font-sans text-[18px] font-semibold text-[#171717]">{post.title}</Text>
            <Text className="font-sans text-[12px] text-[#8A8A86]">
              {post.category} · {post.publishedDate}
            </Text>
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

        <Container className="relative mb-4 h-[220px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#F7F7F7]">
          <NextImage src={post.image} alt={post.title} fill className="object-cover" />
        </Container>

        {post.tags && post.tags.length > 0 && (
          <Container className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F7F7F7] px-3 py-1 font-sans text-[11px] text-[#171717]"
              >
                {tag}
              </span>
            ))}
          </Container>
        )}

        {post.content ? (
          <div
            className="prose prose-sm max-w-none font-sans text-[#171717]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <Text className="font-sans text-[13px] text-[#8A8A86]">{post.excerpt}</Text>
        )}
      </Container>
    </Container>
  );
}
