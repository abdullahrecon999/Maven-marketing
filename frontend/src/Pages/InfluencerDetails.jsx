import React, { useEffect, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import NestedList from "../Components/AdminDashboardList";
import AdminNavbar from "../Components/AdminNavbar";
import ProfileImage from "../Components/ProfileImage";

import uImage from "../images/profile.jpg";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import DetailBox from "../Components/DetailBox";
import { Spin, Tag, Modal, Button } from "antd";
const Profile = ({ id }) => {
  const [state, setState] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClickActivate = async () => {
    // send a requests to activate
    axios.post("http://localhost:3000/admin/activateProfile/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setState(false);
    refetch();
    window.location.reload();
  };
  const handleClickdeactivate = () => {
    // send a requests to deactivate
    axios.post("http://localhost:3000/admin/deactivateProfile/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setState(true);
    refetch();
    window.location.reload();
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const url = "http://localhost:3000/admin/influencer/" + id;

  const getData = async () => {
    return await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  };

  const { isLoading, data, isError, isSuccess, refetch, isRefetching } =
    useQuery("data", getData);
  if (isRefetching) {
    <div className="w-[900px] flex items-center justify-center">
      <Spin></Spin>
    </div>;
  }
  if (isLoading) {
    <div className="w-[900px] flex items-center justify-center">
      <Spin></Spin>
    </div>;
  }
  return (
    <div className="w-[400px] md:w-[900px] px-12 py-8">
      <Modal open={open} onCancel={handleCancel} title="Deactivate Profile">
        <div>
          <h1 className="text-xl text-orange-500">
            Are you sure you want to deactivate the profile
          </h1>
        </div>
      </Modal>
      {console.log(data?.data?.data)}
      {data?.data?.data?.role === "influencer" ? (
        <>
          <h1 className=" text-xl font-semibold p">Influencer details page</h1>
          <div className="grid grid-cols-4 border gap-3  rounded p-4">
            <h1 className=" text-xl font-semibold col-span-4">
              Personal Details
            </h1>
            <div className="flex gap-2 col-span-2">
              <img
                className=" border rounded-full max-h-[80px] max-w-[80px] md:h-[270px] md:w-[270px]"
                src={data.data.data?.photo}
                alt={uImage}
              />
              <h1 className="text-gray-800  text-base">
                {" "}
                Name:{" "}
                <span className=" text-gray-800 text-xl font-semibold">
                  {data.data.data?.name}
                </span>
              </h1>
            </div>

            <div className="flex flex-col ">
              <h1 className=" text-lg text-gray-800 font-semibold">Country</h1>
              <div>
                <Tag>{data?.data?.data?.country}</Tag>
              </div>
              {/* <DetailBox data={data?.data?.data?.country[0]} /> */}
            </div>
            <div className="flex flex-col">
              <h1 className=" text-lg text-gray-800 font-semibold">
                Languages
              </h1>
              <div className="flex flex-wrap w-[500px]">
                {data?.data?.data?.language.map((items) => {
                  return <Tag>{items}</Tag>;
                })}
              </div>
            </div>

            <div className="space-y-2 col-span-4">
              <h1 className=" text-lg text-gray-800 font-semibold">
                Description
              </h1>
              <p className="text-sm text-grey">
                {data?.data?.data?.description}
              </p>
            </div>
            <div>
              <h1 className=" text-lg text-gray-800 font-semibold">
                Profile Status
              </h1>
              <div>
                <Tag
                  color={
                    data?.data?.data?.profileActive === 1 ? "green" : "red"
                  }
                >
                  {data?.data?.data?.profileActive === 1
                    ? "Active"
                    : "Not Active"}
                </Tag>
              </div>
              {/* <p className=" text-base text-blue">
                {data?.data?.data?.profileActive === 1
                  ? "Active"
                  : "Not Active"}
              </p> */}
            </div>
            <div>
              <div className="flex flex-col space-y-3">
                <div>
                  <h1 className=" text-lg text-gray-800 font-semibold">
                    Platforms
                  </h1>
                  {data?.data?.data?.platforms.map((items) => {
                    const color =
                      items === "Any"
                        ? "volcano"
                        : ["linkedIn", "Twitter", "Facebook"].includes(items)
                        ? "blue"
                        : "purple";
                    return <Tag color={color}>{items}</Tag>;
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-2 ">
              <h1 className=" text-lg text-gray-800 font-semibold">
                View Profile
              </h1>
              <a href={data?.data?.data?.url} className="link text-blue">
                View
              </a>
            </div>
            {data?.data?.data?.profileActive === 0 ? (
              <Button
                onClick={handleClickActivate}
                className="bg-blue text-white"
                variant="contained"
              >
                Activate profile
              </Button>
            ) : (
              <Button
                onClick={handleClickdeactivate}
                className="bg-blue text-white"
                variant="contained"
              >
                Deactivate profile
              </Button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
const InfluencerDetails = () => {
  let { id } = useParams();
  console.log(id);

  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <div className="flex">
        <div className="bg-blue flex   duration-100md:w-[300px] md:h-[100vh] px-4 ">
          <NestedList></NestedList>
        </div>
        <div>
          <Suspense fallback={<div> loading</div>}>
            <Profile id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetails;
