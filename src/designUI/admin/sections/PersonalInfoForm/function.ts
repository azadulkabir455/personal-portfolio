"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { personalInfoFormSchema, type PersonalInfoFormValues } from "./types";

export function usePersonalInfoForm() {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      cv: personalInfoContent.cv,
      favicon: personalInfoContent.favicon,
      phone: personalInfoContent.phone,
      email: personalInfoContent.email,
      address: personalInfoContent.address,
    },
  });

  const favicon = useWatch({ control: form.control, name: "favicon" });

  useEffect(() => {
    if (!favicon) return;

    const url = typeof favicon === "string" ? favicon : URL.createObjectURL(favicon);
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;

    return () => {
      if (typeof favicon !== "string") URL.revokeObjectURL(url);
    };
  }, [favicon]);

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const cv = resolveStringValue(values.cv, personalInfoContent.cv);
      const faviconUrl = resolveStringValue(values.favicon, personalInfoContent.favicon);

      await saveSectionContent("personalInfo", {
        cv,
        favicon: faviconUrl,
        phone: values.phone,
        email: values.email,
        address: values.address,
      });
      form.reset({ ...values, cv, favicon: faviconUrl });
    }),
  );

  return { form, onSubmit, status };
}
