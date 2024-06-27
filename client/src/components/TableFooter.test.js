import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TableFooter from "./TableFooter";

describe("TableFooter Component", () => {
  const defaultProps = {
    info: {
      page: 0,
      setPage: jest.fn(),
      countAll: 100,
      rowsPerPage: 15,
      setRowsPerPage: jest.fn(),
    },
  };

  it("renders the rows per page options", () => {
    render(<TableFooter {...defaultProps} />);

    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
    expect(screen.getByTestId("rows-per-page-select")).toBeInTheDocument();
  });

  it("handles rows per page change", () => {
    render(<TableFooter {...defaultProps} />);

    fireEvent.mouseDown(screen.getByTestId("rows-per-page-select"));
    fireEvent.click(screen.getByTestId("option-30"));

    expect(defaultProps.info.setRowsPerPage).toHaveBeenCalledWith(30);
    expect(defaultProps.info.setPage).toHaveBeenCalledWith(0);
  });

  it("displays the current page and total count", () => {
    render(<TableFooter {...defaultProps} />);

    expect(screen.getByText("1–15 of 100")).toBeInTheDocument();
  });

  it("navigates to the next page", () => {
    render(<TableFooter {...defaultProps} />);

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    expect(defaultProps.info.setPage).toHaveBeenCalledWith(1);
  });

  it("navigates to the previous page", () => {
    const props = {
      ...defaultProps,
      info: {
        ...defaultProps.info,
        page: 1,
      },
    };
    render(<TableFooter {...props} />);

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);

    expect(props.info.setPage).toHaveBeenCalledWith(0);
  });

  it("disables the previous button on the first page", () => {
    render(<TableFooter {...defaultProps} />);

    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    const props = {
      ...defaultProps,
      info: {
        ...defaultProps.info,
        page:
          Math.ceil(
            defaultProps.info.countAll / defaultProps.info.rowsPerPage
          ) - 1,
      },
    };
    render(<TableFooter {...props} />);

    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeDisabled();
  });
});
