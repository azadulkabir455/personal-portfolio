"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import SaveButton from "@/designUI/elements/SaveButton/SaveButton";
import Container from "@/designUI/elements/Container/Container";
import { useBlogForm } from "./function";

export default function BlogForm() {
  const { form, onSubmit, status } = useBlogForm();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Blog Section"
      description="Intro text shown above the blog list on the landing page."
      onSubmit={onSubmit}
      actions={<SaveButton status={status} />}
    >
      <Container className="flex flex-col gap-4 md:col-span-2">
        <Input
          id="landingIntro.badge"
          label="Badge"
          error={errors.landingIntro?.badge?.message}
          {...register("landingIntro.badge")}
        />
        <Textarea
          id="landingIntro.description"
          label="Description"
          error={errors.landingIntro?.description?.message}
          {...register("landingIntro.description")}
        />
      </Container>
    </FormContainer>
  );
}
