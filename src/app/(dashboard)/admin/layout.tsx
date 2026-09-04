import type { ReactNode } from "react";
import AdminScaffold from "@/designUI/admin/layout/AdminScaffold/AdminScaffold";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminScaffold>{children}</AdminScaffold>;
}
