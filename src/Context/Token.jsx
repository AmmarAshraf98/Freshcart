import { createContext, useEffect, useState } from "react";

// context name
export let TokenContext = createContext();

// function to wrap my app
export default function TokenContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
