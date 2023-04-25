import React, { useState } from "react";
import Navbar from "../../Components/MarketAutomationComponents/Navbar";
import BannerImage from "../../images/banner.jpg";
import ProfileImage from "../../images/profile.jpg";
import { ArrowDownward } from "@mui/icons-material";
const FilterModal = () => {
  return (
    <>
      <input type="checkbox" id="FilterModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="FilterModal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const MediaDrawer = () => {
  const [openArroval, setOpenApproval] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

      <div className="p-4 w-80 bg-base-100 text-base-content shadow-xl">
        <h1 className="text-xl font-railway text-gray-800">Filter & Sort</h1>

        <div className="h-full overflow-y-auto mt-2">
          <div className="flex flex-col flex-[0.25]">
            <h1 className="mb-4 text-gray-600 font-semibold">Sort By</h1>
            <ul>
              <li className="flex space-x-3">
                <input type="radio" name="radio-1" checked />
                <h1 className="text-sm font-semibold text-gray-800">
                  New Post
                </h1>
              </li>
              <li className="flex space-x-3">
                <input type="radio" name="radio-1" checked />
                <h1 className="text-sm font-semibold text-gray-800">Later</h1>
              </li>
            </ul>
          </div>
          <hr className="mt-3" />
          <div>
            <h1 className="mb-4 mt-3 text-gray-600 font-semibold">Filter By</h1>
            <ul className=" ">
              <li className="flex flex-col  ">
                <div
                  onClick={() => setOpenApproval(!openArroval)}
                  className="group flex justify-between hover:bg-slate-300 rounded-md px-3 py-2"
                >
                  <h1 className="text-base font-semibold text-gray-500">
                    Approval Status
                  </h1>
                  <ArrowDownward className="invisible group-hover:visible">
                    sdfg
                  </ArrowDownward>
                </div>
                {openArroval && (
                  <div className="">
                    <ul className="px-2 py-1">
                      <li
                        htmlFor="approval"
                        className="flex space-x-3 bg-slate-200 py-2 px-3 rounded-md mb-1 "
                      >
                        <input type="radio" id="approval" name="radio-2" />
                        <label
                          htmlFor="approval"
                          className="text-base font-semibold text-gray-800"
                        >
                          Approved
                        </label>
                      </li>
                      <li className="flex space-x-3 bg-slate-200 py-2 px-3 rounded-md mb-1 ">
                        <input id="pending" type="radio" name="radio-2" />
                        <label
                          htmlFor="pending"
                          className="text-base font-semibold text-gray-800"
                        >
                          Pending Approval
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const MainScreen = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <FilterModal></FilterModal>
        <Navbar></Navbar>
        {/* header */}
        <section className="container relative mx-auto bg-slate-50 border shadow-md h-[50vh]">
          <img
            className="w-full h-[35vh]"
            src={BannerImage}
            alt="because tomatoes are disgusting"
          ></img>
          <div className="bg-white">
            <img
              src={ProfileImage}
              alt="profile "
              className="w-[90px] h-[90px] border-[7px] border-white absolute top-[25vh] left-10"
            ></img>
            <div className="absolute top-[37vh] left-[30vh]">
              <h1 className="text-xl font-bold text-gray-800">
                Brand Page Name
              </h1>
              <p className="text-sm text-gray-500">A short discription</p>
            </div>
          </div>
        </section>
      </div>
      <MediaDrawer></MediaDrawer>
    </div>
  );
};

export default MainScreen;
