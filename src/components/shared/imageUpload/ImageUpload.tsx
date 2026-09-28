import type React from "react";
import type { InputType } from "../../gymForm/types";
import styles from "./index.module.css";

interface Props {
  type: InputType;
  label: string;
  id: string;
  name: string;
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  label,
  id,
  name,
  file,
  handleFileChange,
  type,
}) => {
  return (
    <div className={styles.Field}>
      <label htmlFor={id}>{label}</label>
      <label htmlFor={id} className={styles.Dropzone}>
        {file?.name || "Click to upload or drag and drop"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleFileChange}
        className={styles.HiddenInput}
      />
    </div>
  );
};
