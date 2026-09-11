"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { LandingSectionCardProps } from "../types";

export default function LandingSectionCard({ section, enabled, onToggle }: LandingSectionCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = section.image && !imageFailed;

  return (
    <Container className="flex flex-col overflow-hidden rounded-[14px] border border-[#E4E4E4] bg-white">
      <Container className="relative flex h-[160px] w-full items-center justify-center bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)]">
        {showImage && (
          <NextImage
            src={section.image as string}
            alt={section.label}
            fill
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        {!showImage && (
          <Text className="font-sans text-[24px] font-bold text-[#F7F7F7]">
            {section.label.charAt(0)}
          </Text>
        )}
      </Container>

      <Container className="flex items-center justify-between gap-4 p-4">
        <Container className="flex flex-col gap-1">
          <Text className="font-sans text-[15px] font-semibold text-[#171717]">{section.label}</Text>
          <Link
            href={section.href}
            className="flex w-fit items-center gap-1 font-sans text-[12px] text-[#8A8A86] transition-colors duration-200 hover:text-[#171717]"
          >
            Edit content
            <ArrowUpRightIcon width={10} height={10} />
          </Link>
        </Container>

        {section.toggleable === false ? (
          <span
            title={section.badgeTooltip}
            className="cursor-default rounded-full border border-[#E4E4E4] bg-[#F5F5F5] px-2.5 py-1 font-sans text-[10px] font-semibold tracking-wide text-[#8A8A86] uppercase"
          >
            {section.badgeLabel ?? "Auto"}
          </span>
        ) : (
          <Switch
            id={`section-toggle-${section.key}`}
            checked={enabled}
            onChange={() => onToggle(section.key)}
          />
        )}
      </Container>
    </Container>
  );
}
