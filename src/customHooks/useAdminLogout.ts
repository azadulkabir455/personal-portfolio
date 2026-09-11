"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/firebase/authService";
import { LOGIN_AT_KEY } from "./useAdminAuthGuard";

export function useAdminLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    setIsLoggingOut(true);
    signOutUser().finally(() => {
      localStorage.removeItem(LOGIN_AT_KEY);
      router.replace("/login");
    });
  };

  return { logout, isLoggingOut };
}
