import { AnimatePresence, motion, type Variants } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { CaseStudyCompProps } from "../types";

const screenClipPath =
  "polygon(48.94% 9.41%, 50.08% 8.33%, 97.92% 4.03%, 98.79% 4.93%, 87.45% 90.45%, 37.7% 89.28%)";

const screenTransformMobile =
  "matrix3d(0.4252721,-0.0232596,0,-0.0001774,-0.2619797,0.7752885,0,-0.0001793,0,0,1,0,179.2262,15.966,0,1)";
const screenTransformMd =
  "matrix3d(0.4252721,-0.0232725,0,-0.0000799,-0.2618349,0.7752885,0,-0.0000807,0,0,1,0,398.0604,35.48,0,1)";
const screenTransformLg =
  "matrix3d(0.4252721,-0.023283,0,-0.0000581,-0.2617165,0.7752885,0,-0.0000587,0,0,1,0,547.0855,48.785,0,1)";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;
const easeInOutSine = [0.37, 0, 0.63, 1] as const;

const laptopVariants: Variants = {
  hidden: { x: "35%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { x: { duration: 1.2, ease: easeOutQuint }, opacity: { duration: 0.6, ease: "easeOut" } },
  },
  exit: {
    x: "20%",
    opacity: 0,
    transition: { x: { duration: 0.5, ease: easeInOutSine }, opacity: { duration: 0.4, ease: "easeIn" } },
  },
};

export default function CaseStudyComp({ slideIndex, studyImage, preloadImages }: CaseStudyCompProps) {
  return (
    <Container data-reveal="1" className="absolute right-[-40px] bottom-[65px] z-[25] flex justify-start md:right-[-90px] md:bottom-[120px] lg:inset-x-0 lg:justify-center lg:bottom-[95px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slideIndex}
          variants={laptopVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative h-[180px] w-[362px] will-change-transform md:h-[400px] md:w-[804px] lg:h-[550px] lg:w-[1105px]"
        >
          <Image
            src="/images/casestudy/shape/caseStudyComp.png"
            alt=""
            fill
            className="z-[1] object-contain"
          />
          <Container className="absolute inset-0 z-[2] overflow-hidden" style={{ clipPath: screenClipPath }}>
            <Image
              src={studyImage}
              alt=""
              fill
              className="case-study-screen-img origin-top-left object-cover object-top"
            />
          </Container>
        </motion.div>
      </AnimatePresence>
      <Container aria-hidden className="pointer-events-none absolute h-[180px] w-[362px] opacity-0 md:h-[400px] md:w-[804px] lg:h-[550px] lg:w-[1105px]">
        {preloadImages.map((image) => (
          <Image key={image} src={image} alt="" fill className="object-cover object-top" />
        ))}
      </Container>
      <style>{`
        .case-study-screen-img { transform: ${screenTransformMobile}; }
        @media (min-width: 768px) {
          .case-study-screen-img { transform: ${screenTransformMd}; }
        }
        @media (min-width: 1024px) {
          .case-study-screen-img { transform: ${screenTransformLg}; }
        }
      `}</style>
    </Container>
  );
}
