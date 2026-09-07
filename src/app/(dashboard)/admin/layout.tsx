"use client";

import type { ReactNode } from "react";
import AdminScaffold from "@/designUI/admin/layout/AdminScaffold/AdminScaffold";
import { useAdminAuthGuard } from "@/customHooks/useAdminAuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isChecking } = useAdminAuthGuard();

  if (isChecking) return null;

  return <AdminScaffold>{children}</AdminScaffold>;
}
