import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import TableBody from "./TableBody";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const headCells = [
  { id: "fname", numeric: false, disablePadding: true, label: "First Name" },
  { id: "lname", numeric: false, disablePadding: true, label: "Last Name" },
  { id: "gender", numeric: false, disablePadding: true, label: "Gender" },
  { id: "email", numeric: false, disablePadding: true, label: "Email" },
  { id: "phone_no", numeric: false, disablePadding: true, label: "Phone" },
  { id: "job_title", numeric: false, disablePadding: true, label: "Job Title" },
];

const data = [
  {
    _id: "1",
    fname: "John",
    lname: "Doe",
    gender: "Male",
    email: "john@example.com",
    phone_no: "1234567890",
    job_title: "Engineer",
  },
  {
    _id: "2",
    fname: "Jane",
    lname: "Smith",
    gender: "Female",
    email: "jane@example.com",
    phone_no: "0987654321",
    job_title: "Manager",
  },
];

const defaultProps = {
  info: {
    page: 0,
    rowsPerPage: 5,
    countAll: data.length,
    data: data,
    headCells: headCells,
  },
};

describe("TableBody Component", () => {
  it("renders the table with correct data", () => {
    render(
      <Router>
        <table>
          <TableBody {...defaultProps} />
        </table>
      </Router>
    );

    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  //   it("sorts data correctly when header is clicked", () => {
  //     render(
  //       <Router>
  //         <table>
  //           <TableBody {...defaultProps} />
  //         </table>
  //       </Router>
  //     );

  //     fireEvent.click(screen.getByText("First Name"));
  //     expect(screen.getAllByRole("row")[1]).toHaveTextContent("Jane");
  //     expect(screen.getAllByRole("row")[2]).toHaveTextContent("John");

  //     fireEvent.click(screen.getByText("First Name"));
  //     expect(screen.getAllByRole("row")[1]).toHaveTextContent("John");
  //     expect(screen.getAllByRole("row")[2]).toHaveTextContent("Jane");
  //   });

  it("sorts data correctly when header is clicked", () => {
    render(
      <Router>
        <table>
          <TableBody {...defaultProps} />
        </table>
      </Router>
    );

    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(/Jane/i);
    expect(rows[2]).toHaveTextContent(/John/i);

    fireEvent.click(screen.getByText("First Name"));
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(/John/i);
    expect(rows[2]).toHaveTextContent(/Jane/i);

    fireEvent.click(screen.getByText("First Name"));
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(/Jane/i);
    expect(rows[2]).toHaveTextContent(/John/i);
  });

  it("navigates to the correct route when edit button is clicked", () => {
    render(
      <Router>
        <table>
          <TableBody {...defaultProps} />
        </table>
      </Router>
    );

    const editButton = screen.getByLabelText("edit-1");
    fireEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith("/updateform/1", {
      state: { formData: data[0] },
    });
  });

  it("navigates to the correct route when show profile button is clicked", () => {
    render(
      <Router>
        <table>
          <TableBody {...defaultProps} />
        </table>
      </Router>
    );

    const showProfileButton = screen.getByLabelText("show-profile-1");
    fireEvent.click(showProfileButton);
    expect(mockNavigate).toHaveBeenCalledWith("/userData/1", {
      state: { formData: data[0] },
    });

    const showProfileButton2 = screen.getByLabelText("show-profile-2");
    fireEvent.click(showProfileButton2);
    expect(mockNavigate).toHaveBeenCalledWith("/userData/2", {
      state: { formData: data[1] },
    });
  });
});
