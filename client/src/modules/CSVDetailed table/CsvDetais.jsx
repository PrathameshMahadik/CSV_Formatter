// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import axios from "axios";
// import TableFooter from "../../components/TableFooter";
// import TableRows from "../../components/TableRows";
// import { StyledTableCell } from "../../components/TableRows";

// const cellHeaders = [
//   "Index",
//   "File Name",
//   "Start Time",
//   "End Time",
//   "Status",
//   "No. Of Uploaded Records",
//   "Errors",
// ];

// export default function CsvDetails() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [countAll, setAllCount] = useState(15);
//   const [rowsPerPage, setRowsPerPage] = useState(15);
//   let count = countAll === 0 ? 0 : page * rowsPerPage;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4999/csvdetails/`, {
//         params: {
//           _limit: rowsPerPage,
//           _page: page + 1,
//         },
//       });
//       setData(response.data.data);
//       setAllCount(response.data.count);
//     } catch (error) {
//       console.log("🚀 ~ fetchData ~ error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, rowsPerPage]);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             {cellHeaders.map((header, index) => (
//               <StyledTableCell key={index} align="center">
//                 {header}
//               </StyledTableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => {
//             count++;
//             return <TableRows count={count} row={row} />;
//           })}
//         </TableBody>
//         <TableFooter
//           info={{
//             page: page,
//             setPage: setPage,
//             countAll: countAll,
//             rowsPerPage: rowsPerPage,
//             setRowsPerPage: setRowsPerPage,
//           }}
//         />
//       </Table>
//     </TableContainer>
//   );
// }

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TableFooter from "../../components/TableFooter";
import TableRows from "../../components/TableRows";
import { StyledTableCell } from "../../components/TableRows";

const cellHeaders = [
  "Index",
  "File Name",
  "Start Time",
  "End Time",
  "Status",
  "No. Of Uploaded Records",
  "Errors",
];

export default function CsvDetails() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [countAll, setAllCount] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  let count = countAll === 0 ? 0 : page * rowsPerPage;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4999/csvdetails/`, {
        params: {
          _limit: rowsPerPage,
          _page: page + 1,
        },
      });
      setData(response.data.data);
      setAllCount(response.data.count);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {cellHeaders.map((header, index) => (
              <StyledTableCell
                key={index}
                align="center"
                data-testid={`header-${index}`}
              >
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody data-testid="table-body">
          {data.map((row, index) => {
            count++;
            return <TableRows key={row._id} count={count} row={row} />;
          })}
        </TableBody>
        <TableFooter
          info={{
            page: page,
            setPage: setPage,
            countAll: countAll,
            rowsPerPage: rowsPerPage,
            setRowsPerPage: setRowsPerPage,
          }}
        />
      </Table>
    </TableContainer>
  );
}
