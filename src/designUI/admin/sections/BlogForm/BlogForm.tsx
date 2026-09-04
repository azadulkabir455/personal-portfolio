"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import { useBlogForm } from "./function";

export default function BlogForm() {
  const { form, onSubmit } = useBlogForm();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Blog Section"
      description="Intro text shown above the blog list on the landing page and on the blog details page."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Container className="flex flex-col gap-4 md:col-span-2">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">
          Landing Page Blog Intro
        </span>

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

      <Container className="mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">
          Blog Details Page Blog Intro
        </span>

        <Input
          id="detailsIntro.badge"
          label="Badge"
          error={errors.detailsIntro?.badge?.message}
          {...register("detailsIntro.badge")}
        />
        <Textarea
          id="detailsIntro.description"
          label="Description"
          error={errors.detailsIntro?.description?.message}
          {...register("detailsIntro.description")}
        />
      </Container>
    </FormContainer>
  );
}
