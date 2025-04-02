// ProtectedRoute.js
import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Or your auth method

const AdminRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminRoute;