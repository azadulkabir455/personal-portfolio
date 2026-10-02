"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/firebase/authService";
import { clearAdminSession } from "./useAdminAuthGuard";

export function useAdminLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    setIsLoggingOut(true);
    signOutUser().finally(() => {
      clearAdminSession();
      router.replace("/login");
    });
  };

  return { logout, isLoggingOut };
}
