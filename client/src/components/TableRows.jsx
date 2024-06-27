import {
  Button,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableRows = (props) => {
  const { count, row } = props;
  const navigate = useNavigate();
  return (
    <>
      <StyledTableRow key={count}>
        <StyledTableCell component="th" scope="row" align="center">
          {count}
        </StyledTableCell>
        <StyledTableCell align="center">{row.fileName}</StyledTableCell>
        <StyledTableCell align="center">{row.startTime}</StyledTableCell>
        <StyledTableCell align="center">{row.endTime}</StyledTableCell>
        <StyledTableCell align="center">{row.status}</StyledTableCell>
        <StyledTableCell align="center">{row.numItemsUploaded}</StyledTableCell>
        <StyledTableCell align="center">
          <Button onClick={() => navigate(`/csvDetails/${row._id}`)}>
            View Errors
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default TableRows;
