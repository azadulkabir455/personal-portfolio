import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import LandingSectionsList from "@/designUI/admin/sections/LandingSectionsList/LandingSectionsList";
import PersonalInfoForm from "@/designUI/admin/sections/PersonalInfoForm/PersonalInfoForm";

export default function AdminHomePage() {
  return (
    <Container className="flex flex-col gap-6">
      <Container className="flex items-center justify-between gap-4 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:p-10">
        <Container className="flex flex-col gap-1">
          <Text variant="h1" className="font-sans text-[22px] font-semibold text-[#171717] md:text-[26px]">
            Home Page Sections
          </Text>
          <Text className="font-sans text-[13px] text-[#8A8A86] md:text-[14px]">
            Turn a section off to hide it from the live site.
          </Text>
        </Container>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1 font-sans text-[13px] font-medium text-[#388EFF] transition-colors duration-200 hover:underline md:text-[14px]"
        >
          View Site
          <ArrowUpRightIcon width={10} height={10} color="#388EFF" />
        </Link>
      </Container>

      <PersonalInfoForm />
      <LandingSectionsList />
    </Container>
  );
}
