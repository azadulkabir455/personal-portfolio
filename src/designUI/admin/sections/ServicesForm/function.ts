"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { servicesContent } from "@/designUI/utilities/content/services";
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

  const onSubmit = form.handleSubmit((values) => {
    console.log("Services form submitted", values);
  });

  return { form, onSubmit, itemsArray };
}
