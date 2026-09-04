"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { SelectOption } from "@/designUI/elements/formElement/Select/types";
import { addBlogFormSchema, type AddBlogFormValues } from "./types";

function buildCategoryOptions(): SelectOption[] {
  const options: SelectOption[] = [];

  blogListContent.categories.forEach((category) => {
    options.push({ value: category.label, label: category.label });
    category.subCategories?.forEach((sub) => {
      options.push({ value: sub.label, label: sub.label, group: category.label });
    });
  });

  return options;
}

export function useAddBlogForm(defaultValues?: Partial<AddBlogFormValues>) {
  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      image: null,
      category: "",
      tags: [],
      content: "",
      ...defaultValues,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Blog post submitted", values);
  });

  return {
    form,
    onSubmit,
    categoryOptions: buildCategoryOptions(),
    tagSuggestions: blogListContent.suggestions,
  };
}
