import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Link from "@/designUI/elements/Link/Link";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { TopBarNavLink } from "@/designUI/utilities/content/topbar";

export default function TopBarNav({
  navLinks,
  onNavigate,
}: {
  navLinks: TopBarNavLink[];
  onNavigate: () => void;
}) {
  return (
    <Container
      variant="nav"
      className="flex flex-col gap-[8px] px-[31px] pt-[40px] pb-[24px] md:px-[70px] lg:gap-[12px] lg:px-[20px] lg:pt-[60px]"
    >
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className={clsx(
            sora.className,
            "font-bold tracking-[0px] text-[#F7F7F7] capitalize transition-colors duration-200 hover:text-[#8FBFFF]",
            "text-[20px] leading-[28px]",
            "lg:text-[32px] lg:leading-[42px]",
          )}
        >
          {link.label}
        </Link>
      ))}
    </Container>
  );
}
