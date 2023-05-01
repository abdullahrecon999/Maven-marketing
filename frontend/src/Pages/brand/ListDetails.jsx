import React, { useState, useEffect } from "react";
import BannerImage from "../../images/banner.jpg";
import ProfileImage from "../../images/profile.jpg";
import Views from "../../images/view.png";
import axios from "axios";

const ListDetails = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        "http://localhost:3000/list/getlistingdetails/6433325b875297785f55e6c7"
      );

      setData(data?.data?.data);
      console.log(data.data.data);
    };

    fetch();
  }, []);
  return (
    <div className="container mx-auto mt-5 bg-white">
      <header className="w-full h-[60vh] flex justify-center px-10 mb-2">
        <div
          style={{
            backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full  border rounded-t-2xl flex justify-center items-center bg-opacity-25"
        >
          <div className="flex flex-col item-center relative justify-center">
            <div className="relative">
              <img
                src={data?.profilePic}
                className="w-36 rounded-full h-36 border-2 border-green"
              ></img>
              <div className="bg-green border-white flex justify-center py-1 absolute top-20 -right-14 rounded-full border-2 px-2">
                <h1 className="text-white text-sm">Registered</h1>
              </div>
            </div>
          </div>
          <h1 className="text-center text-white font-bold text-2xl">
            {data?.title}
          </h1>
        </div>
      </header>
      <section
        id="influencer details"
        className="w-full flex flex-col md:flex-row justify-between px-10 mb-2"
      >
        <div className="flex flex-col  flex-1 justify-start p-4 space-y-5">
          <h1 className="text-gray-800 text-xl font-semibold ">
            {data?.title}{" "}
          </h1>
          <div className="text-gray-600 text-base ">{data?.description}</div>
          <div className="flex flex-wrap justify-center space-y-2 md:space-x-4 md:justify-start md:space-y-0">
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-base text-gray-600 font-bold font-railway">
                  Posts
                </h1>
                <h4 className="text-xl text-gray-800 font-railway font-bold">
                  {data?.posts?.length} Posts
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-base text-gray-600 font-bold font-railway">
                  Followers
                </h1>
                <h4 className="text-xl text-gray-800 font-railway font-bold">
                  {data?.followers_avg}
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-base text-gray-600 font-bold font-railway">
                  Plaform
                </h1>
                <h4 className="text-xl text-gray-800 font-railway font-bold">
                  {data?.platform}
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <a
                  href={data?.url}
                  className="text-base text-gray-600 font-bold font-railway"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[0.5]">
          <div className="lg:block  hidden">
            <div className="flex-col p-5 h-fit shadow-md border rounded-xl sticky top-20">
              <h1 className="text-xl font-bold">Deal Overview</h1>
              <div className="divider mt-3 mb-3" />
              <div className="flex-col">
                <p className="text-sm font-semibold">DEAL</p>
                <div className="flex justify-between">
                  <p className="font-medium">Custom</p>
                  <p className="font-medium">$$$</p>
                </div>
                <div className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                  </svg>
                  <p className="text-sm text-[#8e949b]">
                    <b>5</b> days Delivery
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                  </svg>
                  <p className="text-sm text-[#8e949b]">
                    <b>5</b> Revisions
                  </p>
                </div>
                <div className="divider mt-3 mb-3" />
                <div className="flex-col">
                  <div className="flex justify-between">
                    <p className="font-medium">Subtotal</p>
                    <p className="font-medium">
                      $<b>0</b>
                    </p>
                  </div>
                  {/* <div className="flex justify-between">
														<p className="font-medium">Total Delivery time</p>
														<p className="font-medium"><b>5</b> Days</p>
													</div> */}
                </div>
                <div className="flex justify-center">
                  <button
                    // disabled={sent}
                    // onClick={showModal}
                    className="btn btn-success btn-wide mt-3"
                  >
                    {/* {sent ? "Invite Sent" : "Send Request"} */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="deals" className="w-full px-10 my-2 ">
        <div className=" w-[100%] md:w-[70%] ">
          <div>
            <h1 className="text-xl md:text-2xl text-gray-800 font-semibold">
              Deals
            </h1>
            <p className="text-base text-gray-500">
              Checkout the services that influencer provides
            </p>
          </div>
          <div>
            <div className="flex-col p-1">
              <div
                className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer"
                data-key="1"
                // onClick={() => onChange("1")}
              >
                <div
                  className={`h-full w-3 border rounded-tl-xl rounded-bl-xl? 'bg-[#3f96b6]' : 'bg-[#686868]'} `}
                />
                <div className="flex-col h-full w-full p-4">
                  <div className="flex-col w-full">
                    <p className="text-xl text-[#262a2e] font-medium">
                      One Instagram Photo
                    </p>
                    <div className="flex w-full gap-5 mb-3">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">
                          15 days Delivery
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 30 30"
                        >
                          <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">2 Revisions</p>
                      </div>
                    </div>
                    <p className="text-[#6a6e72]">
                      My audience tends to be males around 18-24. I'll highlight
                      your product in an Instagram post on @zari.khan111. My
                      followers like my posts about Media and Entertainment as
                      well as Media and Entertainment. I've worked with a range
                      of companies, including Instagram and TikTok.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer"
                // onClick={() => onChange("2")}
              >
                <div
                  className={`h-full w-3 border rounded-tl-xl rounded-bl-xl  ? 'bg-[#3f96b6]' : 'bg-[#686868]'} `}
                />
                <div className="flex-col h-full w-full p-4">
                  <div className="flex-col w-full">
                    <p className="text-xl text-[#262a2e] font-medium">
                      One Instagram Photo
                    </p>
                    <div className="flex w-full gap-5 mb-3">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">
                          15 days Delivery
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 30 30"
                        >
                          <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">2 Revisions</p>
                      </div>
                    </div>
                    <p className="text-[#6a6e72]">
                      My audience tends to be males around 18-24. I'll highlight
                      your product in an Instagram post on @zari.khan111. My
                      followers like my posts about Media and Entertainment as
                      well as Media and Entertainment. I've worked with a range
                      of companies, including Instagram and TikTok.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer"
                // onClick={() => onChange("3")}
              >
                <div
                  className={`h-full w-3 border rounded-tl-xl rounded-bl-xl  ? 'bg-[#3f96b6]' : 'bg-[#686868]'} `}
                />
                <div className="flex-col h-full w-full p-4">
                  <div className="flex-col w-full">
                    <p className="text-xl text-[#262a2e] font-medium">
                      One Instagram Photo
                    </p>
                    <div className="flex w-full gap-5 mb-3">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">
                          15 days Delivery
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 30 30"
                        >
                          <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                        </svg>
                        <p className="text-sm text-[#8e949b]">2 Revisions</p>
                      </div>
                    </div>
                    <p className="text-[#6a6e72]">
                      My audience tends to be males around 18-24. I'll highlight
                      your product in an Instagram post on @zari.khan111. My
                      followers like my posts about Media and Entertainment as
                      well as Media and Entertainment. I've worked with a range
                      of companies, including Instagram and TikTok.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
    </div>
  );
};

export default ListDetails;
