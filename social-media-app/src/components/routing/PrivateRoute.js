import React , {useState, useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user, ...props }) => {
    return user ? <Outlet {...props} /> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;
