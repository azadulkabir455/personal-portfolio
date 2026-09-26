import clsx from "clsx";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import Link from "@/designUI/elements/Link/Link";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { CaseStudySlideProps } from "../types";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: easeOutExpo } },
  exit: { x: -40, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function CaseStudySlide({
  slideIndex,
  publishedLabel,
  publishedDate,
  title,
  description,
  ctaLabel,
  ctaLink,
  images,
  children,
}: CaseStudySlideProps) {
  return (
    <Container className="relative flex w-full flex-col overflow-hidden">
      <Image src={images.mobile} alt={title} fill priority className="block object-cover object-top md:hidden" />
      <Image src={images.tab} alt={title} fill priority className="hidden object-cover object-top md:block lg:hidden" />
      <Image src={images.desktop} alt={title} fill priority className="hidden object-cover object-top lg:block" />

      <Container data-reveal className="container relative z-30 mx-auto flex w-full flex-col px-[16px] pt-[20px] pb-[30px] md:px-[40px] md:pt-[60px] md:pb-[40px] lg:px-[10px] lg:pt-[70px] lg:pb-[30px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={slideIndex} variants={groupVariants} initial="hidden" animate="visible" exit="exit">
            <Container className="flex max-w-[calc(80%+20px)] flex-col items-start md:max-w-[360px] lg:max-w-[calc(38%+20px)]">
              <motion.div variants={itemVariants} className="flex flex-wrap items-baseline gap-x-[6px]">
                <Text
                  className={clsx(
                    "font-sans font-bold text-[#242423] capitalize",
                    "text-[12px] leading-[18px] tracking-[0.13px]",
                    "md:text-[14px] md:leading-[22px] md:tracking-[0.25px]",
                  )}
                >
                  {publishedLabel}
                </Text>
                <Text
                  className={clsx(
                    "font-sans font-medium text-[#616161] capitalize",
                    "text-[12px] leading-[18px] tracking-[0.13px]",
                    "md:text-[14px] md:leading-[18px] md:tracking-[0.25px]",
                  )}
                >
                  {publishedDate}
                </Text>
              </motion.div>

              <Container className="-ml-[100px] h-[205px] overflow-hidden pl-[100px] lg:h-[290px]">
                <motion.div variants={itemVariants}>
                  <Text
                    variant="h3"
                    className={clsx(
                      sora.className,
                      "mt-[8px] font-bold tracking-[0px] text-[#242423] capitalize",
                      "text-[16px] leading-[24px]",
                      "md:text-[24px] md:leading-[34px]",
                      "lg:text-[32px] lg:leading-[44px]",
                    )}
                  >
                    {title}
                  </Text>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Text
                    className={clsx(
                      "mt-[8px] font-sans font-light tracking-[0px] text-[#616161]",
                      "text-[12px] leading-[20px]",
                      "md:text-[14px] md:leading-[24px]",
                      "lg:text-[16px] lg:leading-[26px]",
                    )}
                  >
                    {description}
                  </Text>
                </motion.div>
              </Container>
            </Container>

            <Container className="mt-[20px] flex max-w-[80%] justify-start md:mt-[10px] md:max-w-[48%] lg:mt-[80px] lg:max-w-[38%]">
              <motion.div variants={itemVariants}>
                <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
                  <Button as="span" tone="dark" icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}>
                    {ctaLabel}
                  </Button>
                </Link>
              </motion.div>
            </Container>
          </motion.div>
        </AnimatePresence>

        <Container className="mt-[150px] flex w-full justify-center md:mt-0 md:pt-[160px] lg:mt-[135px] lg:pt-0">
          {children}
        </Container>
      </Container>
    </Container>
  );
}
