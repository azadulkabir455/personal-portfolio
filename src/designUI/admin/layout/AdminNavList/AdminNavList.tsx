"use client";

import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import ChevronDownIcon from "@/designUI/utilities/icons/icon/ChevronDownIcon";
import { adminNav } from "@/designUI/admin/utilities/content/adminNav";
import { useAdminNavList } from "./function";
import type { AdminNavListProps } from "./types";

const navRowClassName =
  "flex items-center gap-3 rounded-[10px] px-4 py-3 font-sans text-[14px] font-medium transition-colors duration-200";

export default function AdminNavList({ onNavigate, className = "" }: AdminNavListProps) {
  const { openLabel, toggle, isActive } = useAdminNavList(adminNav);

  return (
    <Container className={clsx("flex flex-col gap-1", className)}>
      {adminNav.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openLabel === item.label;
        const active =
          isActive(item.href) || Boolean(item.children?.some((child) => isActive(child.href)));

        return (
          <Container key={item.label} className="flex flex-col">
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggle(item.label)}
                className={clsx(
                  navRowClassName,
                  "w-full",
                  active ? "bg-[#F7F7F7] text-[#171717]" : "text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]",
                )}
              >
                <Icon name={item.icon} width={18} height={18} />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDownIcon className={clsx("transition-transform duration-200", isOpen && "rotate-180")} />
              </button>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={clsx(
                  navRowClassName,
                  active ? "bg-[#F7F7F7] text-[#171717]" : "text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]",
                )}
              >
                <Icon name={item.icon} width={18} height={18} />
                <span>{item.label}</span>
              </Link>
            )}

            <AnimatePresence initial={false}>
              {hasChildren && isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <Container className="relative ml-[29px] flex flex-col py-1 pl-5">
                    {item.children?.map((child, index) => {
                      const isLast = index === (item.children?.length ?? 0) - 1;

                      return (
                        <Link key={child.href} href={child.href} onClick={onNavigate} className="relative py-2">
                          <span className="absolute top-0 -left-5 h-1/2 w-4 rounded-bl-[6px] border-b border-l border-[#E4E4E4]" />
                          {!isLast && <span className="absolute top-1/2 -left-5 h-1/2 w-px bg-[#E4E4E4]" />}
                          <span
                            className={clsx(
                              "font-sans text-[13px] transition-colors duration-200",
                              isActive(child.href)
                                ? "font-semibold text-[#171717]"
                                : "text-[#8A8A86] hover:text-[#171717]",
                            )}
                          >
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                  </Container>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        );
      })}
    </Container>
  );
}
