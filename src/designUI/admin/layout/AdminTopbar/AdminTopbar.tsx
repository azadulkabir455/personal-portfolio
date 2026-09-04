"use client";

import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { useAdminTopbar } from "./function";

export default function AdminTopbar() {
  const { title } = useAdminTopbar();

  return (
    <Container
      variant="header"
      className="fixed top-[10px] right-[10px] left-[290px] z-30 hidden h-[64px] items-center justify-between rounded-[14px] border border-[#E4E4E4] bg-white px-6 lg:flex"
    >
      <Text className="font-sans text-[16px] font-semibold text-[#171717]">{title}</Text>

      <Container className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F7F7] font-sans text-[13px] font-semibold text-[#171717]">
        A
      </Container>
    </Container>
  );
}
