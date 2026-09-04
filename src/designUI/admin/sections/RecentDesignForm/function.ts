"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recentDesignContent } from "@/designUI/utilities/content/recentDesign";
import { recentDesignFormSchema, type RecentDesignFormValues } from "./types";

export function useRecentDesignForm() {
  const form = useForm<RecentDesignFormValues>({
    resolver: zodResolver(recentDesignFormSchema),
    defaultValues: {
      text: recentDesignContent.intro.text,
      groups: recentDesignContent.groups,
    },
  });

  const groupsArray = useFieldArray({ control: form.control, name: "groups" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Recent Design form submitted", values);
  });

  return { form, onSubmit, groupsArray };
}
