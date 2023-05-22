import React, { useEffect } from "react";

import { Skeleton, Modal, Tag } from "antd";
import { useState, useContext } from "react";
import { InfluencerDashboardContext } from "./InfluencerDashboardContext";
import axios from "axios";
import dayjs from "dayjs";
const InfluencerBidModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const { openBidModal, setBidModal, id, bidCounter } = useContext(
    InfluencerDashboardContext
  );

  //   const {
  //     isLoading,
  //     data: bidDetails,
  //     isError,
  //     isSuccess,
  //   } = useQuery(["getbidDetails"], () => {
  //     return axios.get(`http://localhost:3000/influencer/bidDetails/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //   });

  useEffect(() => {
    try {
      const fetch = async () => {
        setLoading(true);
        const data = await axios.get(
          `http://localhost:3000/influencer/bidDetails/${id}`
        );
        console.log(data.data.data);
        setBidDetails(data);
        setLoading(false);
      };
      fetch();
    } catch (e) {
      setErr(true);
      setLoading(false);
    }
  }, [bidCounter]);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setBidModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setBidModal(false);
  };
  return (
    <>
      <Modal
        title=""
        open={openBidModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className=" max-h-96 overflow-y-auto">
          <div className="flex  justify-start">
            <h1 className="text-xl  py-2  mt-0  px-4 text-gray-800 font-semibold">
              Bid Details
            </h1>
            {err && (
              <Tag className="self-end" color="red">
                There was some error please try later
              </Tag>
            )}
          </div>

          {loading ? (
            <div>
              <Skeleton active></Skeleton>
            </div>
          ) : (
            <div className="px-4 flex flex-col h-full bg-pink">
              <div className="grid grid-col-1 md:grid-cols-2">
                <div className="flex flex-col space-y-0">
                  <h1 className="text-base font-semibold text-gray-800">
                    Brand Name{" "}
                  </h1>
                  <p className="text-xl text-gray-900 font-semibold ">
                    {bidDetails?.data?.data?.to?.name}
                  </p>
                </div>
                <div>
                  <h1 className="text-base font-semibold text-gray-800">
                    Campaign Name
                  </h1>
                  <p className="text-xl text-gray-900 font-semibold ">
                    {bidDetails?.data?.data?.campaignId?.title}
                  </p>
                </div>
              </div>
              <div className="mt-3 p-2 border rounded shadow">
                <h1 className="text-sm font-semibold text-gray-800">
                  Proposal Description
                </h1>
                <p className=" text-sm text-gray-700 ">
                  {bidDetails?.data?.data?.discription}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <h1 className="text-grey-500 font-semibold"> Submitted at</h1>
                  <Tag color="green">
                    {dayjs(bidDetails?.data?.data?.createdAt)
                      .toDate()
                      .toLocaleDateString()}
                  </Tag>
                </div>

                <div>
                  <h1 className="text-grey-500 font-semibold">
                    {" "}
                    Proposal Amount
                  </h1>
                  <h1 className="text-blue">
                    {bidDetails?.data?.data?.amount}
                  </h1>
                  {/* <Tag color="red">{bidDetails?.data?.data?.amount}</Tag> */}
                </div>
                <div>
                  <h1 className="text-grey-500 font-semibold"> Status</h1>
                  <Tag color="red">
                    {bidDetails?.data?.data?.accepted === false
                      ? "Pending"
                      : "Approved"}
                  </Tag>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default InfluencerBidModal;
