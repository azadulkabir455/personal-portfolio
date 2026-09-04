"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featureContent } from "@/designUI/utilities/content/feature";
import { featureFormSchema, type FeatureFormValues } from "./types";

export function useFeatureForm() {
  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      links: featureContent.links,
    },
  });

  const linksArray = useFieldArray({ control: form.control, name: "links" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Feature form submitted", values);
  });

  return { form, onSubmit, linksArray };
}
