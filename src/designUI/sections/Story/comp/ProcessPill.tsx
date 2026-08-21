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
        "relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "gap-[5px] md:gap-[10px]",
        "h-[23px] px-[8px] py-[4px]",
        "md:h-[58px] md:px-[20px] md:py-[16px]",
        "lg:h-[118px] lg:px-[80px] lg:py-[45px]",
        "min-[1024px]:max-[1150px]:h-[100px]! min-[1024px]:max-[1150px]:px-[60px]! min-[1024px]:max-[1150px]:py-[40px]!",
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
          "text-[8px] leading-[15px]",
          "md:text-[16px] md:leading-[26px]",
          "lg:text-[18px] lg:leading-[28px]",
        )}
      >
        {children}
      </Text>
      {icon && <Container className="relative z-10">{icon}</Container>}
    </Container>
  );
}
