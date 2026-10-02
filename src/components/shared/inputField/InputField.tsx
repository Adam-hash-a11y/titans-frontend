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
  const isValid = touched && !error;
  const hasIcon =
    type === InputType.SELECT || type === InputType.DATE_TIME_LOCAL;

  return (
    <div
      className={`${styles.Field} ${
        touched ? (error ? styles.Invalid : styles.Valid) : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.Control}>
        {type === InputType.SELECT ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          >
            <option value="" disabled hidden>
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
        {isValid && (
          <svg
            className={`${styles.Check} ${hasIcon ? styles.CheckShift : ""}`}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        )}
      </div>
      {touched && error && <InputError error={error} />}
    </div>
  );
};
