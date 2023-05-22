// react component boilerplate code for navbar
import React, { useState } from "react";

import logo from "../../assets/AppLogo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Checkbox } from "antd";
export function NavBar({ avatar, name, email, role, id, user }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const logout = async () => {
    // const navigate = useNavigate();
    await axios
      .get("http://localhost:3000/admin/logout", { withCredentials: true })
      .then((res) => {
        localStorage.removeItem("user");
        // redirect to login page without navigate
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyDownInfluncer = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      var url = "/marketplace" + "?search=" + event.target.value;
      // Open new tab with search query marketplace page
      if (categories.length !== 0) {
        url = url + "&category=" + categories;
      }
      if (platforms.length !== 0) {
        url += "&platforms=" + platforms;
      }
      navigate(url);
    }
  };

  const handleKeyDownCampaign = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      var url = "/CampaignMarketPlace" + "?search=" + event.target.value;
      // Open new tab with search query marketplace page
      if (categories.length !== 0) {
        url = url + "&category=" + categories;
      }
      if (platforms.length !== 0) {
        url += "&platforms=" + platforms;
      }

      navigate(url);
    }
  };

  const handlePlatforms = (e) => {
    if (!e.target.checked) {
      const index = platforms.indexOf(e.target.value);
      if (index > -1) {
        platforms.splice(index, 1);
      }
    }
    if (e.target.checked) {
      setPlatforms([...platforms, e.target.value]);
    }
    console.log(platforms);
  };
  const handleCategories = (e) => {
    if (!e.target.checked) {
      const index = categories.indexOf(e.target.value);
      if (index > -1) {
        categories.splice(index, 1);
      }
    }
    if (e.target.checked) {
      setCategories([...categories, e.target.value]);
    }
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 " data-theme="cupcake">
      <div className="flex-1 justify-between w-full">
        <div className="flex gap-5 w-full">
          <a className="btn btn-ghost">
            <img className="h-auto w-40" src={logo} alt="Workflow" />
          </a>
          <form class="group relative justify-center items-center hidden lg:flex w-6/12 max-w-sm">
            <div className="dropdown dropdown-end w-full">
              <label tabIndex={0}>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
                <input
                  onKeyDown={
                    role === "brand"
                      ? handleKeyDownInfluncer
                      : handleKeyDownCampaign
                  }
                  class="focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                  type="text"
                  placeholder={
                    role === "influencer"
                      ? "Search Campaigns"
                      : "Search Influencers"
                  }
                />
              </label>

              {role === "influencer" ? null : (
                <>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-full z-50"
                  >
                    <div className="flex-col p-2">
                      <p className="text-sm font-bold mb-2">
                        Trending Platforms
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <div>
                          <div className="flex py-1 px-2 rounded-full border  text-sm items-center pr-3">
                            <img
                              className="w-8 h-auto p-2"
                              src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
                            />
                            <p>
                              Instagram{" "}
                              <Checkbox
                                value="Instagram"
                                className="mr-2"
                                onChange={handlePlatforms}
                              ></Checkbox>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex py-1 px-2 rounded-full border  text-sm items-center pr-3">
                            <img
                              className="w-8 h-auto p-2"
                              src="https://www.vectorlogo.zone/logos/twitter/twitter-official.svg"
                            />
                            <p>
                              Twitter{" "}
                              <Checkbox
                                value="Twitter"
                                className="mr-2"
                                onChange={handlePlatforms}
                              ></Checkbox>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex py-1 px-2 rounded-full border  text-sm items-center pr-3">
                            <img
                              className="w-8 h-auto p-2"
                              src="https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg"
                            />
                            <p>
                              Youtube{" "}
                              <Checkbox
                                value="Youtube"
                                className="mr-2"
                                onChange={handlePlatforms}
                              ></Checkbox>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex py-1 px-2 rounded-full border  text-sm items-center pr-3">
                            <img
                              className="w-8 h-auto p-2"
                              src="https://www.vectorlogo.zone/logos/snapchat/snapchat-icon.svg"
                            />
                            <p>
                              Snapchat{" "}
                              <Checkbox
                                value="Snaphat"
                                className="mr-2"
                                onChange={handlePlatforms}
                              ></Checkbox>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="divider mt-0 mb-0"></div>

                      <p className="text-sm font-bold mb-2">
                        Trending Categories
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <div>
                          <div className="flex py-1 px-4 rounded-full border  text-sm items-center bg-slate-200">
                            <p>
                              <Checkbox
                                value="Food"
                                className="mr-2"
                                onChange={handleCategories}
                              ></Checkbox>
                              Food
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex py-1 px-4 rounded-full border text-sm items-center bg-slate-200">
                            <p>
                              <Checkbox
                                value="Blog"
                                className="mr-2"
                                onChange={handleCategories}
                              ></Checkbox>
                              Blog
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-center items-center py-1 px-4 rounded-full border  text-sm items-center bg-slate-200">
                            <p>
                              <Checkbox
                                value="Influencer Marketing"
                                className="mr-2"
                                onChange={handleCategories}
                              ></Checkbox>
                              Influencer Marketing
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="items-baseline space-x-4 mr-2 hidden lg:flex">
          <Link
            reloadDocument
            to={role === "influencer" ? "/influencerhome" : "/brandhome"}
            className=" hover:text-blue-700 text-grey px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </Link>

          <Link
            to={role === "influencer" ? "/influencerchat" : "/brandchat"}
            href="#"
            className="hover:text-blue-700 text-grey px-3 py-2 rounded-md text-sm font-medium"
          >
            Chat
          </Link>

          <Link
            to={role === "influencer" ? "/CampaignMarketPlace" : "/marketplace"}
            className="hover:text-blue-700 text-grey px-3 py-2 rounded-md text-sm font-medium"
          >
            Marketplace
          </Link>

          {role === "brand" ? (
            <Link
              to="/marketautomation"
              className="hover:text-blue-700 text-grey px-3 py-2 rounded-md text-sm font-medium"
            >
              Market Automation
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex-none hidden lg:flex">
        {/* <div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </label>
        </div> */}

        {/* <div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </label>
        </div> */}

        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>

          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="dropdown dropdown-end ml-1">
          <label tabIndex={0} className=" avatar">
            <div className="avatar online placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <img src={avatar} alt="avatar" />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to={role === "influencer" ? "/SocialProfile" : "/brandprofile"}
                state={{ user: user }}
                className="justify-between"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={
                  role === "influencer"
                    ? "/influencerPayments"
                    : "/brandPayments"
                }
              >
                Payments
              </Link>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="flex-col">
              <div className="flex">
                <div className="avatar online placeholder m-2">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">{name}</div>
                  <div className="text-xs">{email}</div>
                </div>
              </div>
              <div className="divider mt-0 mb-0"></div>

              <ul className="menu menu-compact bg-base-100 w-100 p-1 rounded-box">
                <li>
                  <Link
                    to={
                      role === "influencer" ? "/influencerhome" : "/brandhome"
                    }
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a>Chat</a>
                </li>
                <li>
                  <Link
                    to={role === "influencer" ? "/CampaignMarketPlace" : "#"}
                  >
                    Marketplace
                  </Link>
                </li>
              </ul>
              <div className="divider mt-0 mb-0"></div>

              <ul className="menu menu-compact bg-base-100 w-100 p-1 rounded-box">
                <li>
                  <Link
                    to={role === "influencer" ? "/SocialProfile" : ""}
                    className="justify-between"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => logout()}>Logout</li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
