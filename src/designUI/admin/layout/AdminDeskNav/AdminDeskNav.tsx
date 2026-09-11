"use client";

import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import AdminNavList from "@/designUI/admin/layout/AdminNavList/AdminNavList";
import { useAdminLogout } from "@/customHooks/useAdminLogout";

export default function AdminDeskNav() {
  const { logout, isLoggingOut } = useAdminLogout();

  return (
    <Container
      variant="nav"
      className="fixed top-[10px] bottom-[10px] left-[10px] z-40 hidden w-[260px] flex-col rounded-[16px] border border-[#E4E4E4] bg-white p-5 lg:flex"
    >
      <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
        <Container className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)]">
          <Text className="font-sans text-[13px] font-bold text-[#F7F7F7]">F</Text>
        </Container>
        <Text className="font-sans text-[15px] font-semibold text-[#171717]">Admin Panel</Text>
      </Link>

      <Container className="flex-1 overflow-y-auto">
        <AdminNavList />
      </Container>

      <button
        type="button"
        onClick={logout}
        disabled={isLoggingOut}
        className="mt-4 flex cursor-pointer items-center gap-3 rounded-[10px] border-t border-[#E4E4E4] px-4 pt-5 font-sans text-[14px] font-medium text-[#8A8A86] transition-colors duration-200 hover:text-[#E5484D] disabled:cursor-wait disabled:opacity-70"
      >
        <Icon name="FaSignOutAlt" width={18} height={18} />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </Container>
  );
}
