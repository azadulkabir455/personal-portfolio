"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import { useRecentDesignForm } from "./function";
import RecentDesignGroupCard from "./comp/RecentDesignGroupCard";

export default function RecentDesignForm() {
  const { form, onSubmit, groupsArray } = useRecentDesignForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Recent Design Section"
      description="Content shown in the landing page recent design section."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input
        id="text"
        label="Heading Text"
        containerClassName="md:col-span-2"
        error={errors.text?.message}
        {...register("text")}
      />

      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Groups</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => groupsArray.append({ href: "", images: [{ src: null, alt: "" }] })}
          >
            + Add Group
          </Button>
        </Container>

        {groupsArray.fields.map((field, index) => (
          <RecentDesignGroupCard
            key={field.id}
            control={control}
            register={register}
            errors={errors}
            index={index}
            onRemove={() => groupsArray.remove(index)}
          />
        ))}
      </Container>
    </FormContainer>
  );
}
