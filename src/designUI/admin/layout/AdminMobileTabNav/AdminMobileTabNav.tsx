"use client";

import { AnimatePresence, motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import { CloseIcon, HamburgerIcon } from "@/designUI/utilities/icons";
import AdminNavList from "@/designUI/admin/layout/AdminNavList/AdminNavList";
import { useAdminLogout } from "@/customHooks/useAdminLogout";
import { useAdminMobileTabNav } from "./function";

export default function AdminMobileTabNav() {
  const { isOpen, toggle, close } = useAdminMobileTabNav();
  const { logout, isLoggingOut } = useAdminLogout();

  return (
    <>
      <Container
        variant="header"
        className="fixed inset-x-[10px] bottom-[10px] z-40 flex h-[64px] items-center justify-between rounded-[14px] border border-[#E4E4E4] bg-white px-5 lg:hidden"
      >
        <Text className="font-sans text-[15px] font-semibold text-[#171717]">Admin Panel</Text>

        <Container
          role="button"
          tabIndex={0}
          onClick={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F7F7F7]"
        >
          {isOpen ? <CloseIcon width={14} height={14} /> : <HamburgerIcon width={17} height={7} />}
        </Container>
      </Container>

      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Close menu"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 z-30 bg-[#171717]/40 lg:hidden"
            />

            <Container className="fixed top-[10px] bottom-[84px] left-[10px] z-40 w-full max-w-[280px] lg:hidden">
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex h-full flex-col rounded-[16px] border border-[#E4E4E4] bg-white p-4 shadow-lg"
              >
                <Container className="flex-1 overflow-y-auto">
                  <AdminNavList onNavigate={close} />
                </Container>

                <button
                  type="button"
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="mt-3 flex cursor-pointer items-center gap-3 rounded-[10px] border-t border-[#E4E4E4] px-4 pt-4 font-sans text-[14px] font-medium text-[#8A8A86] transition-colors duration-200 hover:text-[#E5484D] disabled:cursor-wait disabled:opacity-70"
                >
                  <Icon name="FaSignOutAlt" width={18} height={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </motion.div>
            </Container>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
