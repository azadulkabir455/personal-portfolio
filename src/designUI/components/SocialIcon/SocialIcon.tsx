import Link from "@/designUI/elements/Link/Link";
import Icon from "@/designUI/elements/Icon/Icon";
import type { SocialIconProps } from "./types";

export default function SocialIcon({ icon, url }: SocialIconProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F9F9F91A] text-white md:h-10 md:w-10"
    >
      <Icon name={icon.name} width={icon.width} height={icon.height} />
    </Link>
  );
}

/*
<SocialIcon icon={{ name: "FaLinkedinIn" }} url="https://linkedin.com" />
*/
