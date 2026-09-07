"use client";

import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import { usePageVisibilityList } from "./function";

export default function PageVisibilityList() {
  const { items, isEnabled, toggle } = usePageVisibilityList();

  return (
    <FormContainer title="Pages" description="Turn a page off to hide its link from the site navbar.">
      <Container className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
        {items.map((item) => (
          <Container
            key={item.key}
            className="flex items-center justify-between gap-4 rounded-[14px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex flex-col gap-1">
              <Text className="font-sans text-[15px] font-semibold text-[#171717]">{item.label}</Text>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-1 font-sans text-[12px] text-[#8A8A86] transition-colors duration-200 hover:text-[#171717]"
              >
                View page
                <ArrowUpRightIcon width={10} height={10} />
              </Link>
            </Container>

            <Switch
              id={`page-toggle-${item.key}`}
              checked={isEnabled(item.href)}
              onChange={() => toggle(item.href)}
            />
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}
