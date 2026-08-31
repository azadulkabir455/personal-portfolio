import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { CaseStudyCompProps } from "../types";

const SCREEN_CLIP_PATH =
  "polygon(48.94% 9.41%, 50.08% 8.33%, 97.92% 4.03%, 98.79% 4.93%, 87.45% 90.45%, 37.7% 89.28%)";

const SCREEN_TRANSFORM_MOBILE =
  "matrix3d(0.4252721,-0.0232596,0,-0.0001774,-0.2619797,0.7752885,0,-0.0001793,0,0,1,0,179.2262,15.966,0,1)";
const SCREEN_TRANSFORM_MD =
  "matrix3d(0.4252721,-0.0232725,0,-0.0000799,-0.2618349,0.7752885,0,-0.0000807,0,0,1,0,398.0604,35.48,0,1)";
const SCREEN_TRANSFORM_LG =
  "matrix3d(0.4252721,-0.023283,0,-0.0000581,-0.2617165,0.7752885,0,-0.0000587,0,0,1,0,547.0855,48.785,0,1)";

export default function CaseStudyComp({ studyImage }: CaseStudyCompProps) {
  return (
    <Container className="absolute right-[-40px] bottom-[65px] z-[25] flex justify-start md:right-[-90px] md:bottom-[120px] lg:inset-x-0 lg:justify-center lg:bottom-[95px]">
      <Container className="relative h-[180px] w-[362px] md:h-[400px] md:w-[804px] lg:h-[550px] lg:w-[1105px]">
        <Image
          src="/images/casestudy/shape/caseStudyComp.png"
          alt=""
          fill
          className="z-[1] object-contain"
        />
        <Container className="absolute inset-0 z-[2] overflow-hidden" style={{ clipPath: SCREEN_CLIP_PATH }}>
          <Image
            src={studyImage}
            alt=""
            fill
            className="case-study-screen-img origin-top-left object-cover object-top"
          />
        </Container>
        <style>{`
          .case-study-screen-img { transform: ${SCREEN_TRANSFORM_MOBILE}; }
          @media (min-width: 768px) {
            .case-study-screen-img { transform: ${SCREEN_TRANSFORM_MD}; }
          }
          @media (min-width: 1024px) {
            .case-study-screen-img { transform: ${SCREEN_TRANSFORM_LG}; }
          }
        `}</style>
      </Container>
    </Container>
  );
}
