import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import TableFooter from "../../components/TableFooter";
import { StyledTableCell, StyledTableRow } from "../../components/TableRows";

const cellData = [
  { content: "Index", align: "center", width: "160px" },
  { content: "Row No.", align: "center", width: "160px" },
  { content: "Errors", align: "center" },
];

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
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            {cellData.map((cell, index) => (
              <StyledTableCell
                key={index}
                align={cell.align}
                sx={{ width: cell.width }}
              >
                {cell.content}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            count++;
            return (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" sx={{ width: "140px" }}>
                  {count}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "160px" }}>
                  {item.row}
                </StyledTableCell>
                <StyledTableCell align="center">{item.error}</StyledTableCell>
              </StyledTableRow>
            );
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
