import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { ProcessPillProps } from "../types";

export default function ProcessPill({ className = "", image, icon, children }: ProcessPillProps) {
  return (
    <Container
      className={clsx(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full whitespace-nowrap",
        "gap-[5px] md:gap-[10px]",
        "h-[25px] px-[1.6vw] py-[4px]",
        "md:h-[58px] md:px-[min(2vw,20px)] md:py-[16px]",
        "lg:h-[118px] lg:px-[80px] lg:py-[45px]",
        "min-[1024px]:max-[1210px]:h-[100px]! min-[1024px]:max-[1210px]:px-[44px]! min-[1024px]:max-[1210px]:py-[40px]!",
        className,
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="scale-110 object-cover blur-md"
          />
          <Container className="absolute inset-0 bg-black/35" />
        </>
      )}
      <Text
        className={clsx(
          sora.className,
          "relative z-10 text-center align-middle font-bold tracking-[0px] capitalize",
          "text-[min(1.9vw,8.5px)] leading-[15px]",
          "md:text-[min(1.7vw,16px)] md:leading-[26px]",
          "lg:text-[18px] lg:leading-[28px]",
        )}
      >
        {children}
      </Text>
      {icon && <Container className="relative z-10">{icon}</Container>}
    </Container>
  );
}
