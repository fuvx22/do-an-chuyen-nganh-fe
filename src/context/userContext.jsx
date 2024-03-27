import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

import { API_ROOT } from "../utils/constants";
import { fetchUserAPI } from "../apis";
export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserAPI();
        setUserData(response.data);
        // console.log(response.data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, error }}>
      {children}
    </UserContext.Provider>
  );
};
