import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GymForm } from "./components/gymForm/GymForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GymForm />
  </StrictMode>,
);
