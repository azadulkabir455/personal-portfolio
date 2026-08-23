import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { ServicesItemProps } from "../types";

export default function ServicesItem({ number, title }: ServicesItemProps) {
  return (
    <Container className="flex items-start justify-end gap-[8px]">
      <Text
        className={clsx(
          "mt-[2px] shrink-0 text-right font-sans font-semibold tracking-[0px] text-[#242423] md:mt-[4px] lg:mt-[8px]",
          "text-[12px] leading-[18px]",
          "md:text-[20px] md:leading-[32px]",
        )}
      >
        <span className="text-[#388EFF]">[</span>
        {number}
        <span className="text-[#388EFF]">]</span>
      </Text>
      <Text
        className={clsx(
          sora.className,
          "text-right font-medium tracking-[0px] text-[#242423] capitalize",
          "text-[16px] leading-[24px]",
          "md:text-[36px] md:leading-[48px]",
          "lg:text-[48px] lg:leading-[64px]",
        )}
      >
        {title}
      </Text>
    </Container>
  );
}
