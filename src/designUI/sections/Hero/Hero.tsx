"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useHero } from "./function";
import { sora } from "@/designUI/utilities/fonts/fonts";

import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Link from "@/designUI/elements/Link/Link";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import SocialIcon from "@/designUI/components/SocialIcon/SocialIcon";

import HeroGridLines from "./comp/HeroGridLines";
import HeroContentCard, { heroCardTextClassName } from "./comp/HeroContentCard";

import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { HeroProps } from "./types";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const titleVariants = {
  hidden: { opacity: 0, y: -70, rotateX: -20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.1, delay: 0, ease: easeOutExpo },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 90, rotateX: 18, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.2, delay: 0.1, ease: easeOutExpo },
  },
};

const leftCardVariants = {
  hidden: { opacity: 0, x: -90, rotateY: -22, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.2, ease: easeOutExpo },
  },
};

const rightCardVariants = {
  hidden: { opacity: 0, x: 90, rotateY: 22, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.2, ease: easeOutExpo },
  },
};

const leftCardVariantsMobile = {
  hidden: { opacity: 0, y: 70, rotateX: 15, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.25, ease: easeOutExpo },
  },
};

const rightCardVariantsMobile = {
  hidden: { opacity: 0, y: 70, rotateX: 15, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.4, ease: easeOutExpo },
  },
};

export default function Hero({ isLoading }: HeroProps) {
  const { data } = useHero();
  const animate = isLoading ? "hidden" : "visible";

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

        <Container
          className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center gap-0 px-4 pt-[30px] pb-[30px] text-left text-white md:px-[40px] md:pt-[100px] md:pb-[30px] lg:px-[10px] lg:pt-[100px] lg:pb-[80px]"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative z-20"
            initial="hidden"
            animate={animate}
            variants={titleVariants}
          >
            <Text
              variant="h1"
              className={clsx(
                sora.className,
                "relative -bottom-[25px] md:-bottom-[35px] lg:-bottom-[35px]",
                "bg-gradient-to-b from-[#F2F8FF] to-[#93C1FF] bg-clip-text text-transparent",
                "text-center text-[37px] md:text-[80px] lg:text-[94px] leading-[30px] md:leading-[70px] lg:leading-[108px] font-bold tracking-[0px] capitalize",
              )}
            >
              <Container variant="span" className="relative bottom-0 block md:-bottom-[5px] lg:-bottom-[15px]">
                {data.title}
              </Container>
              {data.titleExtend && (
                <Container variant="span" className="mt-0 block">
                  {data.titleExtend}
                </Container>
              )}
            </Text>
          </motion.div>

          <Container className="flex flex-col items-center gap-0 md:grid md:grid-cols-2 md:justify-items-center lg:grid lg:w-full lg:grid-cols-[minmax(0,365fr)_minmax(0,510fr)_minmax(0,365fr)] lg:items-end">
            <motion.div
              className="order-2 md:hidden"
              initial="hidden"
              animate={animate}
              variants={leftCardVariantsMobile}
            >
              <HeroContentCard>
                <Text className={heroCardTextClassName}>{data.greeting}</Text>
                <Link href={data.ctaLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    as="span"
                    icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}
                  >
                    {data.ctaLabel}
                  </Button>
                </Link>
              </HeroContentCard>
            </motion.div>

            <motion.div
              className="hidden md:order-2 md:block lg:order-none"
              initial="hidden"
              animate={animate}
              variants={leftCardVariants}
            >
              <HeroContentCard>
                <Text className={heroCardTextClassName}>{data.greeting}</Text>
                <Link href={data.ctaLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    as="span"
                    icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}
                  >
                    {data.ctaLabel}
                  </Button>
                </Link>
              </HeroContentCard>
            </motion.div>

            <motion.div
              className="relative z-20 order-1 h-[255px] w-[249px] overflow-hidden opacity-100 md:order-1 md:col-span-2 md:h-[400px] md:w-[390px] lg:order-none lg:col-span-1 lg:h-[499px] lg:w-full lg:max-w-[487px] lg:justify-self-center"
              initial="hidden"
              animate={animate}
              variants={imageVariants}
            >
              <Image
                src={data.photoUrl}
                alt={[data.title, data.titleExtend].filter(Boolean).join(" ")}
                fill
                className="object-contain object-bottom"
                style={{
                  maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
                }}
              />
            </motion.div>

            <motion.div
              className="order-3 md:hidden"
              initial="hidden"
              animate={animate}
              variants={rightCardVariantsMobile}
            >
              <HeroContentCard>
                <Text className={heroCardTextClassName}>{data.description}</Text>
                <Container className="flex h-[38px] items-center gap-2 md:h-[52px]">
                  {data.socialLinks.map((link) => (
                    <SocialIcon key={link.icon.name} icon={link.icon} url={link.url} />
                  ))}
                </Container>
              </HeroContentCard>
            </motion.div>

            <motion.div
              className="hidden md:order-3 md:block lg:order-none"
              initial="hidden"
              animate={animate}
              variants={rightCardVariants}
            >
              <HeroContentCard>
                <Text className={heroCardTextClassName}>{data.description}</Text>
                <Container className="flex h-[38px] items-center gap-2 md:h-[52px]">
                  {data.socialLinks.map((link) => (
                    <SocialIcon key={link.icon.name} icon={link.icon} url={link.url} />
                  ))}
                </Container>
              </HeroContentCard>
            </motion.div>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
