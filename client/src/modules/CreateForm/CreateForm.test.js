import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CreateForm Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with empty fields", () => {
    render(<CreateForm />);
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("");
  });
});
