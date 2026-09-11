"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogContent } from "@/designUI/utilities/content/blog";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { blogFormSchema, type BlogFormValues } from "./types";

export function useBlogForm() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      landingIntro: blogContent.intro,
    },
  });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("blog", { intro: values.landingIntro });
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}
