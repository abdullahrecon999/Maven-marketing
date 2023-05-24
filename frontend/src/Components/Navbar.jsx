import React, { useState, useContext } from "react";
import DropdownMenu from "./DropdownMenu";
import GettingStartedButton from "./GettingStartedButton";
import MenuIcon from "@mui/icons-material/Menu";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModalInfluencer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Input } from "@mui/icons-material";
import LoginModalBrand from "./LoginModalInfluencer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authProvider";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: <Link to="/InfluencerSignup">As Influencer</Link>,
  },
  {
    key: "2",
    label: <Link to="/BusinessSignup">As Brand</Link>,
  },
];

const LoginItems = [
  {
    key: "1",
    label: <Link to="/InfluencerSignup">As Influencer</Link>,
  },
  {
    key: "2",
    label: <Link to="/BusinessSignup">As Brand</Link>,
  },
];
const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openSignupModal, setOpenSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpenSignup(false);

  return (
    <>
      <nav className="container relative px-2 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-gray-800 font-bold text-xl "
          >
            Maven Marketing
          </h1>
          <div className="hidden space-x-6 md:flex">
            <Link
              to="/services"
              className="text-gray-800 font-medium text-xl  hover:text-blue"
            >
              Services
            </Link>
            <Link
              to="/aboutus"
              className="text-gray-800 font-medium text-xl  hover:text-blue"
            >
              about us
            </Link>
            <Link
              to="/whyus"
              className="text-gray-800 font-medium text-xl  hover:text-blue"
            >
              why us?
            </Link>
          </div>
          <div className="hidden space-x-0.5 md:flex">
            {/* <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpenSignup(true);
              }}
              className="px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl"
            >
              Get Started
            </button> */}
            <div className="flex justify-center items-center">
              <Dropdown
                menu={{
                  items,
                }}
                className=" px-2 py-1 rounded-lg  "
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <label className="text-xl text-blue  font-medium  ">
                      Get Started
                    </label>
                    <DownOutlined className="text-white " />
                  </Space>
                </a>
              </Dropdown>
            </div>
            {user ? (
              <button
                onClick={() =>
                  navigate(
                    user.role === "admin"
                      ? "/admin/home"
                      : user.role === "influencer"
                      ? "/influencerhome"
                      : "/businesshome"
                  )
                }
                className="p-3 text-grey baseline text-xl  font-medium hover:text-blue"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/influencerlogin")}
                  className="p-3 text-grey baseline text-xl  font-medium hover:text-blue"
                >
                  {" "}
                  Influencer login
                </button>
                <button
                  onClick={() => navigate("/businesslogin")}
                  className="p-3 text-grey baseline text-xl  font-medium hover:text-blue"
                >
                  {" "}
                  Brand login
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="text-grey md:hidden"
          >
            <MenuIcon></MenuIcon>
          </button>
        </div>
        {open && <DropdownMenu></DropdownMenu>}
      </nav>
      {/* <SignupModal
        visible={openSignupModal}
        onClose={handleClose}
      ></SignupModal> */}
    </>
  );
};

export default Navbar;
