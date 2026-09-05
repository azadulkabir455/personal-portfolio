"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { personalInfoFormSchema, type PersonalInfoFormValues } from "./types";

export function usePersonalInfoForm() {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      cv: personalInfoContent.cv,
      favicon: personalInfoContent.favicon,
      phone: personalInfoContent.phone,
      email: personalInfoContent.email,
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

  const onSubmit = form.handleSubmit((values) => {
    console.log("Personal Info form submitted", values);
  });

  return { form, onSubmit };
}
