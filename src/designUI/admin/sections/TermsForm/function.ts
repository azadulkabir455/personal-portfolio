"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { termsAndConditionsContent } from "@/designUI/utilities/content/termsAndConditions";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
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
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("termsAndConditions", values);
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}
