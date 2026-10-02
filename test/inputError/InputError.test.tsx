import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputError } from "../../src/components/shared/inputError/InputError";
import "@testing-library/jest-dom/vitest";

describe("input error test", () => {
  it("should render the error message", () => {
    //ARRANGE
    render(<InputError error="First name is required" />);

    //ACT

    //ASSERT
    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("should have the alert role", () => {
    //ARRANGE
    render(<InputError error="First name is required" />);

    //ACT
    const alert = screen.getByRole("alert");

    //ASSERT
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("First name is required");
  });

  it("should render the error inside a paragraph", () => {
    //ARRANGE
    render(<InputError error="Invalid email" />);

    //ACT
    const alert = screen.getByRole("alert");

    //ASSERT
    expect(alert.tagName).toBe("P");
  });

  it("should update when the error changes", () => {
    //ARRANGE
    const { rerender } = render(<InputError error="Invalid email" />);

    //ACT
    rerender(<InputError error="Email is required" />);

    //ASSERT
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });
});
