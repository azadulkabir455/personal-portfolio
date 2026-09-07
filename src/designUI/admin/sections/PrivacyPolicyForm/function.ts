"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  privacyPolicyContent,
  type PrivacyPolicyContent,
} from "@/designUI/utilities/content/privacyPolicy";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { normalizeToISODate, toISODate } from "@/designUI/utilities/date";
import { privacyPolicyFormSchema, type PrivacyPolicyFormValues } from "./types";

function toFormValues(data: PrivacyPolicyContent): PrivacyPolicyFormValues {
  return { title: data.title, updatedAt: normalizeToISODate(data.updatedAt), content: data.content };
}

export function usePrivacyPolicyForm() {
  const { data } = useSectionContent("privacyPolicy", privacyPolicyContent);
  const form = useForm<PrivacyPolicyFormValues>({
    resolver: zodResolver(privacyPolicyFormSchema),
    defaultValues: toFormValues(privacyPolicyContent),
  });

  useEffect(() => {
    form.reset(toFormValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const updatedAt = values.content !== data.content ? toISODate(new Date()) : values.updatedAt;
      await saveSectionContent("privacyPolicy", { ...values, updatedAt });
      form.reset({ ...values, updatedAt });
    }),
  );

  return { form, onSubmit, status };
}
