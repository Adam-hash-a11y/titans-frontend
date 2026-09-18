import type React from "react";
import { Button } from "@base-ui/react/button";

interface Props {
  label: string;
  handleButton?: () => void;
  type: "submit" | "button";
  disabled?: boolean;
}

export const FormButton: React.FunctionComponent<Props> = ({
  label,
  handleButton,
  disabled,
  type,
}) => {
  return (
    <Button type={type} onClick={handleButton} disabled={disabled}>
      {label}
    </Button>
  );
};
