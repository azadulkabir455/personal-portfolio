"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import SaveButton from "@/designUI/elements/SaveButton/SaveButton";
import Container from "@/designUI/elements/Container/Container";
import ConfirmDialog from "@/designUI/elements/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/designUI/elements/ConfirmDialog/function";
import { useRecentDesignForm } from "./function";
import RecentDesignGroupCard from "./comp/RecentDesignGroupCard";

export default function RecentDesignForm() {
  const { form, onSubmit, groupsArray, status, isContentLoading } = useRecentDesignForm();
  const { register, control, formState } = form;
  const { errors } = formState;
  const confirmDialog = useConfirmDialog();

  const confirmRemoveGroup = (index: number) => {
    confirmDialog.openConfirm({
      title: "Remove this group?",
      message: "This group and its images will be removed from the list.",
      onConfirm: () => groupsArray.remove(index),
    });
  };

  return (
    <FormContainer
      title="Recent Design Section"
      description="Content shown in the landing page recent design section."
      onSubmit={onSubmit}
      isLoading={isContentLoading}
      actions={<SaveButton status={status} />}
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
            onClick={() => groupsArray.append({ images: [{ src: null, alt: "", href: "" }] })}
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
            onRemove={() => confirmRemoveGroup(index)}
          />
        ))}
      </Container>

      <ConfirmDialog {...confirmDialog} />
    </FormContainer>
  );
}
