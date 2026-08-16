"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import StoreProvider from "@/dataStore/StoreProvider";
import { usePresence } from "@/customHooks/usePresence";

function PresenceTracker() {
  usePresence();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

  return (
    <StoreProvider>
      <PresenceTracker />
      {children}
    </StoreProvider>
  );
}
