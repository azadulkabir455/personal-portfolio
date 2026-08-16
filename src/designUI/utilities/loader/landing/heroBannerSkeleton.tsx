import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import HeroContentCard from "@/designUI/sections/Hero/comp/HeroContentCard";

function Bar({ className = "" }: { className?: string }) {
  return <Container className={clsx("animate-pulse rounded-full bg-white/20", className)} />;
}

export default function HeroBannerSkeleton() {
  return (
    <Container className="p-[5px] md:p-[10px]">
      <Container className="relative overflow-hidden rounded-xl">
        <Container className="absolute inset-0 animate-pulse bg-neutral-300" />

        <Container className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-0 px-5 pt-[30px] pb-[30px] md:px-[30px] md:pt-[100px] md:pb-[30px] lg:px-[10px] lg:pt-[100px] lg:pb-[80px]">
          <Container className="relative z-20 flex flex-col items-center gap-3 md:gap-4 lg:gap-5">
            <Bar className="h-[37px] w-[220px] md:h-[80px] md:w-[420px] lg:h-[94px] lg:w-[480px]" />
            <Bar className="h-[37px] w-[260px] md:h-[80px] md:w-[480px] lg:h-[94px] lg:w-[540px]" />
          </Container>

          <Container className="flex flex-col items-center gap-0 md:grid md:grid-cols-2 md:justify-items-center lg:grid lg:w-full lg:grid-cols-[365fr_510fr_365fr] lg:items-end">
            <HeroContentCard className="order-2 md:order-2 lg:order-none">
              <Bar className="mb-[16px] h-[24px] w-full md:mb-[24px] md:h-[26px]" />
              <Bar className="h-[38px] w-36 md:h-[52px]" />
            </HeroContentCard>

            <Container className="relative z-20 order-1 h-[255px] w-[249px] md:order-1 md:col-span-2 md:h-[400px] md:w-[390px] lg:order-none lg:col-span-1 lg:h-[499px] lg:w-full lg:max-w-[487px] lg:justify-self-center">
              <Container className="absolute inset-0 animate-pulse rounded-2xl bg-white/20" />
            </Container>

            <HeroContentCard className="order-3 md:order-3 lg:order-none">
              <Bar className="mb-[16px] h-[24px] w-full md:mb-[24px] md:h-[26px]" />
              <Container className="flex h-[38px] items-center gap-2 md:h-[52px]">
                <Bar className="h-[38px] w-[38px] md:h-10 md:w-10" />
                <Bar className="h-[38px] w-[38px] md:h-10 md:w-10" />
                <Bar className="h-[38px] w-[38px] md:h-10 md:w-10" />
              </Container>
            </HeroContentCard>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

/*
<HeroBannerSkeleton />
*/
