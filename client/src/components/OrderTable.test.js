import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderTable from "./OrderTable";
import { useAuth } from "../contexts/useAuth";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../contexts/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockData = {
  data: {
    data: [
      {
        _id: "1",
        fname: "John",
        lname: "Doe",
        gender: "Male",
        email: "john.doe@example.com",
        phone_no: "1234567890",
        job_title: "Developer",
      },
    ],
    count: 1,
  },
};

describe("OrderTable Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      data: mockData.data.data,
      setData: jest.fn(),
    });
    axios.get.mockResolvedValue(mockData);
  });

  test("renders OrderTable component", async () => {
    render(
      <MemoryRouter>
        <OrderTable />
      </MemoryRouter>
    );

    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  test("handles search input", async () => {
    render(
      <MemoryRouter>
        <OrderTable />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(searchInput.value).toBe("John");

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:4999/search/",
        expect.any(Object)
      );
    });
  });

  test("navigates to create record page", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    render(
      <MemoryRouter>
        <OrderTable />
      </MemoryRouter>
    );

    const createButton = screen.getByText("Create Record");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/createrecord");
    });
  });

  test("sorts the table by column", async () => {
    render(
      <MemoryRouter>
        <OrderTable />
      </MemoryRouter>
    );

    const sortButton = screen.getByRole("button", { name: /First Name/i });
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });
});
