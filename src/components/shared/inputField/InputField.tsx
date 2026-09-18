import type React from "react";
import { InputType } from "../../gymForm/types";
import { Input } from "@base-ui/react/input";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  type: InputType;
  placeholder: string;
  value: string | number;
  id: string;
  name: string;
  options?: Option[];
  handleFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const InputField: React.FunctionComponent<Props> = ({
  label,
  type,
  value,
  placeholder,
  handleFieldChange,
  id,
  name,
  options,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {type === InputType.SELECT ? (
        <select id={id} name={name} value={value} onChange={handleFieldChange}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={handleFieldChange}
          name={name}
        />
      )}
    </>
  );
};
