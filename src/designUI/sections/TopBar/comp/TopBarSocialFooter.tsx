import Container from "@/designUI/elements/Container/Container";
import SocialLinks from "@/designUI/components/SocialLinks/SocialLinks";
import { footerContent } from "@/designUI/utilities/content/footer";

export default function TopBarSocialFooter() {
  return (
    <Container className="w-full shrink-0">
      <Container className="h-px w-full bg-white/[0.24]" />
      <Container className="mx-auto w-full max-w-[1240px] px-[20px] pt-[60px] pb-[50px]">
        <SocialLinks label={footerContent.social.findMeLabel} links={footerContent.social.links} />
      </Container>
    </Container>
  );
}
