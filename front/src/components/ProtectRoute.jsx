// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectRoute = ({ children }) => {
  const { authUser,getAuthUser } = useAuthStore();
  getAuthUser();
  console.log("auth",authUser);
  if (!authUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectRoute;
