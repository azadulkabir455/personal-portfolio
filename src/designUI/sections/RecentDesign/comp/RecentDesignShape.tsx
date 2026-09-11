import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import type { RecentDesignShapeProps } from "../types";

export default function RecentDesignShape({ reversed = false }: RecentDesignShapeProps) {
  const half = (
    <Container
      className={clsx(
        "h-[130px] w-[65px] shrink-0 bg-[#388EFF] md:h-[190px] md:w-[95px] lg:h-[250px] lg:w-[126px]",
        reversed ? "rounded-r-full" : "rounded-l-full",
      )}
    />
  );
  const round = (
    <Container className="h-[40px] w-[40px] shrink-0 rounded-full bg-[#242423] md:h-[62px] md:w-[62px] lg:h-[110px] lg:w-[110px]" />
  );

  return (
    <Container className="flex shrink-0 items-center gap-[10px]">
      {reversed ? (
        <>
          {round}
          {half}
        </>
      ) : (
        <>
          {half}
          {round}
        </>
      )}
    </Container>
  );
}
