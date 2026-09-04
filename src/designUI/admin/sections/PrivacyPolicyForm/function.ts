"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { privacyPolicyContent } from "@/designUI/utilities/content/privacyPolicy";
import { privacyPolicyFormSchema, type PrivacyPolicyFormValues } from "./types";

export function usePrivacyPolicyForm() {
  const form = useForm<PrivacyPolicyFormValues>({
    resolver: zodResolver(privacyPolicyFormSchema),
    defaultValues: {
      title: privacyPolicyContent.title,
      updatedAt: privacyPolicyContent.updatedAt,
      content: privacyPolicyContent.content,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Privacy Policy form submitted", values);
  });

  return { form, onSubmit };
}
