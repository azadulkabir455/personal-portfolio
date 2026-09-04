import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import AdminNavList from "@/designUI/admin/layout/AdminNavList/AdminNavList";

export default function AdminDeskNav() {
  return (
    <Container
      variant="nav"
      className="fixed top-[10px] bottom-[10px] left-[10px] z-40 hidden w-[260px] flex-col overflow-y-auto rounded-[16px] border border-[#E4E4E4] bg-white p-5 lg:flex"
    >
      <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
        <Container className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)]">
          <Text className="font-sans text-[13px] font-bold text-[#F7F7F7]">F</Text>
        </Container>
        <Text className="font-sans text-[15px] font-semibold text-[#171717]">Admin Panel</Text>
      </Link>

      <AdminNavList />
    </Container>
  );
}
