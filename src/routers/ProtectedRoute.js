// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("Token");
  return token ? <Outlet /> : <Navigate to="/auth-signin" replace />;
};

export default ProtectedRoute;
