import clsx from "clsx";
import Text from "@/designUI/elements/Text/Text";
import type { FormContainerProps } from "./types";

export default function FormContainer({
  title,
  description,
  children,
  actions,
  className = "",
  ...props
}: FormContainerProps) {
  return (
    <form
      className={clsx(
        "flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10",
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1.5 border-b border-[#E4E4E4] pb-4 lg:gap-2 lg:pb-6">
          {title && (
            <Text
              variant="h2"
              className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]"
            >
              {title}
            </Text>
          )}
          {description && (
            <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
              {description}
            </Text>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:gap-x-6">{children}</div>

      {actions && (
        <div className="flex items-center justify-end gap-3 border-t border-[#E4E4E4] pt-4 lg:pt-6">
          {actions}
        </div>
      )}
    </form>
  );
}
