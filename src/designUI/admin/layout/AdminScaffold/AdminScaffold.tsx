import Container from "@/designUI/elements/Container/Container";
import AdminDeskNav from "@/designUI/admin/layout/AdminDeskNav/AdminDeskNav";
import AdminTopbar from "@/designUI/admin/layout/AdminTopbar/AdminTopbar";
import AdminMobileTabNav from "@/designUI/admin/layout/AdminMobileTabNav/AdminMobileTabNav";
import type { AdminScaffoldProps } from "./types";

export default function AdminScaffold({ children }: AdminScaffoldProps) {
  return (
    <Container className="min-h-screen bg-[#F7F7F7]">
      <AdminDeskNav />
      <AdminTopbar />
      <AdminMobileTabNav />

      <Container
        variant="section"
        className="min-h-screen px-[10px] pt-[10px] pb-[84px] lg:pt-[84px] lg:pr-[10px] lg:pb-[10px] lg:pl-[290px]"
      >
        {children}
      </Container>
    </Container>
  );
}
