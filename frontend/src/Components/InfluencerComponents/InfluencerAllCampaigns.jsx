import React, { useState, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import CampaignCard from "./CampaignCard";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

import Search from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import { Modal, Spin, Checkbox } from "antd";
var country_list = [
  "Any",
  "Afghanistan",
  "Albania",
  "Algeria",

  "Argentina",
  "Armenia",

  "Australia",
  "Austria",

  "Bangladesh",

  "Brazil",

  "China",

  "Egypt",

  "France",

  "Germany",

  "India",

  "Iran",
  "Iraq",
  "Ireland",
  "Pakistan",
  "New Zealand",

  "Russia",

  "Saudi Arabia",

  "Singapore",

  "South Korea",
  "Spain",

  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
];

const platforms = [
  "Instagram",
  "Youtube",
  "Tiktok",
  "Facebook",
  "Twitter",
  "Snapchat",
  "Linkedin",
  "Pinterest",
  "Any",
];

const categories = [
  "Influencer Marketing",
  "Email Marketing",
  "Blog Writing",
  "Photography",
  "Design",
  "Audio",
  "Any",
];

const tags = [
  "Entertainment",
  "Technology",
  "Pets",
  "Auto",
  "Sports",
  "Fashion",
  "Health",
  "Business",
  "Comedy",
  "Finance",
  "Food",
  "Art",
  "Diy",
  "Nature",
  "Beauty",
  "Family",
  "Gaming",
  "Music",
  "Travel",
  "Photography",
  "Education",
  "News",
  "Movies",
  "Books",
  "Magazines",
  "Science",
];
const SortModel = ({ onClose }) => {
  return (
    <div className="z-10  absolute top-8 left-40  border  rounded-lg p-1  w-40 md:top-9 md:left-44">
      <div className="flex justify-end">
        <CloseIcon
          onClick={() => onClose()}
          className="text-base text-grey hover:text-black"
        />
      </div>
      <hr />
      <div className="flex justify-between  rounded-lg p-1 mt-1 hover:bg-gray-200">
        <h1 className="text-sm font-railway text-gray-800">Date</h1>
        <KeyboardDoubleArrowUpIcon className="text-sm font-railway text-gray-800"></KeyboardDoubleArrowUpIcon>
      </div>
    </div>
  );
};
const InfluencerAllCampaigns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get("search");
  const [openSort, setOpenSort] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, SetSelectedCountries] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenSort = () => {
    setOpenSort(true);
    console.log("clicked");
    console.log(openSort);
  };

  const fetchCampaigns = async () => {
    console.log(
      "these are the search params",
      decodeURIComponent(searchParams.get("platforms"))
    );
    const res = await fetch(
      "http://localhost:3000/campaign/allcampaigns?" +
        decodeURIComponent(
          searchParams +
            "&platforms=" +
            platform +
            "&category=" +
            categoriesList +
            "&country=" +
            countries
        )
    );
    return res.json();
  };

  const {
    data: campaign,
    isLoading,
    isSuccess,
    isRefetching,
    refetch,
    isError,
  } = useQuery(["campaign", search], fetchCampaigns);

  // const { isLoading, data: campaigns, isError, isSuccess, status } = useQuery(["getAllCampaigns"],
  //   () => {
  //     return axios.get("http://localhost:3000/campaign/campaigns",
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true,
  //       })
  //   },
  //   { refetchInterval: 20000 }
  // )

  // useEffect(() => {
  //   if (status === "success" && !isSearch) {
  //     setData(campaigns.data.data)
  //   }
  // }, [campaigns, status])

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log(data);
    setIsSearch(true);
    if (data != null) {
      const filtered = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.brand.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.country?.join("").toLowerCase().includes(query.toLowerCase()) ||
          item.language?.join("").toLowerCase().includes(query.toLowerCase()) ||
          item.platform?.join("").toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log("filtered", filtered);
      setData(filtered);
    }
  };

  const handleCloseSort = () => {
    setOpenSort(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="flex justify-center item-center h-[60vh]">
          <Spin></Spin>
        </div>
      </div>
    );
  }

  const onChangeCategories = (checkedValues) => {
    setCategoriesList(checkedValues);
    console.log(categoriesList);
  };

  const onChangePlatforms = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setPlatform(checkedValues);
  };

  const onChangeCountries = (checkedValues) => {
    SetSelectedCountries(checkedValues);
  };

  if (isError) {
    return (
      <div className="text-2xl h-[80vh] font-railway flex flex-col justify-center items-center">
        <h1 className="text-xxl font-railway text-black md:text-3xl">
          Oppss! Something went Wrong
        </h1>
        <p className="text-base text-grey md:text-xl">
          Please check your internet connect or try again later
        </p>
      </div>
    );
  }
  if (isRefetching) {
    return (
      <div className="h-[85vh] flex justify-center items-center">
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <>
      <Modal
        title={
          <p className="text-2xl font-bold border-b-2 mb-5 pb-2">Filter</p>
        }
        footer={
          <div className="flex justify-between">
            <div
              onClick={() => {
                setPlatform([]);
                setCategoriesList([]);
              }}
              className="btn btn-sm btn-outline btn-warning"
            >
              Reset Filters
            </div>
            <div
              onClick={() => {
                refetch();
              }}
              // onClick={() => {
              //   setPlatform([]);
              //   SetSelectedCountries([]);
              //   setCategoriesList([]);
              // }}
              className="btn btn-sm btn-primary"
            >
              Search
            </div>
          </div>
        }
        centered
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="flex-col overflow-y-auto min-h-96 p-1">
          <div>
            <h1 className="text-xl font-bold mb-3">Categories</h1>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              value={categoriesList}
              onChange={onChangeCategories}
            >
              <div className="grid grid-cols-3 w-full">
                {[...tags, ...categories].map((category, index) => {
                  return (
                    <Checkbox
                      style={{ marginLeft: 8 }}
                      key={index}
                      value={category}
                    >
                      {category}
                    </Checkbox>
                  );
                })}
              </div>
            </Checkbox.Group>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold mb-3">Platforms</h1>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChangePlatforms}
              value={platform}
            >
              <div className="grid grid-cols-3 w-full">
                {platforms.map((category, index) => {
                  return (
                    <Checkbox
                      style={{ marginLeft: 8 }}
                      key={index}
                      value={category}
                    >
                      {category}
                    </Checkbox>
                  );
                })}
              </div>
            </Checkbox.Group>

            <div className="divider divider-vertical "></div>
            <h1 className="text-xl font-bold mb-3">Countries</h1>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChangeCountries}
              value={countries}
            >
              <div className="grid grid-cols-3 w-full">
                {country_list.map((category, index) => {
                  return (
                    <Checkbox
                      style={{ marginLeft: 8 }}
                      key={index}
                      value={category}
                    >
                      {category}
                    </Checkbox>
                  );
                })}
              </div>
            </Checkbox.Group>

            <div className="h-5"></div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col mx-7 my-5 ">
        <div className="flex flex-col  space-y-4 mt-4 px-1 md:mt-6 md:px-2">
          <div className="flex justify-space-between items-center gap-2">
            <div
              onClick={() => {
                setPlatform([]);
                setCategoriesList([]);
                SetSelectedCountries([]);
                refetch();
              }}
              className="flex gap-2 items-center border border-slate-200 hover:shadow-lg btn btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path d="M 12 3 C 9.263544 3 6.8151574 4.2316704 5.1660156 6.1660156 L 3 4 L 3 10 L 9 10 L 6.5917969 7.5917969 C 7.8747922 6.0167955 9.8149031 5 12 5 C 15.859 5 19 8.14 19 12 L 21 12 C 21 7.038 16.963 3 12 3 z M 3 12 C 3 16.963 7.037 21 12 21 C 14.736456 21 17.184843 19.76833 18.833984 17.833984 L 21 20 L 21 14 L 15 14 L 17.408203 16.408203 C 16.125208 17.983204 14.185097 19 12 19 C 8.141 19 5 15.859 5 12 L 3 12 z"></path>
              </svg>
              <p className="text-sm">Refresh</p>
            </div>
            <div
              onClick={showModal}
              className="flex gap-2 items-center border border-slate-200 hover:shadow-lg btn btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 50 50"
              >
                <path d="M 3.8125 2 C 3.335938 2.089844 2.992188 2.511719 3 3 L 3 6 C 3.003906 6.257813 3.101563 6.503906 3.28125 6.6875 L 19 23.375 L 19 41 C 19.007813 41.347656 19.199219 41.667969 19.5 41.84375 L 29.5 47.84375 C 29.804688 48.019531 30.183594 48.023438 30.492188 47.847656 C 30.796875 47.675781 30.992188 47.351563 31 47 L 31 23.375 L 46.5625 6.84375 C 46.574219 6.832031 46.582031 6.824219 46.59375 6.8125 L 46.71875 6.6875 C 46.765625 6.640625 46.808594 6.585938 46.84375 6.53125 C 46.867188 6.511719 46.886719 6.492188 46.90625 6.46875 C 46.964844 6.339844 46.996094 6.203125 47 6.0625 C 47 6.042969 47 6.019531 47 6 C 47.003906 5.949219 47.003906 5.894531 47 5.84375 L 47 3 C 47 2.449219 46.550781 2 46 2 L 4 2 C 3.96875 2 3.9375 2 3.90625 2 C 3.875 2 3.84375 2 3.8125 2 Z M 5 4 L 45 4 L 45 5.625 L 29.5625 22 L 20.4375 22 L 5 5.625 Z M 21 24 L 29 24 L 29 45.25 L 21 40.46875 Z"></path>
              </svg>
              <p className="text-sm">Filter</p>
            </div>

            {/* <div className="flex gap-2 items-center border border-slate-200 hover:shadow-lg btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path d="M16 11H18V19H16zM16 7H18V9H16zM16 3H18V5H16zM6 5H8V13H6zM6 15H8V17H6zM6 19H8V21H6z"></path>
                <path d="M7 2L12 7 2 7zM17 22L22 17 12 17z"></path>
              </svg>
              <Dropdown
                onOpenChange={handleOpenChange}
                open={openMenu}
                menu={{
                  items,
                }}
              >
                <p onClick={(e) => e.preventDefault()} className="text-sm">
                  Sort
                </p>
              </Dropdown>
            </div> */}

            <div className="divider divider-horizontal m-0"></div>

            <div className="flex mt-3 pb-3 max-w-5xl gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
              {
                // If categoriesList is empty, show all else show the categories
                categoriesList.length === 0 ? (
                  <div className="flex gap-2 bg-green-100 items-center border rounded-xl border-slate-200 hover:shadow-lg btn-sm">
                    <p className="text-sm">Showing All Categories</p>
                  </div>
                ) : (
                  categoriesList.map((category) => (
                    <div className="flex gap-2 items-center border rounded-xl border-slate-200 hover:shadow-lg btn-sm">
                      <p className="text-sm">{category}</p>
                    </div>
                  ))
                )
              }
            </div>
          </div>
          <h1 className="text-gray-800 font-semibold text-base md:text-xl">
            All Campaigns
          </h1>
          {data?.length === 0 ? (
            <div className="flex flex-col justify-center items-center my-5 ">
              <h1 className="text-3xl font-railway text-grey">
                no result found
              </h1>
              <button
                onClick={() => {
                  setIsSearch(false);
                }}
                classaName="font-railway px-3 py-5 border rounded-full"
              >
                View More
              </button>
            </div>
          ) : (
            <div className=" flex flex-wrap gap-2 justify-center md:grid   md:grid-cols-6 md:gap-3  ">
              {/* <CampaignCard></CampaignCard> */}
              {campaign?.data?.data?.docs?.length === 0 ? (
                <div className="h-[60vh] flex justify-center items-center">
                  <h1>No result found</h1>
                </div>
              ) : (
                campaign?.data?.docs?.map((campaign) => {
                  if (campaign?.status === "live") {
                    return (
                      <CampaignCard
                        avatar={campaign?.brand?.photo}
                        title={campaign?.title}
                        brandName={campaign?.brand?.name}
                        banner={campaign?.bannerImg}
                        description={campaign?.description}
                        id={campaign["_id"]}
                        platforms={campaign?.platform}
                      ></CampaignCard>
                    );
                  }
                })
              )}
            </div>
          )}
          <hr></hr>
          <div className="flex justify-center p-5">
            <Pagination
              count={campaign?.data?.totalPages}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerAllCampaigns;
