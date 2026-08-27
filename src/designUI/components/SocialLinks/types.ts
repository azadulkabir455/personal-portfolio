import type { FooterSocialLink } from "@/designUI/utilities/content/footer";

export interface SocialLinksProps {
  label: string;
  links: FooterSocialLink[];
  labelColorClassName?: string;
  iconColorClassName?: string;
}
