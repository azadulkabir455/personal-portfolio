import type { InputProps } from "@/designUI/elements/formElement/Input/types";

export type PasswordInputProps = Omit<InputProps, "type" | "endAdornment">;
