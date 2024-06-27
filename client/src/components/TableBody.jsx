import React, { useState } from "react";
import {
  Box,
  EditIcon,
  IconButton,
  Link,
  Tooltip,
  VisibilityIcon,
  visuallyHidden,
} from "./material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

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

const EnhancedTableHead = React.memo((props) => {
  const { order, orderBy, onRequestSort, headCells } = props;
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

const TableBody = ({ info }) => {
  const { page, rowsPerPage, countAll, data, headCells } = info;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fname");
  const navigate = useNavigate();
  let count = countAll === 0 ? 0 : page * rowsPerPage;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countAll) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <EnhancedTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={countAll}
        headCells={headCells}
      />
      <tbody>
        {stableSort(data, getComparator(order, orderBy)).map((item, index) => {
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
                  aria-label={`edit-${item._id}`}
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
                  aria-label={`show-profile-${item._id}`}
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
    </>
  );
};

export default TableBody;
