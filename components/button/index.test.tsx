import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from ".";

describe("Button Component", () => {
  it("should render correctly with label", () => {
    render(<Button type="button" label="Submit" />);

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should call onClick when submit button is clicked", async () => {
    const handleClick = jest.fn();
    render(
      <Button type="submit" label="Submit" onClick={handleClick} />
    );

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
