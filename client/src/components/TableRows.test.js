import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableRows from "./TableRows";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("TableRows Component", () => {
  const row = {
    _id: "123",
    fileName: "example.csv",
    startTime: "2024-06-28T10:00:00",
    endTime: "2024-06-28T11:00:00",
    status: "Processed",
    numItemsUploaded: 100,
  };

  it("renders correctly with given props", () => {
    const count = 1;
    render(
      <MemoryRouter>
        <TableRows count={count} row={row} />
      </MemoryRouter>
    );

    expect(screen.getByText(count.toString())).toBeInTheDocument();
    expect(screen.getByText(row.fileName)).toBeInTheDocument();
    expect(screen.getByText(row.startTime)).toBeInTheDocument();
    expect(screen.getByText(row.endTime)).toBeInTheDocument();
    expect(screen.getByText(row.status)).toBeInTheDocument();
    expect(
      screen.getByText(row.numItemsUploaded.toString())
    ).toBeInTheDocument();
  });

  it("navigates to the correct route when 'View Errors' button is clicked", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    const count = 1;
    render(
      <MemoryRouter>
        <TableRows count={count} row={row} />
      </MemoryRouter>
    );

    const viewErrorsButton = screen.getByRole("button", {
      name: "View Errors",
    });
    fireEvent.click(viewErrorsButton);

    expect(navigate).toHaveBeenCalledWith(`/csvDetails/${row._id}`);
  });
});
