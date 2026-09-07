"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { servicesContent } from "@/designUI/utilities/content/services";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { servicesFormSchema, type ServicesFormValues } from "./types";

export function useServicesForm() {
  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(servicesFormSchema),
    defaultValues: {
      badge: servicesContent.intro.badge,
      items: servicesContent.items,
    },
  });

  const itemsArray = useFieldArray({ control: form.control, name: "items" });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("services", { intro: { badge: values.badge }, items: values.items });
      form.reset(values);
    }),
  );

  return { form, onSubmit, itemsArray, status };
}
