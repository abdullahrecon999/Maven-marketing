import React, { useState, useContext } from "react";
import Navbar from "../../Components/MarketAutomationComponents/Navbar";
import BannerImage from "../../images/banner.jpg";
import ProfileImage from "../../images/profile.jpg";
import { ArrowDownward, Close } from "@mui/icons-material";
import { Button } from "antd";
import EmojiPicker from "emoji-picker-react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddNewPagesModal from "../../Components/MarketAutomationComponents/AddNewPagesModal";
import Posts from "../../Components/MarketAutomationComponents/Posts";
import { MarketAutomationProvider } from "./MainScreenProvider";
import MediaPreviewModal from "../../Components/MarketAutomationComponents/MediaPreviewModal";
import FeedComponent from "../../Components/MarketAutomationComponents/FeedComponent";
import { MainScreenMarketAutomationContext } from "./MainScreenProvider";
import Screens from "../../Components/MarketAutomationComponents/Screens";
import { Modal } from 'antd';

// const FilterModal = () => {
//   return (
//     <>
//       <input type="checkbox" id="FilterModal" className="modal-toggle" />
//       <div className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">
//             Congratulations random Internet user!
//           </h3>
//           <p className="py-4">
//             You've been selected for a chance to get one year of subscription to
//             use Wikipedia for free!
//           </p>
//           <div className="modal-action">
//             <label htmlFor="FilterModal" className="btn">
//               Yay!
//             </label>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const getDate = (n = 0) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var date = new Date();
  console.log(n);
  date.setDate(date.getDate() + n);

  return date.toLocaleDateString("en-US", options);
};

const ComposeModal = () => {
  const [text, setText] = useState("what is on your mind");
  const [image, setImage] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [showAiInput, setAiInput] = useState(false);
  const [AiPrompt, setAiPrompt] = useState("");

  const handleImage = (fileUpload) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(fileUpload);
  };
  const handleAiPrompt = (e) => {
    console.log(AiPrompt);
    if (e.key === "Enter") {
      setText(AiPrompt);
      setAiInput(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="FilterModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box  space-y-2 border shadow-lg">
          <div className="modal-action m-0 p-0">
            <label htmlFor="FilterModal">
              <Close className="text-gray-500 text-xs" />
            </label>
          </div>
          <div>
            <h4 className="text-sm text-gray-800 font-railway">
              create a new post
            </h4>
          </div>
          <div>tags</div>
          {image === null ? null : (
            <div className="w-full relative bg-slate-500">
              <img className="object-fill w-full h-[40vh]" src={image}></img>
              <label
                onClick={() => setImage(null)}
                className="absolute right-0 top-0 "
              >
                <Close className="text-white" />
              </label>
            </div>
          )}
          {!showAiInput ? (
            <div
              className="text-gray-600 text-sm focus:outline-none"
              contentEditable="true"
              // onBlur={() =>
              //   text === "" ? setText("what is on your mind") : setText(text)
              // }
              onInput={(e) => {
                setText(e.target.textContent);
              }}
            >
              {text}
            </div>
          ) : (
            <div
              onKeyDown={(e) => {
                handleAiPrompt(e);
              }}
              className="flex flex-col space-y-1"
            >
              <Close
                onClick={() => setAiInput(!showAiInput)}
                className="text-xxs mb-[2px] self-end hover:text-xs"
              ></Close>
              <input
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full outline-none text-xs px-2 py-1 bg-purple-200 rounded-md"
              ></input>
              <h1 className="text-xxs text-gray-500 self-end hover:bg-purple-300">
                Press Enter to generate
              </h1>
            </div>
          )}
          <label
            onClick={() => setAiInput(!showAiInput)}
            className="outline-dashed text-purple-500 px-3 py-1 text-xxs outline-1 rounded-full"
          >
            Dont wanna type. Generate with AI
          </label>
          <div className="flex space-x-1  items-center">
            <div className="tooltip" data-tip="upload from device">
              <input
                id="pic"
                className="hidden"
                type="file"
                accept=".jpg, .png,"
                onChange={(e) => {
                  handleImage(e.target.files[0]);
                }}
              ></input>
              <label htmlFor="pic">upload pic</label>
            </div>
            <div className="tooltip" data-tip="Emoji ">
              <SentimentSatisfiedAltIcon className="text-gray-500"></SentimentSatisfiedAltIcon>
            </div>
          </div>

          {/* section for schedualing the post */}
          <div
            className="bg-gray-200 flex justify-between px-4
          py-2 rounded-lg shadow"
          >
            <div className="dropdown dropdown-top">
              <label
                tabIndex={0}
                className="text-xxs text-gray-500 hover:text-gray-600"
              >
                Select Date and Time
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 h-48 overflow-y-auto pt-4  border bg-base-100 shadow-lg w-40 space-y-1 "
              >
                <li className="text-xxs p-1 rounded-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  {getDate(1)}
                </li>
                <li className="text-xxs p-1 rounded-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  {getDate(3)}
                </li>
                <li className="text-xxs p-1 rounded-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  {getDate(5)}
                </li>
                <li className="text-xxs p-1 rounded-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  {getDate(7)}
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className=" ">
                    <h1 className="text-xxs text-gray-700">
                      Select Custom Date
                    </h1>
                    <input className="w-full" type="text" />
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className=" ">
                    <h1 className="text-xxs text-gray-700">
                      Select Custom Date
                    </h1>
                    <input className="w-full" type="text" />
                  </div>
                </li>
                <div className="flex justify-end pt-2">
                  <Button size="small" className="bg-blue text-xxs text-white ">
                    select
                  </Button>
                </div>
              </ul>
            </div>
            <Button className="bg-blue text-white">Save post</Button>
          </div>
        </div>
      </div>
    </>
  );
};
const FilterComponent = () => {
  const [openArroval, setOpenApproval] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sortby, setSortBy] = useState(false);

  const handleFilter = () => {};
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

      <div className="p-4 w-80 bg-base-100 text-base-content shadow-xl">
        <h1 className="text-xl font-railway text-gray-800">Filter & Sort</h1>

        <div className="  mt-2">
          <div className="flex flex-col flex-[0.25]">
            <h1
              onClick={() => setOpenSort(!openSort)}
              className="mb-4 text-gray-600 font-semibold"
            >
              Sort By
            </h1>
            {openSort && (
              <ul>
                <li className="flex space-x-3">
                  <input
                    onChange={(e) => console.log(e.target)}
                    value="New Post"
                    type="radio"
                    name="radio-1"
                  />
                  <h1 className="text-sm font-semibold text-gray-800">
                    New Post
                  </h1>
                </li>
                <li className="flex space-x-3">
                  <input value="Later" type="radio" name="radio-1" />
                  <h1 className="text-sm font-semibold text-gray-800">Later</h1>
                </li>
              </ul>
            )}
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
              <li className="flex flex-col  ">
                <div
                  onClick={() => setOpenStatus(!openStatus)}
                  className="group flex justify-between hover:bg-slate-300 rounded-md px-3 py-2"
                >
                  <h1 className="text-base font-semibold text-gray-500">
                    Published
                  </h1>
                  <ArrowDownward className="invisible group-hover:visible">
                    sdfg
                  </ArrowDownward>
                </div>
                {openStatus && (
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
                          1 day
                        </label>
                      </li>
                      <li className="flex space-x-3 bg-slate-200 py-2 px-3 rounded-md mb-1 ">
                        <input id="pending" type="radio" name="radio-2" />
                        <label
                          htmlFor="pending"
                          className="text-base font-semibold text-gray-800"
                        >
                          1 week
                        </label>
                      </li>
                      <li className="flex space-x-3 bg-slate-200 py-2 px-3 rounded-md mb-1 ">
                        <input id="pending" type="radio" name="radio-2" />
                        <label
                          htmlFor="pending"
                          className="text-base font-semibold text-gray-800"
                        >
                          1 month
                        </label>
                      </li>
                      <li className="flex space-x-3 bg-slate-200 py-2 px-3 rounded-md mb-1 ">
                        <input id="pending" type="radio" name="radio-2" />
                        <label
                          htmlFor="pending"
                          className="text-base font-semibold text-gray-800"
                        >
                          Later
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            <div className="flex justify-evenly mt-3">
              <Button color="blue">Reset Filters</Button>
              <Button className="bg-blue  text-white">Apply filters</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MainScreen = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <MarketAutomationProvider>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* <FilterModal></FilterModal> */}
          <AddNewPagesModal />
          <ComposeModal />
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <MediaPreviewModal></MediaPreviewModal>
          <Navbar handleCompose={showModal}></Navbar>

          {/* Post sections */}
          <Screens></Screens>
        </div>
        <FilterComponent></FilterComponent>
      </div>
    </MarketAutomationProvider>
  );
};

export default MainScreen;
