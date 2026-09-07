"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogContent } from "@/designUI/utilities/content/blog";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { blogFormSchema, type BlogFormValues } from "./types";

export function useBlogForm() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      landingIntro: blogContent.intro,
      detailsIntro: blogDetailsContent.othersPostIntro,
    },
  });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await Promise.all([
        saveSectionContent("blog", { intro: values.landingIntro }),
        saveSectionContent("blogDetails", { othersPostIntro: values.detailsIntro }),
      ]);
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}
