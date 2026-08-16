import clsx from "clsx";
import Link from "@/designUI/elements/Link/Link";
import Text from "@/designUI/elements/Text/Text";
import { PlusIcon } from "@/designUI/utilities/icons";
import type { FeatureLinkProps } from "../types";

export default function FeatureLink({ label, href }: FeatureLinkProps) {
  return (
    <Link href={href} className="flex cursor-pointer items-center gap-3">
      <PlusIcon color="#388EFF" className="h-2 w-2 shrink-0 md:h-3 md:w-3" />
      <Text
        className={clsx(
          "font-sans font-bold text-[#242423] text-center capitalize",
          "text-[12px] leading-[18px] tracking-[0.13px]",
          "md:text-[14px] md:leading-[22px] md:tracking-[0.25px]",
        )}
      >
        {label}
      </Text>
    </Link>
  );
}
