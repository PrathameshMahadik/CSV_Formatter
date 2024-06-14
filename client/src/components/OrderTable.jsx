//

import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Button, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EditIcon, VisibilityIcon } from "../components/material";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// type Order = 'asc' | 'desc';

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "index",
    numeric: true,
    disablePadding: true,
    label: "Index",
  },
  //   {
  //     id: 'userId',
  //     numeric: false,
  //     disablePadding: false,
  //     label: 'User Id',
  //   },
  {
    id: "fname",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lname",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "jobTitle",
    numeric: false,
    disablePadding: false,
    label: "Job Title",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: "ascending", desc: "descending" }[order]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? "primary.plainColor" : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  "& svg": {
                    transition: "0.2s",
                    transform:
                      active && order === "desc"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  },
                  "&:hover": { "& svg": { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         py: 1,
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: 'background.level1',
//         }),
//         borderTopLeftRadius: 'var(--unstable_actionRadius)',
//         borderTopRightRadius: 'var(--unstable_actionRadius)',
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography sx={{ flex: '1 1 100%' }} component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           level="body-lg"
//           sx={{ flex: '1 1 100%' }}
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton size="sm" color="danger" variant="solid">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton size="sm" variant="outlined" color="neutral">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Box>
//   );
// }

export default function OrderTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4999/data?_limit=${rowsPerPage}&_page=${page}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (data.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? data.length
      : Math.min(data.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Data
        </Typography>
        <Button
          onClick={() => navigate("/createrecord")}
          color="primary"
          size="sm"
        >
          Create Record
        </Button>
      </Box>
      <Sheet
        variant="outlined"
        sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
      >
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <Table
          aria-labelledby="tableTitle"
          hoverRow
          sx={{
            "--TableCell-headBackground": "transparent",
            "--TableCell-selectedBackground": (theme) =>
              theme.vars.palette.success.softBg,
            "& thead th:nth-child(1)": {
              width: "120px",
            },
            //   '& thead th:nth-child(2)': {
            //     width: '200px',
            //   },
            "& thead th:nth-child(2)": {
              width: "120px",
            },
            "& thead th:nth-child(3)": {
              width: "150px",
            },
            "& thead th:nth-child(4)": {
              width: "150px",
            },
            "& tr > *:nth-child(n+6)": { textAlign: "center" },
          }}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <tbody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    //   onClick={(event) => handleClick(event, item.name)}
                    //   role="checkbox"
                    //   tabIndex={-1}
                    key={item.index}
                    //   style={
                    //     isItemSelected
                    //       ? ({
                    //           '--TableCell-dataBackground':
                    //             'var(--TableCell-selectedBackground)',
                    //           '--TableCell-headBackground':
                    //             'var(--TableCell-selectedBackground)',
                    //         })
                    //       : {}
                    //   }
                  >
                    {/* <th id={labelId} scope="row">
                    {item.index}
                  </th> */}
                    <td>{item.index}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.sex}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_no}</td>
                    <td>{item.job_title}</td>
                    <td>
                      <IconButton
                        size="large"
                        aria-label="logout"
                        aria-haspopup="true"
                        onClick={() =>
                          navigate(`/updateform/${item._id}`, {
                            state: { formData: item },
                          })
                        }
                        color="inherit"
                      >
                        <Tooltip title="Edit" arrow>
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        size="large"
                        aria-label="logout"
                        aria-haspopup="true"
                        onClick={() =>
                          navigate(`/profile/${item._id}`, {
                            state: { formData: item },
                          })
                        }
                        color="inherit"
                      >
                        <Tooltip title="Show Profile" arrow>
                          <VisibilityIcon />
                        </Tooltip>
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            {emptyRows > 0 && (
              <tr
                style={{
                  height: `calc(${emptyRows} * 40px)`,
                  "--TableRow-hoverBackground": "transparent",
                }}
              >
                <td colSpan={7} aria-hidden />
              </tr>
            )}
          </tbody>
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
                    <Select
                      onChange={handleChangeRowsPerPage}
                      value={rowsPerPage}
                    >
                      <Option value={15}>15</Option>
                      <Option value={20}>20</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
                  {/* <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: data.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: data.length === -1 ? -1 : data.length,
                  })}
                </Typography> */}
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
                        data.length !== -1
                          ? page >= Math.ceil(data.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Box>
  );
}
