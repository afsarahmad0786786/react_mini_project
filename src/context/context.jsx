import { createContext, useContext, useState } from "react";

const AppStateContext = createContext({});

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const value = useState({});


  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(AppStateContext);
}



export { AppStateContext, AppProvider, useGlobalContext };