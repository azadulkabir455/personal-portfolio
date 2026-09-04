"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { termsAndConditionsContent } from "@/designUI/utilities/content/termsAndConditions";
import { termsFormSchema, type TermsFormValues } from "./types";

export function useTermsForm() {
  const form = useForm<TermsFormValues>({
    resolver: zodResolver(termsFormSchema),
    defaultValues: {
      title: termsAndConditionsContent.title,
      updatedAt: termsAndConditionsContent.updatedAt,
      content: termsAndConditionsContent.content,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Terms & Conditions form submitted", values);
  });

  return { form, onSubmit };
}
