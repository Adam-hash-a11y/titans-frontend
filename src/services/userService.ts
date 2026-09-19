import { api } from "./axios";

export const registerUser = (formData: FormData) => {
  return api.post("/users", formData);
};
