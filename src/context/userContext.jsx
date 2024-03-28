import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

import { API_ROOT } from "../utils/constants";
import { fetchUserAPI } from "../apis";
export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  let token = JSON.parse(localStorage.getItem("user-token"));
  const login = async (tk) => {
    token = tk;
    await fetchUserData(token);
  };
  const fetchUserData = async (token) => {
    try {
      const response = await fetchUserAPI(token);
      setUserData(response.data);
      // console.log(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    if (!token) {
      return;
    } else {
      fetchUserData(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, error, login }}>
      {children}
    </UserContext.Provider>
  );
};
