"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeToAuthState, signOutUser } from "@/firebase/authService";
import { isFirebaseConfigured } from "@/firebase/config";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;
export const LOGIN_AT_KEY = "adminLoginAt";

export function useAdminAuthGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let expiryTimeout: ReturnType<typeof setTimeout> | undefined;

    const forceLogout = () => {
      localStorage.removeItem(LOGIN_AT_KEY);
      signOutUser().finally(() => router.replace("/login"));
    };

    const unsubscribe = subscribeToAuthState((user) => {
      clearTimeout(expiryTimeout);

      if (!user) {
        localStorage.removeItem(LOGIN_AT_KEY);
        router.replace("/login");
        return;
      }

      const loginAt = Number(localStorage.getItem(LOGIN_AT_KEY)) || Date.now();
      localStorage.setItem(LOGIN_AT_KEY, loginAt.toString());

      const remaining = SESSION_DURATION_MS - (Date.now() - loginAt);
      if (remaining <= 0) {
        forceLogout();
        return;
      }

      expiryTimeout = setTimeout(forceLogout, remaining);
      setIsChecking(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(expiryTimeout);
    };
  }, [router]);

  return { isChecking: isFirebaseConfigured && isChecking };
}
