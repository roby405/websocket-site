/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    username: null,
  });

  useEffect(() => {
    const automaticLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:4000/whoami", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const user = await response.json();
          if (!user) {
            console.log("Login failed, token is invalid or expired");
            return;
          }
          setAuthState({
            token,
            isAuthenticated: true,
            username: user.username, // You can fetch the username from your API if needed
          });
        } else {
          console.log("No token found in localStorage");
        }
      } catch (error) {
        console.error("Error during automatic login:", error);
      }
    };
    automaticLogin();
  }, []);

  const login = (token, username) => {
    localStorage.setItem("token", token);
    setAuthState({
      token,
      isAuthenticated: true,
      username,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
      username: null,
    });
  };

  return (
    <authContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
