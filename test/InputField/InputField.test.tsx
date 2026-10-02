import { render, screen } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { InputField } from "../../src/components/shared/inputField/InputField";
import { InputType } from "../../src/components/gymForm/types";
import "@testing-library/jest-dom/vitest";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const planOptions = [
  { label: "Basic", value: "basic" },
  { label: "Standard", value: "standard" },
  { label: "Premium", value: "premium" },
];

describe("input field test", () => {
  it("should render the label and the placeholder", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const label = screen.getByTestId("input-field-label");
    const input = screen.getByTestId("input-field-input");

    //ASSERT
    expect(label).toHaveTextContent("FIRST NAME*");
    expect(input).toHaveAttribute("placeholder", "e.g. Adam");
  });

  it("should apply the id and name attributes", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const input = screen.getByTestId("input-field-input");

    //ASSERT
    expect(input).toHaveAttribute("id", "FirstNameID");
    expect(input).toHaveAttribute("name", "firstName");
  });

  it("should apply the given input type", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const input = screen.getByTestId("input-field-input");

    //ASSERT
    expect(input).toHaveAttribute("type", InputType.TEXT);
  });

  it("should display the value it receives", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value="Adam"
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const input = screen.getByTestId("input-field-input");

    //ASSERT
    expect(input).toHaveValue("Adam");
  });

  it("should not render a select when the type is text", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT

    //ASSERT
    expect(screen.queryByTestId("input-field-select")).not.toBeInTheDocument();
  });

  it("should not render an input when the type is select", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="gender"
        label="GENDER*"
        type={InputType.SELECT}
        placeholder="Select gender"
        value=""
        id="GenderID"
        options={genderOptions}
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT

    //ASSERT
    expect(screen.queryByTestId("input-field-input")).not.toBeInTheDocument();
    expect(screen.getByTestId("input-field-select")).toBeInTheDocument();
  });

  it("should not call handleFieldChange on first render", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT

    //ASSERT
    expect(handleFieldChange).not.toHaveBeenCalled();
  });

  it("should call handleFieldChange when the user types", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const input = screen.getByTestId("input-field-input");
    await user.type(input, "Adam");

    //ASSERT
    expect(handleFieldChange).toHaveBeenCalledTimes(4);
  });

  it("should focus the input when the label is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="firstName"
        label="FIRST NAME*"
        type={InputType.TEXT}
        placeholder="e.g. Adam"
        value=""
        id="FirstNameID"
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    await user.click(screen.getByTestId("input-field-label"));

    //ASSERT
    expect(screen.getByTestId("input-field-input")).toHaveFocus();
  });

  it("should show the selected gender it receives", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="gender"
        label="GENDER*"
        type={InputType.SELECT}
        placeholder="Select gender"
        value="female"
        id="GenderID"
        options={genderOptions}
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const select = screen.getByTestId("input-field-select");

    //ASSERT
    expect(select).toHaveValue("female");
  });

  it("should show the selected membership plan it receives", () => {
    //ARRANGE
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="membershipPlan"
        label="MEMBERSHIP PLAN*"
        type={InputType.SELECT}
        placeholder="Select plan"
        value="premium"
        id="MembershipPlanID"
        options={planOptions}
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const select = screen.getByTestId("input-field-select");

    //ASSERT
    expect(select).toHaveValue("premium");
  });

  it("should call handleFieldChange when a gender is selected", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="gender"
        label="GENDER*"
        type={InputType.SELECT}
        placeholder="Select gender"
        value=""
        id="GenderID"
        options={genderOptions}
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const select = screen.getByTestId("input-field-select");
    await user.selectOptions(select, "female");

    //ASSERT
    expect(handleFieldChange).toHaveBeenCalledTimes(1);
  });

  it("should call handleFieldChange when a membership plan is selected", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFieldChange = vi.fn();
    render(
      <InputField
        name="membershipPlan"
        label="MEMBERSHIP PLAN*"
        type={InputType.SELECT}
        placeholder="Select plan"
        value=""
        id="MembershipPlanID"
        options={planOptions}
        handleFieldChange={handleFieldChange}
      />,
    );

    //ACT
    const select = screen.getByTestId("input-field-select");
    await user.selectOptions(select, "premium");

    //ASSERT
    expect(handleFieldChange).toHaveBeenCalledTimes(1);
  });
});
