import Container from "@/designUI/elements/Container/Container";

export default function JourneyStepDivider() {
  return (
    <Container className="relative flex h-2 w-full items-center">
      <Container className="h-[1px] w-full md:h-[2px] [mask-image:linear-gradient(90deg,transparent_0%,#000_100%)]">
        <Container className="h-full w-full bg-[repeating-linear-gradient(to_right,#0D75FF_0px_3px,transparent_3px_6px)]" />
      </Container>
      <Container className="absolute top-1/2 right-0 h-2 w-2 shrink-0 -translate-y-1/2 rounded-full bg-[#0D75FF]" />
    </Container>
  );
}
