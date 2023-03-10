import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/authProvider";
import ErrorLogin from "../Pages/errorPages/notLoggedIn";

const RequireAuth = ({ allowedRoles }) => {
  // const { user } = useContext(AuthContext);
  // const {loading} = useContext(AuthContext);
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || null);
  
  //console.log("user2 ", localStorage.getItem('user'))

  return(
    allowedRoles.includes(user?.role)
        ? <Outlet />
        : user 
         ? <Navigate to="/unauthorized" state={{ from: location}} replace />
         : <ErrorLogin />
  )
}

export default RequireAuth;