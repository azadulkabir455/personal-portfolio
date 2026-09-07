"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  termsAndConditionsContent,
  type TermsAndConditionsContent,
} from "@/designUI/utilities/content/termsAndConditions";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { normalizeToISODate, toISODate } from "@/designUI/utilities/date";
import { termsFormSchema, type TermsFormValues } from "./types";

function toFormValues(data: TermsAndConditionsContent): TermsFormValues {
  return { title: data.title, updatedAt: normalizeToISODate(data.updatedAt), content: data.content };
}

export function useTermsForm() {
  const { data } = useSectionContent("termsAndConditions", termsAndConditionsContent);
  const form = useForm<TermsFormValues>({
    resolver: zodResolver(termsFormSchema),
    defaultValues: toFormValues(termsAndConditionsContent),
  });

  useEffect(() => {
    form.reset(toFormValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const updatedAt = values.content !== data.content ? toISODate(new Date()) : values.updatedAt;
      await saveSectionContent("termsAndConditions", { ...values, updatedAt });
      form.reset({ ...values, updatedAt });
    }),
  );

  return { form, onSubmit, status };
}
