import type React from "react";
import { InputType } from "../../gymForm/types";
import { Input } from "@base-ui/react/input";
import styles from "./index.module.css";
import { InputError } from "../inputError/InputError";
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
  handleBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  touched?: boolean;
  error?: string;
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
  touched,
  error,
  handleBlur,
}) => {
  return (
    <div className={styles.Field}>
      <label htmlFor={id}>{label}</label>
      {type === InputType.SELECT ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        >
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
          className={styles.Input}
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={handleFieldChange}
          name={name}
          onBlur={handleBlur}
        />
      )}
      {touched && error && <InputError error={error} />}
    </div>
  );
};
