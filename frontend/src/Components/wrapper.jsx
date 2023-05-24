import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Footer } from "./brandComponents/footer";

const Wrapper = ({ allowedRoles }) => {
  return(
    
    <div className="flex flex-col">
        <Outlet />
        <Footer />
    </div>
    )
}

export default Wrapper;