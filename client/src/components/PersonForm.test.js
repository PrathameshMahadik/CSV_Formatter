import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PersonForm from "./PersonForm";

const mockFormData = {
  email: "",
  fname: "",
  lname: "",
  gender: "",
  phone_no: "",
  job_title: "",
};

const mockHandleSubmit = jest.fn();

describe("PersonForm", () => {
  render(
    <PersonForm formData={mockFormData} handleSubmit={mockHandleSubmit} />
  );

  test("renders all form fields correctly", () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone No./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();
  });

  test("displays validation errors when required fields are empty", async () => {
    render(
      <PersonForm formData={mockFormData} handleSubmit={mockHandleSubmit} />
    );
    const sendButton = screen.getByRole("button", { name: /Send Data/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });
});
