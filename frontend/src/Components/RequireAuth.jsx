import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/authProvider";
import ErrorLogin from "../Pages/errorPages/notLoggedIn";
import { NavBar } from "./brandComponents/navbar";
import { Footer } from "./brandComponents/footer";
import { useQuery } from "react-query";

const fetchUser = async () => {
  // check if user exixts in local storage
  if (localStorage.getItem("user")) {
    console.log("user exists in local storage")
    return JSON.parse(localStorage.getItem("user"));
  } else {
    // fetch user from server
    const res = await fetch("http://localhost:3000/users/user", { credentials: "include" });
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
};

const RequireAuth = ({ allowedRoles }) => {
  // const { user } = useContext(AuthContext);
  // const {loading} = useContext(AuthContext);
  const location = useLocation();
  const { data: user, isLoading, isError, isSuccess } = useQuery("brandUser", fetchUser);

  // const user = JSON.parse(localStorage.getItem('user') || null);
  
  //console.log("user2 ", localStorage.getItem('user'))

  return(
    allowedRoles.includes(user?.role)
        ? (
            <div>
              <NavBar avatar={user.photo} name={user.name} email={user.email} />
              <Outlet />
              <Footer />
            </div>
          )
        : user 
         ? <Navigate to="/unauthorized" state={{ from: location}} replace />
         : <ErrorLogin />
  )
}

export default RequireAuth;