import type { ReactNode } from "react";
import AuthScaffold from "@/designUI/admin/layout/AuthScaffold/AuthScaffold";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthScaffold>{children}</AuthScaffold>;
}
