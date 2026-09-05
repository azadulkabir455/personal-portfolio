"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/firebase/authService";
import { forgotPasswordFormSchema, type ForgotPasswordFormValues } from "./types";

export function useForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await resetPassword(values.email);
      setSuccessMessage("Password reset link sent to your email.");
    } catch {
      setErrorMessage("Couldn't send reset link. Check the email and try again.");
    }
  });

  return { form, onSubmit, successMessage, errorMessage };
}
