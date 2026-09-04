import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import Link from "@/designUI/elements/Link/Link";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import { useNotFound } from "./function";

export default function NotFound() {
  const { data } = useNotFound();

  return (
    <Container variant="section" className="relative mt-[10px] mb-[10px] w-full bg-white lg:mt-[90px]">
      <Container className="pointer-events-none absolute inset-0 z-0 mx-auto w-full max-w-[1240px]">
        <Container className="absolute inset-y-0 left-[21px] w-px bg-[#2424231F] md:left-[50px] lg:left-[10px]" />
        <Container className="absolute inset-y-0 right-[21px] w-px bg-[#2424231F] md:right-[50px] lg:right-[10px]" />
      </Container>

      <Container className="relative z-10 container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-[20px] py-[60px] text-center md:px-[50px] lg:px-[20px]">
        <Text
          className={clsx(
            sora.className,
            "font-bold tracking-[0px] text-transparent",
            "bg-[linear-gradient(170.92deg,#005CD6_11.6%,#64A6FF_96.6%,#00D9FF_279.47%)] bg-clip-text",
            "text-[72px] leading-[80px]",
            "md:text-[110px] md:leading-[120px]",
            "lg:text-[140px] lg:leading-[150px]",
          )}
        >
          {data.code}
        </Text>

        <Text
          variant="h1"
          className={clsx(
            sora.className,
            "mt-[8px] font-bold tracking-[0px] text-[#242423] capitalize",
            "text-[20px] leading-[28px]",
            "md:text-[28px] md:leading-[36px]",
            "lg:text-[32px] lg:leading-[40px]",
          )}
        >
          {data.title}
        </Text>

        <Text
          className={clsx(
            sora.className,
            "mt-[10px] max-w-[420px] font-medium tracking-[0px] text-[#616161]",
            "text-[13px] leading-[20px]",
            "md:text-[15px] md:leading-[24px]",
            "lg:mt-[14px] lg:text-[16px] lg:leading-[26px]",
          )}
        >
          {data.description}
        </Text>

        <Link href={data.ctaLink} className="mt-[28px] md:mt-[36px] lg:mt-[40px]">
          <Button as="span" icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}>
            {data.ctaLabel}
          </Button>
        </Link>
      </Container>
    </Container>
  );
}
