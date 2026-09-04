"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogContent } from "@/designUI/utilities/content/blog";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { blogFormSchema, type BlogFormValues } from "./types";

export function useBlogForm() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      landingIntro: blogContent.intro,
      detailsIntro: blogDetailsContent.othersPostIntro,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Blog form submitted", values);
  });

  return { form, onSubmit };
}
