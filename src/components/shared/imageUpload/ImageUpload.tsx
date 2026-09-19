import { Input } from "@base-ui/react";
import type { InputType } from "../../gymForm/types";

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
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Input name={name} id={id} type={type} onChange={handleFileChange} />
    </>
  );
};
