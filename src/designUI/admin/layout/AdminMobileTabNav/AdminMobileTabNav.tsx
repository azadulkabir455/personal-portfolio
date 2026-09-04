"use client";

import { AnimatePresence, motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { CloseIcon, HamburgerIcon } from "@/designUI/utilities/icons";
import AdminNavList from "@/designUI/admin/layout/AdminNavList/AdminNavList";
import { useAdminMobileTabNav } from "./function";

export default function AdminMobileTabNav() {
  const { isOpen, toggle, close } = useAdminMobileTabNav();

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
                className="h-full overflow-y-auto rounded-[16px] border border-[#E4E4E4] bg-white p-4 shadow-lg"
              >
                <AdminNavList onNavigate={close} />
              </motion.div>
            </Container>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
