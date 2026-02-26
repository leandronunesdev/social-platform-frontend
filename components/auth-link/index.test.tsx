import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthLink from ".";

describe("AuthLink Component", () => {
  it("should render text and link text", () => {
    render(
      <AuthLink
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    );

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should render link with correct href", () => {
    render(
      <AuthLink
        text="Don't have an account?"
        linkText="Sign up"
        href="/register"
      />
    );

    const link = screen.getByRole("link", { name: "Sign up" });
    expect(link).toHaveAttribute("href", "/register");
  });

  it("should render with different props", () => {
    render(
      <AuthLink
        text="Forgot your password?"
        linkText="Reset it"
        href="/forgot-password"
      />
    );

    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Reset it" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/forgot-password");
  });

  it("should have accessible link with underline and transition classes", () => {
    render(
      <AuthLink
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    );

    const link = screen.getByRole("link", { name: "Sign in" });
    expect(link).toHaveClass("underline");
    expect(link).toHaveClass("hover:text-primary-500");
  });
});
