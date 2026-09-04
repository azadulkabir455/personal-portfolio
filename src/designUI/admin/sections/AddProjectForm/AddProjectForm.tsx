"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import TagSelect from "@/designUI/elements/formElement/TagSelect/TagSelect";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import { useAddProjectForm } from "./function";
import type { AddProjectFormProps } from "./types";

export default function AddProjectForm({ heading = "Add Project", defaultValues }: AddProjectFormProps) {
  const { form, onSubmit, tagOptions } = useAddProjectForm(defaultValues);
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title={heading}
      description="Add a project to the featured projects list."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Project</Button>}
    >
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <FileInput
            label="Cover Image"
            value={field.value}
            onChange={field.onChange}
            error={errors.image?.message}
            containerClassName="w-full md:max-w-[280px] md:col-span-2"
          />
        )}
      />

      <Input
        id="title"
        label="Title"
        containerClassName="md:col-span-2"
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        id="description"
        label="Description"
        containerClassName="md:col-span-2"
        error={errors.description?.message}
        {...register("description")}
      />

      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TagSelect
            id="tags"
            label="Tags"
            value={field.value}
            onChange={field.onChange}
            options={tagOptions}
            error={errors.tags?.message}
            containerClassName="md:col-span-2"
          />
        )}
      />

      <Container className="mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">Primary Button</span>
        <span className="font-sans text-[11px] text-[#8A8A86]">
          Only shown on the live site when both a label and a link are set.
        </span>

        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="ctaLabel"
            label="Button Label"
            error={errors.ctaLabel?.message}
            {...register("ctaLabel")}
          />
          <Input
            id="ctaLink"
            label="Button Link"
            error={errors.ctaLink?.message}
            {...register("ctaLink")}
          />
        </Container>
      </Container>

      <Container className="flex flex-col gap-4 md:col-span-2">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">Secondary Button</span>
        <span className="font-sans text-[11px] text-[#8A8A86]">
          Optional. Shown on the live site only when both a label and a link are set — for
          example, a link to the project&apos;s Git repository.
        </span>

        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="secondaryCtaLabel"
            label="Button Label"
            error={errors.secondaryCtaLabel?.message}
            {...register("secondaryCtaLabel")}
          />
          <Input
            id="secondaryCtaHref"
            label="Button Link"
            error={errors.secondaryCtaHref?.message}
            {...register("secondaryCtaHref")}
          />
        </Container>
      </Container>
    </FormContainer>
  );
}
