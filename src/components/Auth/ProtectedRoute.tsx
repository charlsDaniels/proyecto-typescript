import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userIsAuthenticated } = useAuth();

  if (!userIsAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
