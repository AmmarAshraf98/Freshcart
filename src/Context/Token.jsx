import { createContext, useState } from "react";

// context name
export const TokenContext = createContext();

// function to wrap my app
export default function TokenContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
