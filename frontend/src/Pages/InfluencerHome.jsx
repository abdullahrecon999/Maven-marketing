import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../utils/authProvider";
import LineHeader from "../Components/InfluencerComponents/LineHeader";
import InfluencerTabs from "../Components/InfluencerComponents/InfluencerTabs";

import { Navigation } from "swiper";
import { ListingCard } from "../Components/brandComponents/listingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import CampaignCard from "../Components/InfluencerComponents/CampaignCard";
import { useQuery } from "react-query";
import {
  InfluencerDashboardProvider,
  InfluencerDashboardContext,
} from "../Components/InfluencerComponents/InfluencerDashboardContext";
import InfluencerBidModal from "../Components/InfluencerComponents/InfluencerBidModal";
import InfluencerInviteModal from "../Components/InfluencerComponents/InfluencerInviteModal";
const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const verified = 0;
  const navigate = useNavigate();

  // useEffect(()=>{

  //   const userdata = JSON.parse(localStorage.getItem("user"))
  //   setUser(userdata)

  // })
  const logout = async () => {
    // do axios get to backend for logout
    // then redirect to home page
    await axios
      .get("http://localhost:3000/influencer/logout", { withCredentials: true })
      .then((res) => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["getLimitedCampaigns"],
    () => {
      return axios.get("http://localhost:3000/campaign/campaigns/limit");
    }
  );

  return (
    <div className="flex flex-col space-y-6">
      <InfluencerBidModal></InfluencerBidModal>
      <InfluencerInviteModal></InfluencerInviteModal>
      <LineHeader></LineHeader>

      <div className="flex flex-col flex-1 items-center container mx-12  ">
        <div className="hidden md:grid grid-cols-1 gap-3 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div>
              <div
                className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
                data-theme="corporate"
              >
                <div className="card-body flex-row p-5">
                  <div className="flex-col w-40">
                    <h2 className="card-title">Bid on Campaigns</h2>
                    <p className="py-2 text-sm">
                      {" "}
                      put yourself out there to collaborate with the brands
                    </p>
                    <Link
                      to="/CampaignMarketPlace"
                      className="link link-primary"
                    >
                      View Campaigns
                    </Link>
                  </div>
                  <div className="flex-col w-20">
                    <div className="h-20 w-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="70"
                        height="70"
                        viewBox="0 0 64 64"
                      >
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1"
                          x1="37"
                          x2="37"
                          y1="16.125"
                          y2="22.38"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#6dc7ff"></stop>
                          <stop offset="1" stop-color="#e6abff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1)"
                          d="M42,22H32c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v4 C43,21.552,42.552,22,42,22z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2"
                          x1="39.5"
                          x2="39.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2)"
                          d="M58,36c0-2.967-2.167-5.431-5-5.91v-7.004c0-0.777-0.435-1.468-1.135-1.805 c-0.7-0.335-1.511-0.244-2.119,0.241l-7.996,6.396c-0.03,0.024-0.052,0.055-0.081,0.081H30c-2.757,0-5,2.243-5,5h-2 c-1.103,0-2,0.897-2,2v2c0,1.103,0.897,2,2,2h2c0,2.757,2.243,5,5,5v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6h3.669 c0.029,0.026,0.051,0.057,0.082,0.082l7.995,6.396c0.365,0.292,0.804,0.441,1.247,0.441c0.295,0,0.593-0.066,0.872-0.2 C52.565,50.382,53,49.69,53,48.914V41.91C55.833,41.431,58,38.967,58,36z M23,37v-2h2v2H23z M36,50c0,1.103-0.897,2-2,2 s-2-0.897-2-2v-6h4V50z M30,42c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3h11v12h-3H30z M50.996,48.916L43,42.518V29.479l4-3.197 V36h2V24.684l2-1.598l0.002,25.834C51.002,48.92,51,48.919,50.996,48.916z M53,39.858v-7.716c1.72,0.447,3,2,3,3.858 S54.72,39.411,53,39.858z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3"
                          x1="31"
                          x2="31"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3)"
                          d="M29,34v2h2v-2h2v-2h-2C29.897,32,29,32.897,29,34z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4"
                          x1="27.5"
                          x2="27.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4)"
                          d="M8,40V15c0-1.654,1.346-3,3-3h33c1.654,0,3,1.346,3,3v4h2v-4c0-2.757-2.243-5-5-5H11 c-2.757,0-5,2.243-5,5v25c0,2.757,2.243,5,5,5h12v-2H11C9.346,43,8,41.654,8,40z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5)"
                          d="M12 16H26V18H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6)"
                          d="M12 20H26V22H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7"
                          x1="17"
                          x2="17"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7)"
                          d="M12 24H22V26H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8"
                          x1="16"
                          x2="16"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8)"
                          d="M12 28H20V30H12z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
        <div href="#">
            <div className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl" data-theme="corporate">
              <div className="card-body flex-row p-5">
                <div className="flex-col w-40">
                  <h2 className="card-title">Find Campaigns</h2>
                  <p className="py-2 text-sm">Visit the market place to find the campagins</p>
                  <a className="link link-primary">View</a>
                </div>
                <div className="flex-col w-20">
                  <div className="h-20 w-20">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="70" height="70"
                      viewBox="0 0 64 64">
                      <linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1" x1="37" x2="37" y1="16.125" y2="22.38" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1)" d="M42,22H32c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v4 C43,21.552,42.552,22,42,22z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2" x1="39.5" x2="39.5" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2)" d="M58,36c0-2.967-2.167-5.431-5-5.91v-7.004c0-0.777-0.435-1.468-1.135-1.805 c-0.7-0.335-1.511-0.244-2.119,0.241l-7.996,6.396c-0.03,0.024-0.052,0.055-0.081,0.081H30c-2.757,0-5,2.243-5,5h-2 c-1.103,0-2,0.897-2,2v2c0,1.103,0.897,2,2,2h2c0,2.757,2.243,5,5,5v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6h3.669 c0.029,0.026,0.051,0.057,0.082,0.082l7.995,6.396c0.365,0.292,0.804,0.441,1.247,0.441c0.295,0,0.593-0.066,0.872-0.2 C52.565,50.382,53,49.69,53,48.914V41.91C55.833,41.431,58,38.967,58,36z M23,37v-2h2v2H23z M36,50c0,1.103-0.897,2-2,2 s-2-0.897-2-2v-6h4V50z M30,42c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3h11v12h-3H30z M50.996,48.916L43,42.518V29.479l4-3.197 V36h2V24.684l2-1.598l0.002,25.834C51.002,48.92,51,48.919,50.996,48.916z M53,39.858v-7.716c1.72,0.447,3,2,3,3.858 S54.72,39.411,53,39.858z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3" x1="31" x2="31" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3)" d="M29,34v2h2v-2h2v-2h-2C29.897,32,29,32.897,29,34z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4" x1="27.5" x2="27.5" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4)" d="M8,40V15c0-1.654,1.346-3,3-3h33c1.654,0,3,1.346,3,3v4h2v-4c0-2.757-2.243-5-5-5H11 c-2.757,0-5,2.243-5,5v25c0,2.757,2.243,5,5,5h12v-2H11C9.346,43,8,41.654,8,40z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5" x1="19" x2="19" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5)" d="M12 16H26V18H12z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6" x1="19" x2="19" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6)" d="M12 20H26V22H12z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7" x1="17" x2="17" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7)" d="M12 24H22V26H12z"></path><linearGradient id="Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8" x1="16" x2="16" y1="10" y2="54.388" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8)" d="M12 28H20V30H12z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

          <div>
            <div href="#">
              <div
                className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
                data-theme="corporate"
              >
                <div className="card-body flex-row p-5">
                  <div className="flex-col w-40">
                    <h2 className="card-title ">Payouts</h2>
                    <p className="py-2 text-sm text-gray-500">
                      Your available payouts are displayed here
                    </p>
                    <a className="link link-primary">view all payouts</a>
                  </div>
                  <div className="flex-col w-20">
                    <div className="h-20 w-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="70"
                        height="70"
                        viewBox="0 0 64 64"
                      >
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1"
                          x1="37"
                          x2="37"
                          y1="16.125"
                          y2="22.38"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#6dc7ff"></stop>
                          <stop offset="1" stop-color="#e6abff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1)"
                          d="M42,22H32c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v4 C43,21.552,42.552,22,42,22z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2"
                          x1="39.5"
                          x2="39.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2)"
                          d="M58,36c0-2.967-2.167-5.431-5-5.91v-7.004c0-0.777-0.435-1.468-1.135-1.805 c-0.7-0.335-1.511-0.244-2.119,0.241l-7.996,6.396c-0.03,0.024-0.052,0.055-0.081,0.081H30c-2.757,0-5,2.243-5,5h-2 c-1.103,0-2,0.897-2,2v2c0,1.103,0.897,2,2,2h2c0,2.757,2.243,5,5,5v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6h3.669 c0.029,0.026,0.051,0.057,0.082,0.082l7.995,6.396c0.365,0.292,0.804,0.441,1.247,0.441c0.295,0,0.593-0.066,0.872-0.2 C52.565,50.382,53,49.69,53,48.914V41.91C55.833,41.431,58,38.967,58,36z M23,37v-2h2v2H23z M36,50c0,1.103-0.897,2-2,2 s-2-0.897-2-2v-6h4V50z M30,42c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3h11v12h-3H30z M50.996,48.916L43,42.518V29.479l4-3.197 V36h2V24.684l2-1.598l0.002,25.834C51.002,48.92,51,48.919,50.996,48.916z M53,39.858v-7.716c1.72,0.447,3,2,3,3.858 S54.72,39.411,53,39.858z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3"
                          x1="31"
                          x2="31"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3)"
                          d="M29,34v2h2v-2h2v-2h-2C29.897,32,29,32.897,29,34z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4"
                          x1="27.5"
                          x2="27.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4)"
                          d="M8,40V15c0-1.654,1.346-3,3-3h33c1.654,0,3,1.346,3,3v4h2v-4c0-2.757-2.243-5-5-5H11 c-2.757,0-5,2.243-5,5v25c0,2.757,2.243,5,5,5h12v-2H11C9.346,43,8,41.654,8,40z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5)"
                          d="M12 16H26V18H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6)"
                          d="M12 20H26V22H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7"
                          x1="17"
                          x2="17"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7)"
                          d="M12 24H22V26H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8"
                          x1="16"
                          x2="16"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8)"
                          d="M12 28H20V30H12z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div href="#">
              <div
                className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
                data-theme="corporate"
              >
                <div className="card-body flex-row p-5">
                  <div className="flex-col w-40">
                    <h2 className="card-title">Current work</h2>
                    <p className="py-2 text-sm">
                      Your current work is displayed here
                    </p>
                    <a className="link link-primary self-end">view</a>
                  </div>
                  <div className="flex-col w-20">
                    <div className="h-20 w-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="70"
                        height="70"
                        viewBox="0 0 64 64"
                      >
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1"
                          x1="37"
                          x2="37"
                          y1="16.125"
                          y2="22.38"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#6dc7ff"></stop>
                          <stop offset="1" stop-color="#e6abff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1)"
                          d="M42,22H32c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v4 C43,21.552,42.552,22,42,22z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2"
                          x1="39.5"
                          x2="39.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2)"
                          d="M58,36c0-2.967-2.167-5.431-5-5.91v-7.004c0-0.777-0.435-1.468-1.135-1.805 c-0.7-0.335-1.511-0.244-2.119,0.241l-7.996,6.396c-0.03,0.024-0.052,0.055-0.081,0.081H30c-2.757,0-5,2.243-5,5h-2 c-1.103,0-2,0.897-2,2v2c0,1.103,0.897,2,2,2h2c0,2.757,2.243,5,5,5v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6h3.669 c0.029,0.026,0.051,0.057,0.082,0.082l7.995,6.396c0.365,0.292,0.804,0.441,1.247,0.441c0.295,0,0.593-0.066,0.872-0.2 C52.565,50.382,53,49.69,53,48.914V41.91C55.833,41.431,58,38.967,58,36z M23,37v-2h2v2H23z M36,50c0,1.103-0.897,2-2,2 s-2-0.897-2-2v-6h4V50z M30,42c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3h11v12h-3H30z M50.996,48.916L43,42.518V29.479l4-3.197 V36h2V24.684l2-1.598l0.002,25.834C51.002,48.92,51,48.919,50.996,48.916z M53,39.858v-7.716c1.72,0.447,3,2,3,3.858 S54.72,39.411,53,39.858z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3"
                          x1="31"
                          x2="31"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3)"
                          d="M29,34v2h2v-2h2v-2h-2C29.897,32,29,32.897,29,34z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4"
                          x1="27.5"
                          x2="27.5"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4)"
                          d="M8,40V15c0-1.654,1.346-3,3-3h33c1.654,0,3,1.346,3,3v4h2v-4c0-2.757-2.243-5-5-5H11 c-2.757,0-5,2.243-5,5v25c0,2.757,2.243,5,5,5h12v-2H11C9.346,43,8,41.654,8,40z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5)"
                          d="M12 16H26V18H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6"
                          x1="19"
                          x2="19"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6)"
                          d="M12 20H26V22H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7"
                          x1="17"
                          x2="17"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7)"
                          d="M12 24H22V26H12z"
                        ></path>
                        <linearGradient
                          id="Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8"
                          x1="16"
                          x2="16"
                          y1="10"
                          y2="54.388"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8)"
                          d="M12 28H20V30H12z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InfluencerTabs></InfluencerTabs>

        {/* <div className="flex justify-between py-5 min-w-xl">
          <div
            className="flex-col card-body p-4 rounded-lg h-auto bg-base-100 w-full"
            data-theme="corporate"
          >
            <div>
              <h1 className="font-bold">Campaigns That you might like</h1>
              <div className="divider m-0"></div>
            </div>

            {data !== "undefined" ? (
              <div className="flex w-full h-[450px]">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={250}
                  centeredSlides={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper w-full"
                >
                  {data?.data?.data.map((item) => {
                    return (
                      <SwiperSlide>
                        <CampaignCard
                          avatar={item?.brand?.photo}
                          brandName={item?.brand?.name}
                          title={item?.title}
                          description={item?.description}
                          banner={item?.bannerImg}
                          id={item["_id"]}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <div
                className="flex flex-full justify-center items-center h-[450px]"
                data-theme="corporate"
              >
                <h1 className="font-bold">Loading campaigns</h1>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

const InfluencerHome = () => {
  return (
    <InfluencerDashboardProvider>
      <Home></Home>
    </InfluencerDashboardProvider>
  );
};

export default InfluencerHome;
