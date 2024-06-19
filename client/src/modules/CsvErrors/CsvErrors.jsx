// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   styled,
//   tableCellClasses,
// } from "@mui/material";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   IconButton,
//   TableFooter,
//   Typography,
// } from "@mui/material";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import Select from "@mui/joy/Select";
// import axios from "axios";
// import Option from "@mui/joy/Option";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// export default function CsvErrors() {
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
//       console.log("🚀 ~ fetchData ~ response.data.data:", response.data.data);
//     } catch (error) {
//       console.log("🚀 ~ fetchData ~ error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, rowsPerPage]);

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//     console.log("🚀 ~ handleChangePage ~ newPage:", newPage);
//   };

//   const handleChangeRowsPerPage = (event, newValue) => {
//     setRowsPerPage(parseInt(newValue.toString(), 10));
//     setPage(0);
//   };

//   function labelDisplayedRows({ from, to, count }) {
//     return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
//   }

//   const getLabelDisplayedRowsTo = () => {
//     if (countAll === -1) {
//       return (page + 1) * rowsPerPage;
//     }
//     return rowsPerPage === -1
//       ? countAll
//       : Math.min(countAll, (page + 1) * rowsPerPage);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <StyledTableCell align="center">Index</StyledTableCell>
//             <StyledTableCell align="center">Row No.</StyledTableCell>
//             <StyledTableCell align="center">Errors</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell>{data.row}</TableCell>
//             <TableCell>{data.errors}</TableCell>
//           </TableRow>
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={7}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <FormControl
//                   orientation="horizontal"
//                   size="sm"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     flexDirection: "row",
//                   }}
//                 >
//                   <FormLabel>Rows per page:</FormLabel>
//                   <Select
//                     onChange={handleChangeRowsPerPage}
//                     value={rowsPerPage}
//                   >
//                     <Option value={15}>15</Option>
//                     <Option value={20}>20</Option>
//                     <Option value={25}>25</Option>
//                   </Select>
//                 </FormControl>
//                 <Typography textAlign="center" sx={{ minWidth: 80 }}>
//                   {labelDisplayedRows({
//                     from: countAll === 0 ? 0 : page * rowsPerPage + 1,
//                     to: getLabelDisplayedRowsTo(),
//                     count: countAll === -1 ? -1 : countAll,
//                   })}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <IconButton
//                     size="sm"
//                     color="neutral"
//                     variant="outlined"
//                     disabled={page === 0}
//                     onClick={() => handleChangePage(page - 1)}
//                     sx={{ bgcolor: "background.surface" }}
//                   >
//                     <KeyboardArrowLeftIcon />
//                   </IconButton>
//                   <IconButton
//                     size="sm"
//                     color="neutral"
//                     variant="outlined"
//                     disabled={
//                       countAll !== -1
//                         ? page >= Math.ceil(countAll / rowsPerPage) - 1
//                         : false
//                     }
//                     onClick={() => handleChangePage(page + 1)}
//                     sx={{ bgcolor: "background.surface" }}
//                   >
//                     <KeyboardArrowRightIcon />
//                   </IconButton>
//                 </Box>
//               </Box>

//               {/* <TableCell>Total:</TableCell>
//             <TableCell>{countAll}</TableCell> */}
//             </TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  tableCellClasses,
  TableFooter,
  Box,
  Typography,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { useParams } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CsvErrors() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [countAll, setAllCount] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  let count = countAll === 0 ? 0 : page * rowsPerPage;
  const { uploadId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4999/csverrors/`, {
        params: {
          _limit: rowsPerPage,
          _page: page + 1,
          uploadId: uploadId,
        },
      });
      setData(response.data.data);
      setAllCount(response.data.count);
      console.log("🚀 ~ fetchData ~ response.data.data:", response.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    console.log("🚀 ~ handleChangePage ~ newPage:", newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (countAll === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? countAll
      : Math.min(countAll, (page + 1) * rowsPerPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: "140px" }}>
              Index
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "160px" }}>
              Row No.
            </StyledTableCell>
            <StyledTableCell align="center">Errors</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            count++;
            return (
              <TableRow key={index}>
                <TableCell align="center" sx={{ width: "140px" }}>
                  {count}
                </TableCell>
                <TableCell align="center" sx={{ width: "160px" }}>
                  {item.row}
                </TableCell>
                <TableCell align="center">{item.error}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <FormControl
                  orientation="horizontal"
                  size="sm"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}
                  >
                    <Option value={15}>15</Option>
                    <Option value={20}>20</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: countAll === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: countAll === -1 ? -1 : countAll,
                  })}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      countAll !== -1
                        ? page >= Math.ceil(countAll / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
