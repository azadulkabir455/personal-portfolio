import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import Link from "@/designUI/elements/Link/Link";
import Icon from "@/designUI/elements/Icon/Icon";
import type { AuthScaffoldProps } from "./types";

export default function AuthScaffold({ children }: AuthScaffoldProps) {
  return (
    <Container className="relative flex min-h-screen w-full bg-[#F7F7F7]">
      <Container className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image src="/images/login/loginBg.jpg" alt="" fill priority className="object-cover" />
        <Container
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170.92deg, rgba(0,39,92,0.85) 11.6%, rgba(0,39,92,0.85) 96.6%, rgba(0,39,92,0.85) 279.47%)",
          }}
        />

        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-2 pr-4 pl-2 font-sans text-[12px] font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
        >
          <Container className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/20">
            <Icon name="FaArrowLeft" width={10} height={10} color="#F7F7F7" />
          </Container>
          Back to Home
        </Link>
      </Container>

      <Container className="relative z-10 flex w-full flex-col items-center px-5 py-10 lg:left-[-100px] lg:w-1/2 lg:justify-center lg:px-10 xl:left-[-160px]">
        <Link
          href="/"
          className="mb-5 flex w-fit shrink-0 items-center gap-2 self-start rounded-full border border-[#E4E4E4] bg-white py-2 pr-4 pl-2 font-sans text-[12px] font-semibold text-[#171717] shadow-sm transition-colors duration-200 hover:border-[#388EFF]/40 hover:text-[#388EFF] lg:hidden"
        >
          <Container className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F7F7F7]">
            <Icon name="FaArrowLeft" width={10} height={10} color="#171717" />
          </Container>
          Back to Home
        </Link>

        {children}
      </Container>
    </Container>
  );
}
