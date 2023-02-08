import React, { useState } from "react";
import AppContext from "./Context";

const defaultToken = {
  token: null,
};
const AppProvider = ({ children }) => {
  const [token, setToken] = useState(defaultToken);
  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
