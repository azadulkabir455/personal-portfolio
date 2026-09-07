"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featureContent } from "@/designUI/utilities/content/feature";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { featureFormSchema, type FeatureFormValues } from "./types";

export function useFeatureForm() {
  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      links: featureContent.links,
    },
  });

  const linksArray = useFieldArray({ control: form.control, name: "links" });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("feature", values);
      form.reset(values);
    }),
  );

  return { form, onSubmit, linksArray, status };
}
