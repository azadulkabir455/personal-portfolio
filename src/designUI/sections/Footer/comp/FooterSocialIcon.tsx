import { FaLinkedinIn, FaBehance, FaDribbble, FaInstagram, FaXTwitter, FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { FooterSocialPlatform } from "@/designUI/utilities/content/footer";

const icons: Record<FooterSocialPlatform, IconType> = {
  linkedin: FaLinkedinIn,
  behance: FaBehance,
  dribbble: FaDribbble,
  instagram: FaInstagram,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  facebook: FaFacebookF,
};

export default function FooterSocialIcon({
  platform,
  className,
}: {
  platform: FooterSocialPlatform;
  className?: string;
}) {
  const Icon = icons[platform];

  return <Icon className={className} />;
}
