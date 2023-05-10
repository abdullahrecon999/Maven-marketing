import React from "react";
import profileImage from "../../images/profile.jpg";
import { Button } from "antd";
const User = () => {
  return (
    <div className="border px-4 py-5 bg-white">
      <div className="flex flex-col w-full space-y-2">
        <h1 className="text-gray-600 text-base font-semibold"> type</h1>
        <div className="flex space-x-4 border-y py-3">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={profileImage}
            alt="tomatoes are disgusting"
          ></img>
          <div>
            <h1 className="text-xl text-gray-800 font-semibold"> name</h1>
            <p className="text-gray-600">Member since</p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button size="small" rootClassName="text-white bg-blue px-3 py-1">
            Chat
          </Button>
          <Button size="small" rootClassName=" font-semibold px-3 py-1">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default User;
