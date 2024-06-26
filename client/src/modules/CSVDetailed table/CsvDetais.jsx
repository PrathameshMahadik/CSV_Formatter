import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, FormControl, FormLabel, IconButton, TableFooter, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Select from "@mui/joy/Select";
import axios from "axios";
import Option from "@mui/joy/Option";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CsvDetails() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [countAll, setAllCount] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  let count = countAll === 0 ? 0 : page * rowsPerPage;
 const navigate = useNavigate() 

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

  const handleChangePage = (newPage) => {
    setPage(newPage);
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
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Index</StyledTableCell>
            <StyledTableCell align="center">File Name</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">
              No. Of Uploaded Records{" "}
            </StyledTableCell>
            <StyledTableCell align="center">Errors</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => {
            count++
            return(
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" align="center">
                {count}
              </StyledTableCell>
              <StyledTableCell align="center">{row.fileName}</StyledTableCell>
              <StyledTableCell align="center">{row.startTime}</StyledTableCell>
              <StyledTableCell align="center">{row.endTime}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">{row.numItemsUploaded}</StyledTableCell>
              <StyledTableCell align="center">
                <Button onClick={()=> navigate(`/csvDetails/${row._id}`)}>View Errors</Button>
              </StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} >
            <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <FormControl orientation="horizontal" size="sm" sx={{
                    display: "flex", alignItems:"center",flexDirection:"row"}}>
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



            {/* <TableCell>Total:</TableCell>
            <TableCell>{countAll}</TableCell> */}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
