import React from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({
  avatar,
  brandName,
  title,
  description,
  banner,
  id,
  platforms = [],
}) => {
  const navigate = useNavigate();
  const openCampaign = () => {
    console.log("HERE AT ONEN CAMPAIGN");
    navigate("/campaigndetails", {
      state: {
        id: id,
      },
    });
  };

  return (
    <div
      onClick={() => {
        openCampaign();
      }}
      className="card h-[320px] border flex bg-base-100 hover:shadow-xl rounded-xl w-[200px]"
    >
      <div className="p-3">
        <div className="flex">
          {/* <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-11 h-11">
              <img src={avatar} />
            </div>
          </div> */}
          <div className="flex-col ml-2">
            <h3 className="font-semibold text-sm text-gray-800">
              {title?.slice(0, 20) + "..."}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex-col align-top w-full">
        <div className="flex justify-center">
          <img
            className="object-cover h-[150px] w-full"
            src={banner}
            alt="abc"
          />
        </div>
      </div>
      <div className="flex bg-slate-100 w-full p-1 justify-between">
        <div>
          <p className="text-xs text-cyan-500 font-bold w-full">Plaforms</p>
          <div className="flex">
            <Tag color="blue">{platforms[0]}</Tag>
            {platforms.length - 1 <= 0 ? null : (
              <Tag color="blue">+{platforms.length - 1}</Tag>
            )}
          </div>
        </div>
      </div>
      <div className="w-full p-1">
        <p className="text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
export default CampaignCard;
