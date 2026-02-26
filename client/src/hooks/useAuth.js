import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    user: context.user,
    login: context.login,
    logout: context.logout,
    loading: context.loading,
    isAuthenticated: !!context.user
  };
}