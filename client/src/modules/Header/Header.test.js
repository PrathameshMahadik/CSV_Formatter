import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Bulk CSV Operations")).toBeInTheDocument();
  });

  test("opens and closes drawer", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("open drawer"));

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("close drawer"));

    await waitFor(() => {
      const header = screen.queryByText("Add csv");
      expect(header).toBeNull();
    });
  });

  test("navigates to correct routes", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Add CSV"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/addcsv");
    });

    fireEvent.click(screen.getByText("Bulk Upload Details"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/csvdetails");
    });
  });
});
