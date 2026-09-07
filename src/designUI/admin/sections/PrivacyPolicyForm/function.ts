"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { privacyPolicyContent } from "@/designUI/utilities/content/privacyPolicy";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
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
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("privacyPolicy", values);
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}
