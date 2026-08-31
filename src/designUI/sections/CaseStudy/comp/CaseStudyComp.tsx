import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";

export default function CaseStudyComp() {
  return (
    <Container className="absolute right-[-40px] bottom-[65px] z-[25] flex justify-start md:right-[-90px] md:bottom-[120px] lg:inset-x-0 lg:justify-center lg:bottom-[95px]">
      <Container className="relative">
        <Image
          src="/images/casestudy/shape/caseStudyComp.png"
          alt=""
          width={4096}
          height={3072}
          className="h-[180px] w-full object-cover md:h-[400px] lg:h-[550px]"
        />
      </Container>
    </Container>
  );
}
