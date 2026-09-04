import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { LandingSectionCardProps } from "../types";

export default function LandingSectionCard({ section, enabled, onToggle }: LandingSectionCardProps) {
  return (
    <Container className="flex items-center gap-4 rounded-[14px] border border-[#E4E4E4] bg-white p-4">
      <Container className="relative flex h-[64px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)]">
        <Text className="font-sans text-[20px] font-bold text-[#F7F7F7]">
          {section.label.charAt(0)}
        </Text>
      </Container>

      <Container className="flex flex-1 flex-col gap-1">
        <Text className="font-sans text-[15px] font-semibold text-[#171717]">{section.label}</Text>
        <Link
          href={section.href}
          className="flex w-fit items-center gap-1 font-sans text-[12px] text-[#8A8A86] transition-colors duration-200 hover:text-[#171717]"
        >
          Edit content
          <ArrowUpRightIcon width={10} height={10} />
        </Link>
      </Container>

      <Switch
        id={`section-toggle-${section.key}`}
        checked={enabled}
        onChange={() => onToggle(section.key)}
      />
    </Container>
  );
}
