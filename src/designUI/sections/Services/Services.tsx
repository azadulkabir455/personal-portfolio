"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { useServices } from "./function";
import ServicesGridLines from "./comp/ServicesGridLines";
import ServicesItem from "./comp/ServicesItem";

export default function Services() {
  const { data } = useServices();

  return (
    <Container variant="section" id="services" className="w-full">
      <Container className="relative mx-[5px] rounded-t-[12px] bg-white md:mx-[10px]">
        <Container
          className={clsx(
            "container relative",
            "px-4 py-[20px]",
            "md:px-[40px] md:py-[40px]",
            "lg:px-0 lg:py-[80px]",
          )}
        >
          <ServicesGridLines />

          <Container className="relative flex flex-col gap-[16px] md:flex-row md:items-start md:justify-between md:gap-0">
            <Text
              className={clsx(
                sora.className,
                "inline-block w-fit shrink-0 text-left align-middle font-semibold tracking-[1.25px] text-[#388EFF]",
                "rounded-[100px] bg-[#F7F7F7] px-[16px] py-[5px]",
                "text-[10px] leading-[15px]",
                "md:text-[12px] md:leading-[18px]",
              )}
            >
              {data.intro.badge}
            </Text>

            <Container className="flex flex-col items-end gap-[12px] md:gap-[16px] lg:gap-[24px]">
              {data.items.map((item) => (
                <ServicesItem key={item.number} {...item} />
              ))}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
