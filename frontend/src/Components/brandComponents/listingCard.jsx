// boiler plate for simple component
import React from "react";
import vid from "../../assets/pexels-mehmet-ali-turan-5512609.mp4";
import HoverVideoPlayer from "react-hover-video-player";
import { Tag } from "antd";

export const ListingCard = ({
  avatar,
  name,
  social,
  followers,
  ratings,
  price,
  description,
  banner,
  video,
  onclick,
  status,
}) => {
  const getColor = (platform) => {
    if (platform === "Tiktok") {
      return "text-purple-500";
    } else if (platform === "Youtube") {
      return "text-red-500";
    } else if (platform === "Instagram") {
      return "text-purple-800";
    }
  };

  return (
    <div
      onClick={onclick}
      className="card h-[430px] border flex bg-base-100 hover:shadow-xl rounded-xl max-w-[270px] min-w-[270px]"
    >
      <div className="p-3">
        <div className="flex">
          <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-11 h-11">
              {/* <img src="https://www.rfa.org/english/news/china/warning-01082021091841.html/@@images/2ad7ab11-b78f-44d3-b587-618128d3dfc7.jpeg" /> */}
              <img src={avatar} />
            </div>
          </div>
          <div className="flex-col ml-2">
            <h2 className="font-bold">{name?.slice(0, 10) + "..."}</h2>
            <div className="flex gap-1 items-center w-full">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#03A9F4"
                  d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                ></path>
              </svg> */}

              <p className={"text-xs " + getColor(social)}>{followers}</p>
            </div>
          </div>
          {/* <div className="flex w-1/3 justify-end">
            <div className="flex">
              <p className="text-xs text-yellow-300">3.5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="q0c2dLEp_4LHk~8cW2fATa_8ggStxqyboK5_gr1"
                  x1="9.009"
                  x2="38.092"
                  y1="6.36"
                  y2="45.266"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#ffda1c"></stop>
                  <stop offset="1" stop-color="#feb705"></stop>
                </linearGradient>
                <path
                  fill="url(#q0c2dLEp_4LHk~8cW2fATa_8ggStxqyboK5_gr1)"
                  d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"
                ></path>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex-col align-top">
        {video ? (
          <div className="flex justify-center">
            <HoverVideoPlayer
              className="object-cover overflow-clip h-[280px] w-[270px]"
              videoSrc={vid}
              loadingOverlay={
                <div className="loading-overlay">
                  <div className="loading-spinner" />
                </div>
              }
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              className="object-cover h-[280px] w-[270px]"
              src={banner}
              alt="abc"
            />
          </div>
        )}
      </div>
      <div className="flex bg-slate-100 w-full p-1 justify-between">
        <p className={"text-xs  font-bold w-full " + getColor(social)}>
          {social}
        </p>
        <Tag color={status === true ? "green" : "red"}>
          {status === true ? "Registered" : "Unregistered"}
        </Tag>
      </div>
      <div className="w-full p-1">
        <p className="text-sm line-clamp-2">
          {description?.slice(0, 50) + "..."}
        </p>
      </div>
    </div>
  );
};
