import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      // If token exists, fetch full profile (includes `role`)
      if (token) {
        api.get("/users/me")
          .then((profile) => {
            localStorage.setItem("user", JSON.stringify(profile));
            setUser(profile);
          })
          .catch(() => {
            // fallback to any stored user if profile fetch fails
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== "undefined") {
              setUser(JSON.parse(storedUser));
            }
          });
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (err) {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    // store token first so api.get uses it
    localStorage.setItem("token", userData.token);

    // optimistic set (server response may be minimal)
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // fetch the full profile (includes role) and update storage/state
    api.get("/users/me")
      .then((profile) => {
        localStorage.setItem("user", JSON.stringify(profile));
        setUser(profile);
      })
      .catch(() => {
        // ignore - keep optimistic user
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};