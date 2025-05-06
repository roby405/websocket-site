/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    userId: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const { execute } = useFetch("api/whoami");

  useEffect(() => {
    const automaticLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await execute();
          setAuthState({
            token,
            isAuthenticated: true,
            userId: user.id,
          });
        } else {
          console.log("No token found in localStorage");
        }
      } catch (error) {
        console.error("Error during automatic login:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    automaticLogin();
  }, [execute]);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    setAuthState({
      token,
      isAuthenticated: true,
      userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
      userId: null,
    });
  };

  return (
    <authContext.Provider value={{ ...authState, login, logout, isLoading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
