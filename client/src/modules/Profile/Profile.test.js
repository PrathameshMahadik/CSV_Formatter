import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
    state: {
      formData: {
        fname: "John",
        lname: "Doe",
        gender: "Male",
        email: "john.doe@example.com",
        phone_no: "123-456-7890",
        job_title: "Developer",
      },
    },
  }),
}));

describe("Profile Component", () => {
  test("renders customer information", () => {
    render(<Profile />);

    expect(screen.getByText("Customer Information")).toBeInTheDocument();

    const expectedFields = [
      "First Name: John",
      "Last Name: Doe",
      "Gender: Male",
      "Email: john.doe@example.com",
      "Phone Number: 123-456-7890",
      "Job Title: Developer",
    ];

    expectedFields.forEach((field) => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });
});
