import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import Input from ".";

describe("Input Component", () => {
  it("should render input with label", () => {
    render(<Input label="Email" type="email" id="email" />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("should display error message when error is provided", () => {
    const error = { message: "Email is required", type: "required" };

    render(
      <Input
        label="Email"
        type="email"
        id="email"
        error={error}
        register={undefined}
      />
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("should render input with placeholder", () => {
    render(
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="user@email.com"
      />
    );

    expect(screen.getByPlaceholderText("user@email.com")).toBeInTheDocument();
  });

  it("should work with react-hook-form register", async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useForm());

    render(
      <Input
        label="Email"
        type="email"
        id="email"
        register={result.current.register}
      />
    );

    const input = screen.getByLabelText("Email") as HTMLInputElement;

    // Type into the input
    await user.type(input, "test@example.com");

    // Verify the value is captured by react-hook-form
    expect(result.current.getValues("email")).toBe("test@example.com");
  });

  it("should apply error styling when error is provided", () => {
    const error = { message: "Email is required", type: "required" };

    render(
      <Input
        label="Email"
        type="email"
        id="email"
        error={error}
        register={undefined}
      />
    );

    const label = screen.getByLabelText("Email").previousElementSibling;
    const input = screen.getByLabelText("Email");

    // Label should have red text color
    expect(label).toHaveClass("text-red-600");

    // Input should have red background
    expect(input).toHaveClass("bg-red-50");
  });

  it("should apply normal styling when no error", () => {
    render(<Input label="Email" type="email" id="email" />);

    const label = screen.getByLabelText("Email").previousElementSibling;
    const input = screen.getByLabelText("Email");

    // Label should have normal text color
    expect(label).toHaveClass("text-primary-950");
    expect(label).not.toHaveClass("text-red-600");

    // Input should not have red background
    expect(input).not.toHaveClass("bg-red-50");
  });

  it("should have proper label-input association", () => {
    render(<Input label="Email" type="email" id="email" />);

    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");

    // Label should have htmlFor matching input id
    expect(label).toHaveAttribute("for", "email");

    // Input should have id matching label's htmlFor
    expect(input).toHaveAttribute("id", "email");

    // Input should be accessible via label text
    expect(screen.getByLabelText("Email")).toBe(input);
  });

  it("should be accessible via label text", () => {
    render(<Input label="Email" type="email" id="email" />);

    // Should be able to find input by its label
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
  });

  it("should have aria-invalid when error exists", () => {
    const error = { message: "Email is required", type: "required" };

    render(
      <Input
        label="Email"
        type="email"
        id="email"
        error={error}
        register={undefined}
      />
    );

    const input = screen.getByLabelText("Email");

    // Input should have aria-invalid="true" when error exists
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should not have aria-invalid when no error", () => {
    render(<Input label="Email" type="email" id="email" />);

    const input = screen.getByLabelText("Email");

    // Input should have aria-invalid="false" or not have the attribute when no error
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("should have aria-describedby when error exists", () => {
    const error = { message: "Email is required", type: "required" };

    render(
      <Input
        label="Email"
        type="email"
        id="email"
        error={error}
        register={undefined}
      />
    );

    const input = screen.getByLabelText("Email");

    // Input should have aria-describedby pointing to error message
    // Note: Currently uses error message text, but ideally should use error message element id
    expect(input).toHaveAttribute("aria-describedby");
  });
});
