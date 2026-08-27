import Container from "@/designUI/elements/Container/Container";

export default function HeroGridLines() {
  return (
    <Container className="pointer-events-none absolute inset-0">
      <Container className="hidden lg:block">
        <Container className="absolute inset-x-0 top-[100px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 top-[557px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 bottom-[80px] h-px bg-white/[0.24]" />

        <Container className="absolute inset-y-0 left-1/2 w-full max-w-[1240px] -translate-x-1/2">
          <Container className="absolute inset-y-0 left-[10px] w-px bg-white/[0.24]" />
          <Container className="absolute top-[100px] bottom-0 left-[30.2419%] w-px bg-white/[0.24]" />
          <Container className="absolute top-[100px] bottom-0 left-[69.7581%] w-px bg-white/[0.24]" />
          <Container className="absolute inset-y-0 right-[10px] w-px bg-white/[0.24]" />
        </Container>
      </Container>

      <Container className="relative z-10 mx-auto hidden h-full max-w-[1240px] px-[30px] md:block lg:hidden">
        <Container className="absolute inset-x-0 top-[100px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 bottom-[288px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 bottom-[30px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-y-0 left-[30px] w-px bg-white/[0.24]" />
        <Container className="absolute top-[100px] bottom-[288px] left-[calc(50%-115px)] w-px bg-white/[0.24]" />
        <Container className="absolute top-[100px] bottom-[288px] left-[calc(50%+115px)] w-px bg-white/[0.24]" />
        <Container className="absolute inset-y-0 right-[30px] w-px bg-white/[0.24]" />
      </Container>

      <Container className="absolute inset-0 mx-auto max-w-[1240px] px-5 md:hidden">
        <Container className="absolute top-[30px] bottom-[472px] left-[calc(20px_+_(100%_-_40px)/3)] w-px bg-white/[0.24]" />
        <Container className="absolute top-[30px] bottom-[472px] left-[calc(20px_+_(100%_-_40px)*2/3)] w-px bg-white/[0.24]" />
      </Container>

      <Container className="absolute inset-0 z-30 mx-auto max-w-[1240px] px-5 md:hidden">
        <Container className="absolute inset-x-0 top-[30px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 bottom-[472px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-x-0 bottom-[30px] h-px bg-white/[0.24]" />
        <Container className="absolute inset-y-0 left-[20px] w-px bg-white/[0.24]" />
        <Container className="absolute inset-y-0 right-[20px] w-px bg-white/[0.24]" />
      </Container>
    </Container>
  );
}
