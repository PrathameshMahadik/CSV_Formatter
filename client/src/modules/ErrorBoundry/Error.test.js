import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import Error from "./Error";

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
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Error Component", () => {
  test("renders error message and image", () => {
    renderWithRouter(<Error />, { route: "/nonexistent" });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist.")
    ).toBeInTheDocument();
    expect(screen.getByAltText("").src).toContain(
      "https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
    );
  });

  test("navigates back home when button is clicked", async () => {
    const history = createMemoryHistory({ initialEntries: ["/nonexistent"] });
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    render(
      <MemoryRouter history={history}>
        <Routes>
          <Route path="*" element={<Error />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Back Home"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
