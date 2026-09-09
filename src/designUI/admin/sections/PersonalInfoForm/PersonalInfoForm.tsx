"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import SaveButton from "@/designUI/elements/SaveButton/SaveButton";
import Container from "@/designUI/elements/Container/Container";
import FilePreviewButton from "./comp/FilePreviewButton";
import { usePersonalInfoForm } from "./function";

export default function PersonalInfoForm() {
  const { form, onSubmit, status, isContentLoading } = usePersonalInfoForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Personal Information"
      description="Contact details and CV shown across the site."
      onSubmit={onSubmit}
      isLoading={isContentLoading}
      actions={<SaveButton status={status} />}
    >
      <Controller
        control={control}
        name="cv"
        render={({ field }) => (
          <Container className="mb-2 flex w-full flex-row items-center gap-3 md:mb-0 md:w-[60%]">
            <FileInput
              containerClassName="min-w-0 flex-1"
              label="CV"
              value={field.value}
              onChange={field.onChange}
              folder="personal-info"
              accept="application/pdf"
              hint="PDF, up to 3MB"
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
          <Container className="flex w-full flex-row items-center gap-3 md:w-[60%]">
            <FileInput
              containerClassName="min-w-0 flex-1"
              label="Favicon"
              value={field.value}
              onChange={field.onChange}
              folder="personal-info"
              accept="image/png"
              hint="PNG, 32x32 recommended, up to 3MB"
              error={errors.favicon?.message}
            />
            <FilePreviewButton file={field.value} label="View Fav" kind="image" />
          </Container>
        )}
      />

      <Input id="phone" label="Phone" error={errors.phone?.message} {...register("phone")} />
      <Input id="email" label="Email" error={errors.email?.message} {...register("email")} />
      <Input
        id="address"
        label="Address"
        error={errors.address?.message}
        {...register("address")}
      />
    </FormContainer>
  );
}
