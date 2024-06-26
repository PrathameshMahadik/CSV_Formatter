import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CsvDetails from "./CsvDetais";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CsvDetails Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders table with data", async () => {
    const mockData = [
      {
        _id: "1",
        fileName: "example.csv",
        startTime: "2022-01-01",
        endTime: "2022-01-02",
        status: "Completed",
        numItemsUploaded: 10,
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { data: mockData, count: mockData.length },
    });

    render(
      <MemoryRouter>
        <CsvDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("example.csv")).toBeInTheDocument();
    });
  });

//   test("changes rows per page", async () => {
//     const mockData = Array.from({ length: 20 }).map((_, index) => ({
//       _id: `${index + 1}`,
//       fileName: `file-${index + 1}.csv`,
//       startTime: "2022-01-01",
//       endTime: "2022-01-02",
//       status: "Completed",
//       numItemsUploaded: 10,
//     }));

//     axios.get.mockResolvedValueOnce({
//       data: { data: mockData, count: mockData.length },
//     });

//     render(
//       <MemoryRouter>
//         <CsvDetails />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText("file-1.csv")).toBeInTheDocument();
//     });

//     fireEvent.change(screen.getByLabelText("Rows per page:"), {
//       target: { value: "10" },
//     });

//     await waitFor(() => {
//       expect(screen.getByText("file-1.csv")).toBeInTheDocument();
//     });
//   });

  test("navigates to error details page", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);
    const mockData = [
      {
        _id: "1",
        fileName: "example.csv",
        startTime: "2022-01-01",
        endTime: "2022-01-02",
        status: "Completed",
        numItemsUploaded: 10,
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { data: mockData, count: mockData.length },
    });

    render(
      <MemoryRouter>
        <CsvDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("example.csv")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View Errors"));

    expect(navigate).toHaveBeenCalledWith("/csvDetails/1");

    // expect(window.location.pathname).toBe("/csvDetails/1");
  });
});
