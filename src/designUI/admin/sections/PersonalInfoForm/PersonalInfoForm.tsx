"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import FilePreviewButton from "./comp/FilePreviewButton";
import { usePersonalInfoForm } from "./function";

export default function PersonalInfoForm() {
  const { form, onSubmit } = usePersonalInfoForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Personal Information"
      description="Contact details and CV shown across the site."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Controller
        control={control}
        name="cv"
        render={({ field }) => (
          <Container className="mb-2 flex w-full flex-col items-start gap-3 md:mb-0 md:w-[60%] md:flex-row md:items-center">
            <FileInput
              label="CV"
              value={field.value}
              onChange={field.onChange}
              accept="application/pdf"
              hint="PDF, up to 5MB"
              error={errors.cv?.message}
            />
            <FilePreviewButton file={field.value} label="View CV" kind="pdf" />
          </Container>
        )}
      />

      <Controller
        control={control}
        name="favicon"
        render={({ field }) => (
          <Container className="flex w-full flex-col items-start gap-3 md:w-[60%] md:flex-row md:items-center">
            <FileInput
              label="Favicon"
              value={field.value}
              onChange={field.onChange}
              accept="image/png, image/x-icon, image/svg+xml"
              hint="PNG, ICO or SVG, 32x32 recommended"
              error={errors.favicon?.message}
            />
            <FilePreviewButton file={field.value} label="View Fav" kind="image" />
          </Container>
        )}
      />

      <Input id="phone" label="Phone" error={errors.phone?.message} {...register("phone")} />
      <Input id="email" label="Email" error={errors.email?.message} {...register("email")} />
    </FormContainer>
  );
}
