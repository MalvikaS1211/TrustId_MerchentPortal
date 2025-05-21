// components/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = sessionStorage.getItem("Token");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
