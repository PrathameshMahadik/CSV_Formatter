import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PersonForm from "./PersonForm";

// Mock formData and handleSubmit
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

  //   test("calls handleSubmit with form values when form is submitted", async () => {
  //     render(
  //         <PersonForm formData={mockFormData} handleSubmit={mockHandleSubmit} />
  //       );

  //     fireEvent.change(screen.getByLabelText(/Email/i)
  //     , {
  //       target: { value: "test@example.com" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/First Name/i), {
  //       target: { value: "John" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Last Name/i), {
  //       target: { value: "Doe" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Gender/i), {
  //       target: { value: "Male" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Phone No./i), {
  //       target: { value: "1234567890" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Job Title/i), {
  //       target: { value: "Developer" },
  //     });

  //     const sendButton = screen.getByRole('button', { name: /Send Data/i });
  //     fireEvent.click(sendButton);

  //     await waitFor(() => {
  //       expect(mockHandleSubmit).toHaveBeenCalledWith({
  //         email: "test@example.com",
  //         fname: "John",
  //         lname: "Doe",
  //         gender: "Male",
  //         phone_no: "1234567890",
  //         job_title: "Developer",
  //       });
  //     });
  //   });

  // test("calls handleSubmit with form values when form is submitted", async () => {
  //   render(
  //     <PersonForm formData={mockFormData} handleSubmit={mockHandleSubmit} />
  //   );
  //   fireEvent.change(screen.getByLabelText(/Email/i), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/First Name/i), {
  //     target: { value: "Prathamesh" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Last Name/i), {
  //     target: { value: "Mahadik" },
  //   });

  //   fireEvent.change(screen.getByLabelText(/Phone No./i), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Job Title/i), {
  //     target: { value: "Developer" },
  //   });
  //   const sendButton = screen.getByRole("button", { name: /Send Data/i });
  //   fireEvent.click(sendButton);
  //   await waitFor(() => {
  //     expect(mockHandleSubmit).toHaveBeenCalledWith({
  //       email: "test@example.com",
  //       fname: "Prathamesh",
  //       lname: "Mahadik",
  //       phone_no: "1234567890",
  //       job_title: "Developer",
  //     });
  //   });
  // });
});
