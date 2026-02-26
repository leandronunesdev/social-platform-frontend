import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from ".";

describe("Error Message Component", () => {
  it("should render with a message", () => {
    render(<ErrorMessage message="Error" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
