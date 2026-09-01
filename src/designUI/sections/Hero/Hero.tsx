"use client";

import clsx from "clsx";
import { useHero } from "./function";
import { sora } from "@/designUI/utilities/fonts/fonts";

import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import SocialIcon from "@/designUI/components/SocialIcon/SocialIcon";

import HeroGridLines from "./comp/HeroGridLines";
import HeroContentCard, { heroCardTextClassName } from "./comp/HeroContentCard";

import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import HeroBannerSkeleton from "@/designUI/utilities/loader/landing/heroBannerSkeleton";

export default function Hero() {
  const { data, isLoading } = useHero();

  if (isLoading) {
    return <HeroBannerSkeleton />;
  }

  return (
    <Container id="hero" className="p-[5px] md:p-[10px]">
      <Container className="relative overflow-hidden rounded-xl">
        <Image
          src={data.backgroundUrlMobile}
          alt=""
          fill
          priority
          className="block object-cover md:hidden"
        />
        <Image
          src={data.backgroundUrlTablet}
          alt=""
          fill
          priority
          className="hidden object-cover md:block lg:hidden"
        />
        <Image
          src={data.backgroundUrl}
          alt=""
          fill
          priority
          className="hidden object-cover lg:block"
        />
        <HeroGridLines />

        <Container className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-0 px-5 pt-[30px] pb-[30px] text-left text-white md:px-[30px] md:pt-[100px] md:pb-[30px] lg:px-[10px] lg:pt-[100px] lg:pb-[80px]">
          <Container className="relative z-20">
            <Text
              variant="h1"
              className={clsx(
                sora.className,
                "relative -bottom-[25px] md:-bottom-[35px] lg:-bottom-[35px]",
                "bg-gradient-to-b from-[#8FBFFF] to-[#64A6FF] bg-clip-text text-transparent",
                "text-center text-[37px] md:text-[80px] lg:text-[94px] leading-[56px] md:leading-[92px] lg:leading-[108px] font-bold tracking-[0px] capitalize",
              )}
            >
              <Container
                variant="span"
                data-aos="fade-up"
                className="relative -bottom-[15px] block"
              >
                {data.title}
              </Container>
              {data.titleExtend && (
                <Container
                  variant="span"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="block"
                >
                  {data.titleExtend}
                </Container>
              )}
            </Text>
          </Container>

          <Container className="flex flex-col items-center gap-0 md:grid md:grid-cols-2 md:justify-items-center lg:grid lg:w-full lg:grid-cols-[minmax(0,365fr)_minmax(0,510fr)_minmax(0,365fr)] lg:items-end">
            <HeroContentCard data-aos="fade-right" className="order-2 md:order-2 lg:order-none">
              <Text className={heroCardTextClassName}>{data.greeting}</Text>
              <Button
                icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}
              >
                {data.ctaLabel}
              </Button>
            </HeroContentCard>

            <Container
              data-aos="zoom-in"
              className="relative z-20 order-1 h-[255px] w-[249px] opacity-100 md:order-1 md:col-span-2 md:h-[400px] md:w-[390px] lg:order-none lg:col-span-1 lg:h-[499px] lg:w-full lg:max-w-[487px] lg:justify-self-center"
            >
              <Image
                src={data.photoUrl}
                alt={[data.title, data.titleExtend].filter(Boolean).join(" ")}
                fill
                className="object-contain object-bottom"
              />
            </Container>

            <HeroContentCard data-aos="fade-left" className="order-3 md:order-3 lg:order-none">
              <Text className={heroCardTextClassName}>{data.description}</Text>
              <Container className="flex h-[38px] items-center gap-2 md:h-[52px]">
                {data.socialLinks.map((link) => (
                  <SocialIcon key={link.icon.name} icon={link.icon} url={link.url} />
                ))}
              </Container>
            </HeroContentCard>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
