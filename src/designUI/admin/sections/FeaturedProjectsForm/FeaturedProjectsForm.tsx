"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import { useFeaturedProjectsForm } from "./function";

export default function FeaturedProjectsForm() {
  const { form, onSubmit } = useFeaturedProjectsForm();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Featured Projects Section"
      description="Title and description shown above the featured projects list. The projects themselves are managed separately."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input
        id="badge"
        label="Title"
        containerClassName="md:col-span-2"
        error={errors.badge?.message}
        {...register("badge")}
      />
      <Textarea
        id="description"
        label="Subtitle"
        containerClassName="md:col-span-2"
        error={errors.description?.message}
        {...register("description")}
      />

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
    </FormContainer>
  );
}
