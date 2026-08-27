"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeToAuthState, signOutUser } from "@/firebase/authService";
import Button from "@/designUI/elements/Button/Button";

export default function ProtectedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      if (!user) {
        router.replace("/dashboard/login");
      } else {
        setIsChecking(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (isChecking) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-neutral-500">Checking access...</p>
      </main>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <span className="font-semibold">Dashboard</span>
        <Button
          variant="plain"
          className="text-neutral-900"
          onClick={() => {
            signOutUser();
            router.replace("/dashboard/login");
          }}
        >
          Sign out
        </Button>
      </header>
      <div className="flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
