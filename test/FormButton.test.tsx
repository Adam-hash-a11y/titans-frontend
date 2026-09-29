import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormButton as FormButtonComponent } from "../src/components/shared/formButton/FormButton";

test("calls onClick handler when clicked", async () => {
  // 1. Setup the user interaction session
  const user = userEvent.setup();
  const handleClick = jest.fn();

  // 2. Render the component
  render(
    <FormButtonComponent
      label="submit"
      type="submit"
      handleButton={handleClick}
    />,
  );

  // 3. Find the button using an accessible role query
  const button = screen.getByRole("button", { name: /click me/i });

  // 4. Simulate the click (must be awaited)
  await user.click(button);

  // 5. Assert the result
  expect(handleClick).toHaveBeenCalledTimes(1);
});
