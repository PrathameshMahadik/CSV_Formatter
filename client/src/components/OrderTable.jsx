import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Button, CssBaseline, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EditIcon, VisibilityIcon } from "./material";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "index",
    numeric: true,
    disablePadding: true,
    label: "Index",
  },
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

const EnhancedTableHead = React.memo((props) => {
  const { order, orderBy, onRequestSort } = props;
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
              align="center"
              valign="center"
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
});

export default function OrderTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [countAll, setAllCount] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  let count = countAll === 0 ? 0 : page * rowsPerPage;
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);

  const jwt = `Bearer ${process.env.REACT_APP_JWT_TOKEN}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4999/data/`, {
        headers: {
          authorization: jwt,
        },
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
    if (search) {
      handleSearch();
    } else {
      fetchData();
    }
  }, [search, page, rowsPerPage]);

  const handleSearch = async () => {
    setSearch(true);
    try {
      const response = await axios.get(`http://localhost:4999/search/`, {
        headers: {
          authorization: jwt,
        },
        params: {
          _limit: rowsPerPage,
          _page: page + 1,
          fname: searchText,
        },
      });
      setData(response.data.data);
      setAllCount(response.data.count);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    if (e.target.value < 1) {
      setSearch(false);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countAll) : 0;

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          marginleft: "50px",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Data
        </Typography>

        <div>
          <Input type="search" onChange={handleSearchInput} />
          <Button onClick={handleSearch}>Search</Button>
        </div>

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
            "& thead th:nth-child(2)": {
              width: "150px",
            },
            "& thead th:nth-child(3)": {
              width: "150px",
            },
            "& thead th:nth-child(4)": {
              width: "120px",
            },
            "& tr > *:nth-child(n+4)": { textAlign: "center" },
          }}
        >
          {/* <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={countAll}
          />
          <tbody>
            {stableSort(data, getComparator(order, orderBy)).map(
              (item, index) => {
                count++;
                return (
                  <tr key={item._id}>
                    <td align="center" valign="center">
                      {count}
                    </td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.gender}</td>
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
                          navigate(`/userData/${item._id}`, {
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
              }
            )}
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
          </tbody> */}
          <TableBody info={{page:page, rowsPerPage:rowsPerPage, countAll:countAll, data:data, headCells:headCells}} />

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
      </Sheet>
    </Box>
  );
}
