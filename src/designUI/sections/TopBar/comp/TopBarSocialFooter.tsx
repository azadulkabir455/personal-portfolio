import Container from "@/designUI/elements/Container/Container";
import SocialLinks from "@/designUI/components/SocialLinks/SocialLinks";
import { GridLineLight } from "@/designUI/components/GridLine/GridLine";
import type { TopBarSocialFooterProps } from "../types";

export default function TopBarSocialFooter({ social }: TopBarSocialFooterProps) {
  return (
    <Container className="w-full shrink-0">
      <Container className="relative h-px w-full overflow-hidden bg-white/[0.24]">
        <GridLineLight orientation="horizontal" />
      </Container>
      <Container className="mx-auto w-full max-w-[1240px] px-[20px] pt-[60px] pb-[50px]">
        <SocialLinks label={social.findMeLabel} links={social.links} />
      </Container>
    </Container>
  );
}
