import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CsvHandler from "./CsvHandler";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockAxios = new AxiosMockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/upload" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CsvHandler Component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders upload form", () => {
    renderWithRouter(<CsvHandler />, { route: "/upload" });

    expect(screen.getByText("Upload CSV here")).toBeInTheDocument();
    expect(screen.getByTestId("csvFileInput")).toBeInTheDocument();
  });

  test("shows error when no file is selected", async () => {
    renderWithRouter(<CsvHandler />, { route: "/upload" });

    fireEvent.click(screen.getByText("Upload file"));

    await waitFor(() => {
      expect(screen.getByText("A CSV file is required")).toBeInTheDocument();
    });
  });

  test("uploads file successfully", async () => {
    const file = new File(["content"], "test.csv", { type: "text/csv" });
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    mockAxios.onPost("http://localhost:4999/create").reply(201, {});

    renderWithRouter(<CsvHandler />, { route: "/upload" });

    const input = screen.getByTestId("csvFileInput");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Upload file"));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
    });

    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("handles upload error", async () => {
    const file = new File(["content"], "test.csv", { type: "text/csv" });

    mockAxios.onPost("http://localhost:4999/create").reply(500);

    renderWithRouter(<CsvHandler />, { route: "/upload" });

    const input = screen.getByTestId("csvFileInput");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Upload file"));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
    });
  });
});
