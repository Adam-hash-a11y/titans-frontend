import type React from "react";
import styles from "./index.module.css";

interface Props {
  error: string;
}

export const InputError: React.FunctionComponent<Props> = ({ error }) => {
  return (
    <p className={styles.Error} role="alert">
      {error}
    </p>
  );
};
