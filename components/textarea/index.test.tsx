import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from ".";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

describe("TextArea Component", () => {
  it("should render textarea with label", () => {
    const label = "Bio";

    render(<TextArea label={label} id="bio" />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("should display error message when error is provided", () => {
    const error = { message: "Bio is required", type: "required" };

    render(<TextArea label="Bio" id="bio" error={error} />);

    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  it("should render textarea with placeholder", () => {
    const placeholder = "Tell us about you...";

    render(<TextArea label="Bio" id="bio" placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("should work with react-hook-form register", async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useForm());
    const label = "Bio";

    render(
      <TextArea label={label} id="bio" register={result.current.register} />
    );

    const textarea = screen.getByLabelText(label) as HTMLTextAreaElement;

    const text = "Brazilian developer living in Canada";

    await user.type(textarea, text);

    expect(result.current.getValues(label)).toBe(text);
  });
});
