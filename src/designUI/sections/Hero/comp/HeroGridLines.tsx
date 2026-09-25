import Container from "@/designUI/elements/Container/Container";
import { HLine, VLine } from "@/designUI/components/GridLine/GridLine";

export default function HeroGridLines() {
  return (
    <Container className="pointer-events-none absolute inset-0 z-0">
      <Container className="hidden lg:block">
        <HLine className="inset-x-0 top-[100px]" delay={0} />
        <HLine className="inset-x-0 top-[557px]" delay={0.6} />
        <HLine className="inset-x-0 bottom-[80px]" delay={1.2} />

        <Container className="absolute inset-y-0 left-1/2 w-full max-w-[1240px] -translate-x-1/2">
          <VLine className="inset-y-0 left-[10px]" delay={0.3} />
          <VLine className="top-[100px] bottom-0 left-[29.7737%]" delay={0.9} />
          <VLine className="top-[100px] bottom-0 left-[70.2328%]" delay={1.5} />
          <VLine className="inset-y-0 right-[10px]" delay={2.1} />
        </Container>
      </Container>

      <Container className="relative z-10 mx-auto hidden h-full max-w-[1240px] px-[30px] md:block lg:hidden">
        <HLine className="inset-x-0 top-[100px]" delay={0} />
        <HLine className="inset-x-0 bottom-[288px]" delay={0.6} />
        <HLine className="inset-x-0 bottom-[30px]" delay={1.2} />
        <VLine className="inset-y-0 left-[40px]" delay={0.3} />
        <VLine className="top-[100px] bottom-[288px] left-[calc(50%-115px)]" delay={0.9} />
        <VLine className="top-[100px] bottom-[288px] left-[calc(50%+115px)]" delay={1.5} />
        <VLine className="inset-y-0 right-[40px]" delay={2.1} />
      </Container>

      <Container className="absolute inset-0 mx-auto max-w-[1240px] px-5 md:hidden">
        <VLine
          className="top-[30px] bottom-[472px] left-[calc(20px_+_(100%_-_40px)/3)]"
          delay={0}
        />
        <VLine
          className="top-[30px] bottom-[472px] left-[calc(20px_+_(100%_-_40px)*2/3)]"
          delay={0.6}
        />
      </Container>

      <Container className="absolute inset-0 z-0 mx-auto max-w-[1240px] px-5 md:hidden">
        <HLine className="inset-x-0 top-[30px]" delay={0} />
        <HLine className="inset-x-0 bottom-[472px]" delay={0.6} />
        <HLine className="inset-x-0 bottom-[30px]" delay={1.2} />
        <VLine className="inset-y-0 left-[16px]" delay={0.3} />
        <VLine className="inset-y-0 right-[16px]" delay={0.9} />
      </Container>
    </Container>
  );
}
