import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import JourneyStepDivider from "./JourneyStepDivider";
import type { JourneyStepItemProps } from "../types";

export default function JourneyStepItem({ step, title, description }: JourneyStepItemProps) {
  return (
    <Container className="relative">
      <Container className="flex flex-col gap-[12px] lg:flex-row lg:items-start lg:gap-[42px]">
        <Container className="flex items-start gap-[16px] lg:w-[500px] lg:shrink-0">
          <Text
            className={clsx(
              sora.className,
              "mt-[5px] shrink-0 text-left align-middle font-semibold tracking-[0px]",
              "text-[10px] leading-[18px]",
            )}
          >
            <span className="text-[#0D75FF]">[</span>
            <span className="text-[#242423]">{step}</span>
            <span className="text-[#0D75FF]">]</span>
          </Text>

          <Text
            variant="h4"
            className={clsx(
              sora.className,
              "align-middle font-medium tracking-[0px] text-[#242423] lg:whitespace-nowrap",
              "text-[16px] leading-[24px]",
              "md:text-[18px] md:leading-[30px]",
            )}
          >
            {title}
          </Text>
        </Container>

        <Text
          className={clsx(
            "font-sans align-middle font-light tracking-[0px] text-[#616161] lg:flex-1 lg:max-w-[600px]",
            "text-[12px] leading-[20px]",
            "md:text-[14px] md:leading-[24px]",
            "lg:text-[16px] lg:leading-[26px]",
          )}
        >
          {description}
        </Text>
      </Container>

      <Container className="pt-[16px] md:pt-[24px]">
        <JourneyStepDivider />
      </Container>
    </Container>
  );
}
