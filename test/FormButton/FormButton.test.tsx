import type React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { FormButton } from "../../src/components/shared/formButton/FormButton";

describe("form button test", () => {
  it("should render the label", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });

    //ASSERT
    expect(button).toBeInTheDocument();
  });

  it("should have the submit type", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });

    //ASSERT
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should have the button type", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Reset" type="button" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /reset/i });

    //ASSERT
    expect(button).toHaveAttribute("type", "button");
  });

  it("should be enabled by default", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });

    //ASSERT
    expect(button).toBeEnabled();
  });

  it("should be disabled when the disabled prop is true", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton
        label="Submit"
        type="submit"
        handleButton={handleButton}
        disabled
      />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });

    //ASSERT
    expect(button).toBeDisabled();
  });

  it("should apply the submit style when the type is submit", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });

    //ASSERT
    expect(button.className).toMatch(/Submit/);
    expect(button.className).not.toMatch(/Reset/);
  });

  it("should apply the reset style when the type is button", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Reset" type="button" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /reset/i });

    //ASSERT
    expect(button.className).toMatch(/Reset/);
    expect(button.className).not.toMatch(/Submit/);
  });

  it("should not call handleButton on first render", () => {
    //ARRANGE
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT

    //ASSERT
    expect(handleButton).not.toHaveBeenCalled();
  });

  it("should call handleButton once when clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });
    await user.click(button);

    //ASSERT
    expect(handleButton).toHaveBeenCalledTimes(1);
  });

  it("should call handleButton twice when clicked twice", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleButton = vi.fn();
    render(
      <FormButton label="Reset" type="button" handleButton={handleButton} />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /reset/i });
    await user.click(button);
    await user.click(button);

    //ASSERT
    expect(handleButton).toHaveBeenCalledTimes(2);
  });

  it("should not call handleButton when disabled", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleButton = vi.fn();
    render(
      <FormButton
        label="Submit"
        type="submit"
        handleButton={handleButton}
        disabled
      />,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });
    await user.click(button);

    //ASSERT
    expect(handleButton).not.toHaveBeenCalled();
  });

  it("should call handleButton when Enter is pressed on the focused button", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleButton = vi.fn();
    render(
      <FormButton label="Reset" type="button" handleButton={handleButton} />,
    );

    //ACT
    await user.tab();
    await user.keyboard("{Enter}");

    //ASSERT
    expect(handleButton).toHaveBeenCalledTimes(1);
  });


  it("should receive focus when the user tabs to it", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleButton = vi.fn();
    render(
      <FormButton label="Submit" type="submit" handleButton={handleButton} />,
    );

    //ACT
    await user.tab();

    //ASSERT
    expect(screen.getByRole("button", { name: /submit/i })).toHaveFocus();
  });

  it("should submit the form when a submit button is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleSubmit = vi.fn((e: React.SubmitEvent<HTMLFormElement>) =>
      e.preventDefault(),
    );
    render(
      <form onSubmit={handleSubmit}>
        <FormButton label="Submit" type="submit" />
      </form>,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });
    await user.click(button);

    //ASSERT
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });


  it("should not submit the form when the submit button is disabled", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleSubmit = vi.fn((e: React.SubmitEvent<HTMLFormElement>) =>
      e.preventDefault(),
    );
    render(
      <form onSubmit={handleSubmit}>
        <FormButton label="Submit" type="submit" disabled />
      </form>,
    );

    //ACT
    const button = screen.getByRole("button", { name: /submit/i });
    await user.click(button);

    //ASSERT
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should render both the reset and submit buttons like the gym form", () => {
    //ARRANGE
    const handleReset = vi.fn();
    render(
      <div>
        <FormButton type="button" label="Reset" handleButton={handleReset} />
        <FormButton type="submit" label="Submit" />
      </div>,
    );

    //ACT
    const buttons = screen.getAllByRole("button");

    //ASSERT
    expect(buttons).toHaveLength(2);
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
