import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { CloseIcon, HamburgerIcon } from "@/designUI/utilities/icons";
import type { TopBarMenuToggleProps } from "../types";

export default function TopBarMenuToggle({ isOpen, onToggle, className }: TopBarMenuToggleProps) {
  return (
    <Container
      role="button"
      tabIndex={0}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={clsx(
        "flex shrink-0 cursor-pointer items-center justify-center rounded-[265px] bg-[#F7F7F7] transition-colors duration-200",
        className ?? "h-[40px] w-[40px]",
      )}
    >
      {isOpen ? <CloseIcon width={14} height={14} /> : <HamburgerIcon width={17} height={7} />}
    </Container>
  );
}
