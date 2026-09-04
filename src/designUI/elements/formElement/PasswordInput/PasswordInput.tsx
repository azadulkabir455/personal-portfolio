"use client";

import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/designUI/elements/formElement/Input/Input";
import type { PasswordInputProps } from "./types";

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  props,
  ref,
) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="flex h-full items-center px-4 text-[#8A8A86] transition-colors duration-200 hover:text-[#242423]"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      }
      {...props}
    />
  );
});

export default PasswordInput;
