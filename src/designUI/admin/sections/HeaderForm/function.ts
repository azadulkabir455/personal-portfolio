"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topBarContent } from "@/designUI/utilities/content/topbar";
import { headerFormSchema, type HeaderFormValues } from "./types";

export function useHeaderForm() {
  const form = useForm<HeaderFormValues>({
    resolver: zodResolver(headerFormSchema),
    defaultValues: {
      experienceLabel: topBarContent.experienceLabel,
      talkLabel: topBarContent.talkLabel,
      resumeLabel: topBarContent.resumeLabel,
      navLinks: topBarContent.navLinks,
    },
  });

  const navLinksArray = useFieldArray({ control: form.control, name: "navLinks" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Header form submitted", values);
  });

  return { form, onSubmit, navLinksArray };
}
