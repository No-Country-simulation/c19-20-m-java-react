import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUser({ id: decodedToken.id_user_details, ...decodedToken });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth-login`,
        { username, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setUser({ id: decodedToken.id, ...decodedToken });
      setMessage("");
      setToken(token);
    } catch (error) {
      console.error("Error logging in:", error.response.data.message);
      setMessage(error.response.data.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const fetchUserDetails = async (id) => {
    if (!id) throw new Error("Invalid user ID");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, message, logout, fetchUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
