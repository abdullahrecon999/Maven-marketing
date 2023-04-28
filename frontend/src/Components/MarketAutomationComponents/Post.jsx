import React from "react";
import ProfileImage from "../../images/profile.jpg";
import BannerImage from "../../images/banner.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostSideComments from "./PostSideComments";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinkIcon from "@mui/icons-material/Link";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";
const Post = () => {
  return (
    <div className="flex w-full justify-center md:w-[80%] space-x-2">
      <div className=" bg-white border rounded-md   ">
        <div className="px-2 py-4">
          <div className="flex items-center justify-between pb-3 ">
            <label className="text-xxs border border-orange-300 bg-yellow-200 text-orange-300  px-1 text-center rounded-md">
              Status
            </label>

            <div className="dropdown dropdown-bottom dropdown-end">
              <div className="tooltip " data-tip="More Options">
                <label
                  className="hover:text-blue rounded-md bg-slate-50"
                  tabIndex={0}
                >
                  <MoreHorizIcon></MoreHorizIcon>
                </label>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <label>
                    <RefreshIcon /> Repost
                  </label>
                </li>
                <li>
                  <label>
                    <LinkIcon></LinkIcon> copy link to share
                  </label>
                </li>
                <li>
                  <label>
                    <LinkIcon></LinkIcon> Edit and repost
                  </label>
                </li>
                <li>
                  <label>
                    <Delete /> Delete Post
                  </label>
                </li>
                <li>
                  <hr></hr>
                </li>
                <li>
                  <label>
                    <ArchiveIcon /> Archive post
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <div className="flex w-[100%] mt-2 px-2">
            <img src={ProfileImage} className="w-10 h-10"></img>
            <div className="px-2">
              <h4 className="text-xs font-semibold">brand name</h4>
              <p className="text-xxs">date</p>
            </div>
          </div>
          <div>
            <div className="text-xs p-2">
              Discover what fruits and veggies are linked to increased
              creativity. Grab your favorite Jusco smoothie & get inspired.
            </div>
            <div className="w-full">
              <img className="w-full" src={BannerImage} alt="" />
            </div>
          </div>
        </div>
        {/* <div className="flex">
        <></>
      </div> */}
      </div>
      <PostSideComments></PostSideComments>
    </div>
  );
};

export default Post;
