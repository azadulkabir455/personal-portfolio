"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import SaveButton from "@/designUI/elements/SaveButton/SaveButton";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import ConfirmDialog from "@/designUI/elements/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/designUI/elements/ConfirmDialog/function";
import { useFeatureForm } from "./function";

export default function FeatureForm() {
  const { form, onSubmit, linksArray, status } = useFeatureForm();
  const { register, formState } = form;
  const { errors } = formState;
  const confirmDialog = useConfirmDialog();

  const confirmRemoveLink = (index: number) => {
    confirmDialog.openConfirm({
      title: "Remove this link?",
      message: "This link will be removed from the list.",
      onConfirm: () => linksArray.remove(index),
    });
  };

  return (
    <FormContainer
      title="Feature Section"
      description="Quick navigation links shown in the landing page feature section."
      onSubmit={onSubmit}
      actions={<SaveButton status={status} />}
    >
      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Links</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => linksArray.append({ label: "", href: "" })}
          >
            + Add Link
          </Button>
        </Container>

        {linksArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <Input
              id={`links.${index}.label`}
              label="Label"
              containerClassName="col-start-1 row-start-1"
              error={errors.links?.[index]?.label?.message}
              {...register(`links.${index}.label`)}
            />
            <button
              type="button"
              onClick={() => confirmRemoveLink(index)}
              aria-label="Remove link"
              className="col-start-2 row-start-1 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] md:col-start-3 lg:h-[52px] lg:w-[52px]"
            >
              <Icon name="FaTrashAlt" width={14} height={14} />
            </button>
            <Input
              id={`links.${index}.href`}
              label="Link"
              containerClassName="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
              error={errors.links?.[index]?.href?.message}
              {...register(`links.${index}.href`)}
            />
          </Container>
        ))}
      </Container>

      <ConfirmDialog {...confirmDialog} />
    </FormContainer>
  );
}
