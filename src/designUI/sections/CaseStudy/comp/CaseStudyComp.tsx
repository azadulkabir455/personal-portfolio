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
        <Container className="absolute inset-0 z-[2] overflow-hidden" style={{ clipPath: screenClipPath }}>
          <Image
            src={studyImage}
            alt=""
            fill
            className="case-study-screen-img origin-top-left object-cover object-top"
          />
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
    </Container>
  );
}
