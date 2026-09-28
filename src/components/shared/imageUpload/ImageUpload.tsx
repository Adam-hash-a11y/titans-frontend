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
  handleRemove: () => void;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  label,
  id,
  name,
  file,
  handleFileChange,
  handleRemove,
  type,
}) => {
  return (
    <div className={styles.Field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.Dropzone}>
        {file ? (
          <div className={styles.FileRow}>
            <img
              src={URL.createObjectURL(file)}
              alt="Profile preview"
              className={styles.Preview}
            />
            <span className={styles.FileName}>{file.name}</span>
            <button
              type="button"
              className={styles.RemoveButton}
              onClick={handleRemove}
              aria-label="Remove picture"
            >
              ✕
            </button>
          </div>
        ) : (
          <label htmlFor={id} className={styles.Placeholder}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff4d1c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9.5H7Z" />
              <path d="M12 16v-5m0 0-2 2m2-2 2 2" />
            </svg>
            <span>
              <strong>Click to upload</strong> or drag and drop
            </span>
            <small>JPG, PNG or WebP (max. 5MB)</small>
          </label>
        )}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleFileChange}
        className={styles.HiddenInput}
        accept="image/*"
      />
    </div>
  );
};
