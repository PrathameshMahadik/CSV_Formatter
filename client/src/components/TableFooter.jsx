import React from "react";
import { Box, IconButton, Typography } from "./material";
import { FormControl, FormLabel } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const labelDisplayedRows = ({ from, to, count }) => {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
};

const TableFooter = ({ info }) => {
  const { page, setPage, countAll, rowsPerPage, setRowsPerPage } = info;
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (countAll === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? countAll
      : Math.min(countAll, (page + 1) * rowsPerPage);
  };

  return (
    <>
      <tfoot>
        <tr>
          <td colSpan={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <FormControl orientation="horizontal" size="sm">
                <FormLabel>Rows per page:</FormLabel>
                {/* <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                  <Option value={15}>15</Option>
                  <Option value={30}>30</Option>
                  <Option value={50}>50</Option>
                </Select> */}

                <Select
                  onChange={handleChangeRowsPerPage}
                  value={rowsPerPage}
                  data-testid="rows-per-page-select"
                >
                  <Option value={15} data-testid="option-15">15</Option>
                  <Option value={30} data-testid="option-30">30</Option>
                  <Option value={50} data-testid="option-50">50</Option>
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
                  data-testid="prev-button"
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
                  data-testid="next-button"
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TableFooter;
