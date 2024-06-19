import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  return (
    <UserContext.Provider
      value={{
        page,
        setPage,
        data,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
