import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";

export default function CaseStudyBottomShape() {
  return (
    <Container className="absolute inset-x-0 bottom-0 z-20 h-[85px] md:h-[155px]">
      <Image
        src="/images/casestudy/shape/caseStudyBottomShape.png"
        alt=""
        fill
        className="object-cover object-top"
      />
    </Container>
  );
}
