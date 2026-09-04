"use client";

import { useEffect, useState } from "react";

export function useAdminMobileTabNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    isOpen,
    toggle: () => setIsOpen((open) => !open),
    close: () => setIsOpen(false),
  };
}
