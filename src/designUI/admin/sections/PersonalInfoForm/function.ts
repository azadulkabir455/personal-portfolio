"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { personalInfoFormSchema, type PersonalInfoFormValues } from "./types";

export function usePersonalInfoForm() {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      cv: personalInfoContent.cv,
      phone: personalInfoContent.phone,
      email: personalInfoContent.email,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Personal Info form submitted", values);
  });

  return { form, onSubmit };
}
