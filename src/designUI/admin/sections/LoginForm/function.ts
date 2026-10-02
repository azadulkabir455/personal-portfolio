"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/firebase/authService";
import { startAdminSession } from "@/customHooks/useAdminAuthGuard";
import { loginFormSchema, type LoginFormValues } from "./types";

export function useLoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setErrorMessage("");
    try {
      await signInWithEmail(values.email, values.password);
      startAdminSession(values.rememberMe);
      router.push("/admin");
    } catch {
      setErrorMessage("Invalid email or password.");
    }
  });

  return { form, onSubmit, errorMessage };
}
