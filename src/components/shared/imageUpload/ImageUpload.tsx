import type React from "react";
import { useState } from "react";
import type { InputType } from "../../gymForm/types";
import styles from "./index.module.css";

interface Props {
  type: InputType;
  label: string;
  id: string;
  name: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  label,
  id,
  name,
  handleFileChange,
  type,
}) => {
  const [fileName, setFileName] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name ?? "");
    handleFileChange(e);
  };

  return (
    <div className={styles.Field}>
      <label htmlFor={id}>{label}</label>
      <label htmlFor={id} className={styles.Dropzone}>
        {fileName || "Click to upload or drag and drop"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        className={styles.HiddenInput}
      />
    </div>
  );
};
