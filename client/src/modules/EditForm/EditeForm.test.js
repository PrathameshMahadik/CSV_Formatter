import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EditForm from "./EditForm";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("axios");

describe("EditForm Component", () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      formData: {
        _id: "667320cf98bcaa6d1596021d",
        fname: "Jaclyn",
        email: "baileyreginald@example.com",
        job_title: "Teacher",
        lname: "Fuentes",
        phone_no: "+1-018-674-2928x1637",
        gender: "Female",
      },
    },
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue(mockLocation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with initial data", () => {
    render(<EditForm />);
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Jaclyn");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Fuentes");
  });

  test("submits the form successfully", async () => {
    axios.put.mockResolvedValueOnce({ data: {} });

    render(<EditForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/Job Title/i), {
      target: { value: "Doctor" },
    });

    fireEvent.click(screen.getByRole("button", { fname: /submit/i }));

    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:4999/updaterecord/667320cf98bcaa6d1596021d",
      expect.objectContaining({
        fname: "Jane",
        email: "baileyreginald@example.com",
        job_title: "Doctor",
        lname: "Fuentes",
        phone_no: "+1-018-674-2928x1637",
        gender: "Female",
      }),
      expect.objectContaining({
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
        },
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("handles form submission error", async () => {
    axios.put.mockRejectedValueOnce(new Error("Network Error"));

    render(<EditForm />);

    fireEvent.click(screen.getByRole("button", { fname: /submit/i }));

    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));

    expect(screen.queryByText(/Network Error/)).not.toBeInTheDocument();
  });
});
