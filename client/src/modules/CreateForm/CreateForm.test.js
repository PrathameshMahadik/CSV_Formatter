import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateForm from "./CreateForm";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("CreateForm Component", () => {
  test("renders the form with empty fields", () => {
    render(
      <MemoryRouter>
        <CreateForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("");
  });
});
