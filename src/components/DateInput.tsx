import React from "react";
import { Input } from "@heroui/react";

interface DateInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
}

export default function DateInput({
  label,
  placeholder = "MM/DD/YYYY",
  value = "",
  onChange,
  isInvalid = false,
  errorMessage,
  isRequired = false,
}: DateInputProps) {
  const formatDate = (input: string): string => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, "");

    // Format as MM/DD/YYYY
    let formatted = "";

    if (digits.length >= 1) {
      formatted = digits.substring(0, 2);
    }
    if (digits.length >= 3) {
      formatted += "/" + digits.substring(2, 4);
    }
    if (digits.length >= 5) {
      formatted += "/" + digits.substring(4, 8);
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    onChange?.(formatted);
  };

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      isRequired={isRequired}
      maxLength={10} // MM/DD/YYYY = 10 characters
    />
  );
}
