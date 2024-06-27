import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CsvErrors from "./CsvErrors";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AxiosMockAdapter from "axios-mock-adapter";

const mockAxios = new AxiosMockAdapter(axios);

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/csvDetails/:uploadId" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CsvErrors Component", () => {
  const mockData = [
    { row: 1, error: "Error 1" },
    { row: 2, error: "Error 2" },
    { row: 3, error: "Error 3" },
  ];

  beforeEach(() => {
    mockAxios.onGet("http://localhost:4999/csverrors/").reply(200, {
      data: mockData,
      count: mockData.length,
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders table with data", async () => {
    renderWithRouter(<CsvErrors />, { route: "/csvDetails/1" });

    expect(screen.getByText("Index")).toBeInTheDocument();
    expect(screen.getByText("Row No.")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Error 1")).toBeInTheDocument();
    });
  });
});
