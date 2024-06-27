import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [countAll, setAllCount] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  let count = countAll === 0 ? 0 : page * rowsPerPage;

  return (
    <UserContext.Provider
      value={{
        page,
        setPage,
        data,
        setData,
        countAll,
        setAllCount,
        rowsPerPage,
        setRowsPerPage,
        count,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
