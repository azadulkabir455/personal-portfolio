"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import { useServicesForm } from "./function";

export default function ServicesForm() {
  const { form, onSubmit, itemsArray } = useServicesForm();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Services Section"
      description="Content shown in the landing page services section."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input
        id="badge"
        label="Badge"
        containerClassName="md:col-span-2"
        error={errors.badge?.message}
        {...register("badge")}
      />

      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Services</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() =>
              itemsArray.append({ number: String(itemsArray.fields.length + 1), title: "" })
            }
          >
            + Add Service
          </Button>
        </Container>

        {itemsArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[100px_1fr_auto]"
          >
            <Input
              id={`items.${index}.number`}
              label="Number"
              containerClassName="col-start-1 row-start-1"
              error={errors.items?.[index]?.number?.message}
              {...register(`items.${index}.number`)}
            />
            <button
              type="button"
              onClick={() => itemsArray.remove(index)}
              aria-label="Remove service"
              className="col-start-2 row-start-1 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] md:col-start-3 lg:h-[52px] lg:w-[52px]"
            >
              <Icon name="FaTrashAlt" width={14} height={14} />
            </button>
            <Input
              id={`items.${index}.title`}
              label="Title"
              containerClassName="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
              error={errors.items?.[index]?.title?.message}
              {...register(`items.${index}.title`)}
            />
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}
