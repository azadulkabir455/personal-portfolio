import Link from "@/designUI/elements/Link/Link";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import { DownloadIcon, WhatsAppIcon } from "@/designUI/utilities/icons";
import type { TopBarActionButtonsProps } from "../types";

const buttonClassName = "!bg-none !bg-[#F9F9F91A] !h-[40px] !gap-[18px] !py-[9px] !pl-[24px]";

export default function TopBarMobileActions({
  talkLabel,
  talkHref,
  resumeLabel,
  resumeHref,
}: TopBarActionButtonsProps) {
  return (
    <Container className="flex flex-col items-start gap-[12px]">
      <Link href={talkHref} target="_blank" rel="noopener noreferrer">
        <Button
          as="span"
          variant="filled"
          iconMotion="vertical"
          className={buttonClassName}
          iconClassName="!m-0 !h-[32px] !w-[32px] !bg-transparent"
          icon={<WhatsAppIcon width={32} height={32} />}
        >
          {talkLabel}
        </Button>
      </Link>
      <Link href={resumeHref}>
        <Button
          as="span"
          variant="filled"
          iconMotion="vertical"
          className={buttonClassName}
          iconClassName="!h-[32px] !w-[32px] !bg-[#F7F7F7]"
          icon={<DownloadIcon width={16} height={16} />}
        >
          {resumeLabel}
        </Button>
      </Link>
    </Container>
  );
}
