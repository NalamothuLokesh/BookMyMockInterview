import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // if logged in → block access to public pages
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}