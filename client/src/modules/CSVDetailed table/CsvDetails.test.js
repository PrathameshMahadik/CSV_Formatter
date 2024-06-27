// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import CsvDetails from "./CsvDetais";
// import axios from "axios";
// import { MemoryRouter } from "react-router-dom";
// import "@testing-library/jest-dom/extend-expect";

// jest.mock("axios");

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: jest.fn(),
// }));

// describe("CsvDetails Component", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders table with data", async () => {
//     const mockData = [
//       {
//         _id: "1",
//         fileName: "example.csv",
//         startTime: "2022-01-01",
//         endTime: "2022-01-02",
//         status: "Completed",
//         numItemsUploaded: 10,
//       },
//     ];

//     axios.get.mockResolvedValueOnce({
//       data: { data: mockData, count: mockData.length },
//     });

//     render(
//       <MemoryRouter>
//         <CsvDetails />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText("example.csv")).toBeInTheDocument();
//     });
//   });

//   test("navigates to error details page", async () => {
//     const navigate = jest.fn();
//     jest
//       .spyOn(require("react-router-dom"), "useNavigate")
//       .mockImplementation(() => navigate);
//     const mockData = [
//       {
//         _id: "1",
//         fileName: "example.csv",
//         startTime: "2022-01-01",
//         endTime: "2022-01-02",
//         status: "Completed",
//         numItemsUploaded: 10,
//       },
//     ];

//     axios.get.mockResolvedValueOnce({
//       data: { data: mockData, count: mockData.length },
//     });

//     render(
//       <MemoryRouter>
//         <CsvDetails />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText("example.csv")).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText("View Errors"));

//     expect(navigate).toHaveBeenCalledWith("/csvDetails/1");

//     // expect(window.location.pathname).toBe("/csvDetails/1");
//   });
// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import CsvDetails from "./CsvDetais";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

const cellHeaders = [
  "Index",
  "File Name",
  "Start Time",
  "End Time",
  "Status",
  "No. Of Uploaded Records",
  "Errors",
];

const mockData = {
  data: {
    data: [
      {
        _id: "1",
        fileName: "file1.csv",
        startTime: "2023-01-01",
        endTime: "2023-01-02",
        status: "Completed",
        noOfUploadedRecords: 100,
        errors: 0,
      },
      {
        _id: "2",
        fileName: "file2.csv",
        startTime: "2023-02-01",
        endTime: "2023-02-02",
        status: "Completed",
        noOfUploadedRecords: 200,
        errors: 0,
      },
    ],
    count: 2,
  },
};

describe("CsvDetails Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers correctly", async () => {
    render(
      <Router>
        <CsvDetails />
      </Router>
    );

    await waitFor(() => {
      cellHeaders.forEach((header, index) => {
        expect(screen.getByTestId(`header-${index}`)).toHaveTextContent(header);
      });
    });
  });

  // it("handles rows per page change correctly", async () => {
  //   render(<CsvDetails />);

  //   // Wait for the component to finish rendering and data to be fetched
  //   await waitFor(() => {
  //     expect(screen.getByText(/file1.csv/i)).toBeInTheDocument();
  //   });

  //   // Open the dropdown for rows per page
  //   fireEvent.mouseDown(screen.getByLabelText("Rows per page:"));

  //   // Select option '30' from the dropdown
  //   fireEvent.click(screen.getByTestId("rows-per-page-option-30"));

  //   // Wait for the component to re-render with new data
  //   await waitFor(() => {
  //     // Assert that the table now displays the correct number of rows for page 1 with 30 items per page
  //     expect(screen.getAllByRole("row").length).toBe(30 + 1); // +1 for the header row
  //   });
  // });

  // it("fetches and displays data correctly", async () => {
  //   render(
  //     <Router>
  //       <CsvDetails />
  //     </Router>
  //   );

  //   await waitFor(() => {
  //     const rows = screen.getByTestId("table-body");
  //     expect(rows.length).toBe(mockData.data.data.length);
  //   });
  // });

  // it("handles rows per page change correctly", async () => {
  //   render(
  //     <Router>
  //       <CsvDetails />
  //     </Router>
  //   );

  //   fireEvent.mouseDown(screen.getByRole("button", { name: "15" }));
  //   fireEvent.click(screen.getByRole("option", { name: "30" }));

  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith(
  //       "http://localhost:4999/csvdetails/",
  //       {
  //         params: {
  //           _limit: 30,
  //           _page: 1,
  //         },
  //       }
  //     );
  //   });
  // });

  // it("handles rows per page change correctly", async () => {
  //   render(<CsvDetails />);

  //   // await waitFor(() => {
  //   // });
  //   fireEvent.mouseDown(screen.getByLabelText("Rows per page:"));

  //   // Now interact with the dropdown and select option '30'
  //   fireEvent.click(screen.getByTestId("rows-per-page-option-30"));

  //   // Wait for the component to finish updating after selecting the option
  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith(
  //       "http://localhost:4999/csvdetails/",
  //       {
  //         params: {
  //           _limit: 30,
  //           _page: 1,
  //         },
  //       }
  //     );
  //   });
  // });
});
