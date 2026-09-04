"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import RichTextEditor from "@/designUI/elements/formElement/RichTextEditor/RichTextEditor";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import { useTermsForm } from "./function";

export default function TermsForm() {
  const { form, onSubmit } = useTermsForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Terms & Conditions"
      description="Content shown on the public Terms & Conditions page."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
      <Input
        id="updatedAt"
        label="Last Updated"
        error={errors.updatedAt?.message}
        {...register("updatedAt")}
      />

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <RichTextEditor
            id="content"
            label="Content"
            value={field.value}
            onChange={field.onChange}
            error={errors.content?.message}
            containerClassName="md:col-span-2"
          />
        )}
      />
    </FormContainer>
  );
}
