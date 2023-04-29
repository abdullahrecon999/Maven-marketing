import React from "react";
import BannerImage from "../../images/banner.jpg";
import ProfileImage from "../../images/profile.jpg";
import Posts from "./Posts";
const FeedComponent = () => {
  return (
    <>
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
            <h1 className="text-xl font-bold text-gray-800">Brand Page Name</h1>
            <p className="text-sm text-gray-500">A short discription</p>
          </div>
        </div>
      </section>
      <div>
        <Posts></Posts>
      </div>
    </>
  );
};

export default FeedComponent;
