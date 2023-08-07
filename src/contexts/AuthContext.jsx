import React, { createContext, useContext } from "react";

const authContext = createContext();

export function useAuthContext() {
  return useContext(authContext);
}

const AuthContext = ({ children }) => {
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};

export default AuthContext;
