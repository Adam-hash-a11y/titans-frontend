import { render, screen } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { ImageUpload } from "../../src/components/shared/imageUpload/ImageUpload";
import { InputType } from "../../src/components/gymForm/types";

describe("image upload test", () => {
  it("should render the label", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);

    //ASSERT
    expect(input).toBeInTheDocument();
  });

  it("should apply the id, name and file type attributes", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);

    //ASSERT
    expect(input).toHaveAttribute("id", "PictureID");
    expect(input).toHaveAttribute("name", "profileImage");
    expect(input).toHaveAttribute("type", InputType.FILE);
  });

  it("should only accept jpeg, png and webp images", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);

    //ASSERT
    expect(input).toHaveAttribute("accept", "image/jpeg,image/png,image/webp");
  });

  it("should show the upload placeholder when there is no file", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT

    //ASSERT
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
    expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
    expect(screen.getByText(/jpg, png or webp/i)).toBeInTheDocument();
  });

  it("should not show the preview or the remove button when there is no file", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT

    //ASSERT
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /remove picture/i }),
    ).not.toBeInTheDocument();
  });

  it("should not call any handler on first render", () => {
    //ARRANGE
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT

    //ASSERT
    expect(handleFileChange).not.toHaveBeenCalled();
    expect(handleRemove).not.toHaveBeenCalled();
  });

  it("should show the image preview when a file is given", () => {
    //ARRANGE
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const preview = screen.getByRole("img", { name: /profile preview/i });

    //ASSERT
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute("src", "blob:mock-url");
  });

  it("should create the preview url from the given file", () => {
    //ARRANGE
    const createObjectURL = vi.fn(() => "blob:mock-url");
    globalThis.URL.createObjectURL = createObjectURL;
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT

    //ASSERT
    expect(createObjectURL).toHaveBeenCalledWith(file);
  });

  it("should show the file name when a file is given", () => {
    //ARRANGE
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const fileName = screen.getByText("avatar.png");

    //ASSERT
    expect(fileName).toBeInTheDocument();
  });

  it("should hide the upload placeholder when a file is given", () => {
    //ARRANGE
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT

    //ASSERT
    expect(screen.queryByText(/click to upload/i)).not.toBeInTheDocument();
  });

  it("should show the remove button when a file is given", () => {
    //ARRANGE
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const removeButton = screen.getByRole("button", {
      name: /remove picture/i,
    });

    //ASSERT
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute("type", "button");
  });

  it("should call handleRemove once when the remove button is clicked", async () => {
    //ARRANGE
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={file}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const removeButton = screen.getByRole("button", {
      name: /remove picture/i,
    });
    await user.click(removeButton);

    //ASSERT
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleFileChange).not.toHaveBeenCalled();
  });

  it("should call handleFileChange when a png file is uploaded", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.png", { type: "image/png" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);
    await user.upload(input, file);

    //ASSERT
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });

  it("should call handleFileChange when a jpeg file is uploaded", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.jpg", { type: "image/jpeg" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);
    await user.upload(input, file);

    //ASSERT
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });

  it("should call handleFileChange when a webp file is uploaded", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "avatar.webp", { type: "image/webp" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);
    await user.upload(input, file);

    //ASSERT
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });

  it("should not call handleFileChange when a gif file is uploaded", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "animation.gif", { type: "image/gif" });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);
    await user.upload(input, file);

    //ASSERT
    expect(handleFileChange).not.toHaveBeenCalled();
  });

  it("should not call handleFileChange when a pdf file is uploaded", async () => {
    //ARRANGE
    const user = userEvent.setup();
    const handleFileChange = vi.fn();
    const handleRemove = vi.fn();
    const file = new File(["content"], "document.pdf", {
      type: "application/pdf",
    });
    render(
      <ImageUpload
        type={InputType.FILE}
        label="PROFILE PICTURE*"
        id="PictureID"
        name="profileImage"
        file={null}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
      />,
    );

    //ACT
    const input = screen.getByLabelText(/profile picture/i);
    await user.upload(input, file);

    //ASSERT
    expect(handleFileChange).not.toHaveBeenCalled();
  });
});
