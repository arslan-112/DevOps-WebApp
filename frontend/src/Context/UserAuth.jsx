import { createContext, useState, useEffect } from "react";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userInfo");
    return token && user ? { token, user: JSON.parse(user) } : null;

  });

  console.log(auth);

  const login = (token, user) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userInfo", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setAuth(null);
  };

  return (
    <UserAuthContext.Provider value={{ auth, login, logout,setAuth }}>
      {children}
    </UserAuthContext.Provider>
  );
};