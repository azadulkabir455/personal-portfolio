import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { LegalContentProps } from "./types";

export default function LegalContent({ title, updatedAt, content }: LegalContentProps) {
  return (
    <Container variant="section" className="relative w-full bg-white">
      <Container className="pointer-events-none absolute inset-0 z-0 mx-auto w-full max-w-[1240px]">
        <Container className="absolute inset-y-0 left-[21px] w-px bg-[#2424231F] md:left-[50px] lg:left-[10px]" />
        <Container className="absolute inset-y-0 right-[21px] w-px bg-[#2424231F] md:right-[50px] lg:right-[10px]" />
      </Container>

      <Container className="relative z-10 container mx-auto px-[31px] pt-[24px] pb-[80px] md:px-[60px] md:pt-[40px] lg:px-[20px] lg:pt-[200px]">
        <Text
          variant="h1"
          className={clsx(
            sora.className,
            "mb-[6px] font-bold tracking-[0px] text-[#242423] capitalize",
            "text-[28px] leading-[36px]",
            "md:text-[36px] md:leading-[46px]",
            "lg:text-[46px] lg:leading-[56px]",
          )}
        >
          {title}
        </Text>

        <Text
          className={clsx(
            sora.className,
            "font-medium tracking-[0px] text-[#616161]",
            "mb-[20px] text-[14px] leading-[22px]",
            "md:mb-[28px] md:text-[16px] md:leading-[24px]",
            "lg:mb-[40px] lg:text-[18px] lg:leading-[24px]",
          )}
        >
          Last updated: {updatedAt}
        </Text>

        <Container
          className={clsx(
            sora.className,
            "prose prose-neutral max-w-none",
            "prose-headings:font-bold prose-headings:tracking-[0px] prose-headings:text-[#242423]",
            "prose-h2:text-[20px] prose-h2:leading-[28px] md:prose-h2:text-[24px] md:prose-h2:leading-[32px]",
            "prose-h3:text-[18px] prose-h3:leading-[26px] md:prose-h3:text-[22px] md:prose-h3:leading-[30px]",
            "prose-p:font-sans prose-p:font-light prose-p:text-[#616161]",
            "prose-p:text-[14px] prose-p:leading-[24px] md:prose-p:text-[16px] md:prose-p:leading-[28px]",
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </Container>
  );
}
