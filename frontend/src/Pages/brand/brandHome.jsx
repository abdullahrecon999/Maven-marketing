import React, { useState } from "react";
import { NavBar } from "../../Components/brandComponents/navbar";
import { Dashboard } from "./dashboard";
import { Footer } from "../../Components/brandComponents/footer";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";

const fetchBrandUser = async () => {
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

const fetchCampaigns = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const fetchInfleuncersListing = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

export function BrandHome() {

  const { data: brandUser, isLoading, isError, isSuccess } = useQuery("brandUser", fetchBrandUser);

  return (
    <div data-theme="cupcake">
      <svg className="absolute top-0 -z-10" width="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" ><path d="M 0,700 C 0,700 0,175 0,175 C 80.23398379970544,172.2395066273932 160.46796759941088,169.47901325478645 210,186 C 259.5320324005891,202.52098674521355 278.3621134020618,238.32345360824743 331,227 C 383.6378865979382,215.67654639175257 470.08357879234177,157.22717231222387 542,134 C 613.9164212076582,110.77282768777613 671.3035714285713,122.76785714285714 719,130 C 766.6964285714287,137.23214285714286 804.7021354933728,139.70139911634755 876,148 C 947.2978645066272,156.29860088365245 1051.887886597938,170.42654639175257 1111,186 C 1170.112113402062,201.57345360824743 1183.746318114875,218.59241531664213 1231,217 C 1278.253681885125,215.40758468335787 1359.1268409425625,195.20379234167893 1440,175 C 1440,175 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="#0693e3" fill-opacity="0.4" class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 350)"></path><path d="M 0,700 C 0,700 0,350 0,350 C 46.21557437407952,319.04068483063327 92.43114874815905,288.0813696612666 148,294 C 203.56885125184095,299.9186303387334 268.4909793814433,342.715206185567 334,359 C 399.5090206185567,375.284793814433 465.60493372606777,365.0578055964654 524,357 C 582.3950662739322,348.9421944035346 633.0892857142858,343.0535714285714 693,339 C 752.9107142857142,334.9464285714286 822.0379234167893,332.7279086892489 884,343 C 945.9620765832107,353.2720913107511 1000.7590206185566,376.034793814433 1058,363 C 1115.2409793814434,349.965206185567 1174.925994108984,301.13291605301913 1239,293 C 1303.074005891016,284.86708394698087 1371.537002945508,317.43354197349043 1440,350 C 1440,350 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="#0693e3" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 350)"></path><path d="M 0,700 C 0,700 0,525 0,525 C 60.17120765832105,494.8225331369661 120.3424153166421,464.64506627393223 184,464 C 247.6575846833579,463.35493372606777 314.8015463917526,492.24226804123714 371,519 C 427.1984536082474,545.7577319587629 472.4513991163476,570.3858615611193 520,563 C 567.5486008836524,555.6141384388807 617.3928571428571,516.2142857142858 689,500 C 760.6071428571429,483.7857142857143 853.9771723122238,490.7569955817379 914,484 C 974.0228276877762,477.2430044182621 1000.6984536082475,456.75773195876286 1058,478 C 1115.3015463917525,499.24226804123714 1203.2290132547864,562.2120765832107 1272,577 C 1340.7709867452136,591.7879234167893 1390.3854933726068,558.3939617083947 1440,525 C 1440,525 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="#0693e3" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 350)"></path></svg>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : isError? (
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-gray-500">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen">
            
            <Dashboard uid={brandUser._id} />
            
          </div>
        )
      }

    </div>
  );
}
