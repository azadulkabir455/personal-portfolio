import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import type { StatItemProps } from "../types";

export default function StatItem({ value, label, description }: StatItemProps) {
  return (
    <Container className="flex flex-col items-start gap-[8px] lg:flex-row lg:justify-between lg:gap-0">
      <Text
        variant="h3"
        className="shrink-0 font-sans text-[24px] font-bold text-[#388EFF] md:text-[32px] lg:text-[42px]"
      >
        {value}
      </Text>
      <Container className="flex flex-col items-start gap-[8px] lg:flex-row lg:gap-[20px]">
        <Container className="mt-[2px] flex items-start justify-start gap-1">
          <Text className="font-sans text-[8px] font-bold text-[#388EFF] md:text-[10px]">[</Text>
          <Text className="font-sans text-[8px] font-bold text-[#242423] md:text-[10px]">{label}</Text>
          <Text className="font-sans text-[8px] font-bold text-[#388EFF] md:text-[10px]">]</Text>
        </Container>
        <Text className="font-sans max-w-[280px] text-[12px] text-[#616161] md:text-[14px] lg:text-[16px]">
          {description}
        </Text>
      </Container>
    </Container>
  );
}
