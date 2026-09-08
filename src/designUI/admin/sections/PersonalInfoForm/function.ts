"use client";

import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoContent, type PersonalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { personalInfoFormSchema, type PersonalInfoFormValues } from "./types";

function toFormValues(data: PersonalInfoContent): PersonalInfoFormValues {
  return {
    cv: data.cv,
    favicon: data.favicon,
    phone: data.phone,
    email: data.email,
    address: data.address,
  };
}

export function usePersonalInfoForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("personalInfo", personalInfoContent);
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: toFormValues(personalInfoContent),
  });

  const savedCvRef = useRef<string | null>(data.cv ?? null);
  const savedFaviconRef = useRef<string | null>(data.favicon ?? null);

  useEffect(() => {
    form.reset(toFormValues(data));
    savedCvRef.current = data.cv ?? null;
    savedFaviconRef.current = data.favicon ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const favicon = useWatch({ control: form.control, name: "favicon" });

  useEffect(() => {
    if (!favicon) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;
  }, [favicon]);

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const cv = values.cv as string;
      const favicon = values.favicon;

      await saveSectionContent("personalInfo", {
        cv,
        favicon: favicon ?? "",
        phone: values.phone,
        email: values.email,
        address: values.address,
      });
      cleanupReplacedFiles([savedCvRef.current, savedFaviconRef.current], [cv, favicon]);
      savedCvRef.current = cv;
      savedFaviconRef.current = favicon ?? null;
      form.reset({ ...values, cv, favicon });
    }),
  );

  return { form, onSubmit, status, isContentLoading };
}
