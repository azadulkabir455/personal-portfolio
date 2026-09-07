"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import type { SelectOption } from "@/designUI/elements/formElement/Select/types";
import { createPost, updatePost } from "@/firebase/blogService";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { slugify } from "@/designUI/utilities/slugify";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
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

export function useAddBlogForm(
  defaultValues?: Partial<AddBlogFormValues>,
  existingPost?: { id: string; href: string },
) {
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

  const router = useRouter();
  const { status, run } = useSaveStatus();

  const existingImage = typeof defaultValues?.image === "string" ? defaultValues.image : undefined;

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const image = resolveStringValue(values.image, existingImage);

      const href = existingPost?.href ?? `/blog/${slugify(values.title)}`;
      const payload = {
        type: "native" as const,
        category: values.category,
        tags: values.tags,
        title: values.title,
        subtitle: values.subtitle,
        excerpt: values.subtitle,
        content: values.content,
        publishedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        image,
        href,
        ctaLabel: "View Details",
      };

      if (existingPost) await updatePost(existingPost.id, payload);
      else await createPost(payload);

      router.push("/admin/blog");
    }),
  );

  return {
    form,
    onSubmit,
    status,
    categoryOptions: buildCategoryOptions(),
    tagSuggestions: blogListContent.suggestions,
  };
}
