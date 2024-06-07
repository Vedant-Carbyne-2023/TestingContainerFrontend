import React from "react";
import { Navigate, Route } from "react-router-dom";

const AdminPrivateRoute = ({ isAuthenticated, userRole, children }) => {
  isAuthenticated = localStorage.getItem("isAuthenticated");
  userRole = localStorage.getItem("role");
  if (isAuthenticated && (userRole === "SuperUser")) {
    return children;
  } else {
    console.log(isAuthenticated);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/login" replace />;
  }
};

const UserPrivateRoute = ({ isAuthenticated, userRole, children }) => {
  isAuthenticated = localStorage.getItem("isAuthenticated");
  userRole = localStorage.getItem("role");
  if (
    isAuthenticated &&
    userRole != null &&
    userRole != undefined
  ) {
    return children;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/login" replace />;
  }
};

export { AdminPrivateRoute, UserPrivateRoute };
