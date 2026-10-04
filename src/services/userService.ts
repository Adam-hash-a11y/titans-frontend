import axios from "axios";
import { api } from "./axios";

export const registerUser = async (formData: FormData) => {
  try {
    return await api.post("/users", formData);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Registration failed. Please try again.");
  }
};
