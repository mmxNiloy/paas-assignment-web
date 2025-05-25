"use client";
import React, { HTMLAttributes, useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeClosed } from "lucide-react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  readOnly?: boolean;
  asVisible?: boolean;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  placeholder?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      name,
      readOnly,
      asVisible,
      required,
      minLength,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div
        data-state={isVisible ? "shown" : "hidden"}
        className="relative flex w-full items-center justify-center"
      >
        <Input
          type={isVisible || asVisible ? "text" : "password"}
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          minLength={minLength ?? 8}
          className={cn(className, "w-full pr-16")}
          name={name}
          placeholder={placeholder ?? "Password"}
          required={required}
          {...props}
        />
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setIsVisible((oldVal) => !oldVal)}
          className="absolute right-0 border-none bg-transparent ring-0 hover:bg-transparent focus-visible:border-none focus-visible:ring-0"
        >
          {isVisible || asVisible ? <EyeClosed /> : <Eye />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
