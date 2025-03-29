import { createContext, useContext, useState } from "react";

// context name
export const TokenContext = createContext();

// function to wrap my app
export default function TokenContextProvider(props) {
  const [user, setUser] = useState({
    token: localStorage.getItem("userToken"),
    name: localStorage.getItem("userName"),
  });

  const saveUSerData = (userData) => {
    localStorage.setItem("userToken", userData?.token);
    localStorage.setItem("userName", userData?.user.name);
    setUser({
      token: userData?.token,
      name: userData?.user.name,
    });
  };

  const removeUserData = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUser({
      token: null,
      name: null,
    });
  };

  return (
    <TokenContext.Provider value={{ user, saveUSerData, removeUserData }}>
      {props.children}
    </TokenContext.Provider>
  );
}

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
