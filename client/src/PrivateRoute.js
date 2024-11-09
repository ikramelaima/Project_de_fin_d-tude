import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../src/context/authContext";

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth();

  return user ? <Route {...rest} element={element} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
