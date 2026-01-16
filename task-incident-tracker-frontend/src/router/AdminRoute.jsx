import { Navigate } from "react-router-dom";
import { getToken } from "../utils/authStorage";
import { isAdmin } from "../utils/authUtils";

export default function AdminRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/my-tasks" replace />;
  }

  return children;
}