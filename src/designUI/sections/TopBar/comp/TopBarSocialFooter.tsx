import Container from "@/designUI/elements/Container/Container";
import SocialLinks from "@/designUI/components/SocialLinks/SocialLinks";
import { GridLineLight } from "@/designUI/components/GridLine/GridLine";
import { footerContent } from "@/designUI/utilities/content/footer";

export default function TopBarSocialFooter() {
  return (
    <Container className="w-full shrink-0">
      <Container className="relative h-px w-full overflow-hidden bg-white/[0.24]">
        <GridLineLight orientation="horizontal" />
      </Container>
      <Container className="mx-auto w-full max-w-[1240px] px-[20px] pt-[60px] pb-[50px]">
        <SocialLinks label={footerContent.social.findMeLabel} links={footerContent.social.links} />
      </Container>
    </Container>
  );
}
