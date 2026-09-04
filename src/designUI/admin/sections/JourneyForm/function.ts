"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journeyContent } from "@/designUI/utilities/content/journey";
import { journeyFormSchema, type JourneyFormValues } from "./types";

export function useJourneyForm() {
  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: {
      intro: journeyContent.intro,
      steps: journeyContent.steps,
      toolkit: {
        toolsTitle: journeyContent.toolkit.toolsTitle,
        tools: journeyContent.toolkit.tools.map((tool) => ({
          name: tool.name,
          icon: tool.icon,
        })),
        certificationsTitle: journeyContent.toolkit.certificationsTitle,
        certificates: journeyContent.toolkit.certificates.map((certificate) => ({
          title: certificate.title,
          image: certificate.image,
          width: String(certificate.width),
          height: String(certificate.height),
        })),
      },
    },
  });

  const stepsArray = useFieldArray({ control: form.control, name: "steps" });
  const toolsArray = useFieldArray({ control: form.control, name: "toolkit.tools" });
  const certificatesArray = useFieldArray({ control: form.control, name: "toolkit.certificates" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Journey form submitted", values);
  });

  return { form, onSubmit, stepsArray, toolsArray, certificatesArray };
}
