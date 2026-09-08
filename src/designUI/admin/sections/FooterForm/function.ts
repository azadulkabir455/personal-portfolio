"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerContent, type FooterContent } from "@/designUI/utilities/content/footer";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { footerFormSchema, type FooterFormValues } from "./types";

function toFormValues(data: FooterContent): FooterFormValues {
  return {
    profile: {
      ...data.profile,
      availability: data.profile.availability.join(", "),
    },
    social: {
      ...data.social,
      links: data.social.links.map((link) => ({ icon: link.icon.name, href: link.href })),
    },
    legal: data.legal,
  };
}

export function useFooterForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("footer", footerContent);
  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
    defaultValues: toFormValues(footerContent),
  });

  const savedImageRef = useRef<string | null>(data.profile.image ?? null);

  useEffect(() => {
    form.reset(toFormValues(data));
    savedImageRef.current = data.profile.image ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const socialLinksArray = useFieldArray({ control: form.control, name: "social.links" });
  const legalLinksArray = useFieldArray({ control: form.control, name: "legal.links" });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const image = values.profile.image as string;

      await saveSectionContent("footer", {
        profile: {
          ...values.profile,
          image,
          availability: values.profile.availability.split(",").map((item) => item.trim()),
        },
        social: {
          ...values.social,
          links: values.social.links.map((link) => ({ icon: { name: link.icon }, href: link.href })),
        },
        legal: values.legal,
      });
      cleanupReplacedFiles([savedImageRef.current], [image]);
      savedImageRef.current = image;
      form.reset({ ...values, profile: { ...values.profile, image } });
    }),
  );

  return { form, onSubmit, socialLinksArray, legalLinksArray, status, isContentLoading };
}
