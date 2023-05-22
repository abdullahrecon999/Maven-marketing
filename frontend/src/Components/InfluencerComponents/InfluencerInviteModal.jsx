import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Tag } from "antd";
import { useState, useContext } from "react";
import { InfluencerDashboardContext } from "./InfluencerDashboardContext";
import axios from "axios";
import dayjs from "dayjs";
import { Skeleton } from "antd";
import { useMutation } from "react-query";
const InfluencerInviteModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [done, setDone] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMessage] = useState("");
  const [error, setError] = useState({
    err: false,
    errText: "There was some error in the server",
  });
  const { openInviteModal, setInviteModal, id, inviteCounter } = useContext(
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
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await axios.get(
          `http://localhost:3000/influencer/invites/detail/${id}`
        );
        console.log(data.data.data);
        setBidDetails(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log("this is error", e);
        setError({ ...error, err: true });
      }
    };
    fetch();
  }, [inviteCounter]);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setInviteModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setInviteModal(false);
    setDone(false);
    setSuccessMessage("");
  };

  const handleInviteAccept = async () => {
    setAccepting(true);
    try {
      await axios.post(
        `http://localhost:3000/influencer/invite/accept/${id}`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setAccepting(false);

      setSuccessMessage("Accepted successfully");
      setDone(true);
    } catch (e) {
      setAccepting(false);
      setDone(false);
    }
  };
  const {
    mutate: handleDecline,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(() => {
    return axios.post(
      `http://localhost:3000/influencer/invite/reject/${id}`,
      {
        accepted: false,
        rejected: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  });

  return (
    <>
      <Modal
        title="Invitation form campaign"
        open={openInviteModal}
        onCancel={handleCancel}
        footer={[
          // <Button
          //   loading={isLoading}
          //   disabled={isSuccess}
          //   key="reject"
          //   onClick={() => {
          //     handleDecline();
          //   }}
          // >
          //   Reject Invite
          // </Button>,
          <Button
            key="accept"
            loading={accepting}
            onClick={() => {
              handleInviteAccept();
            }}
            className="text-white bg-blue"
            disabled={done}
          >
            Accept Invite
          </Button>,
        ]}
      >
        <div className=" max-h-96 overflow-y-auto">
          <div className="flex justify-between">
            <h1 className="text-xl  py-2  mt-0  px-4 text-gray-800 font-semibold">
              Invitation Details
            </h1>
            <div>
              <Tag color="green">{successMsg}</Tag>
            </div>

            {/* <label className="text-xxs  text-red-500">
              {error.err && <Tag color="red">{error.errText}</Tag>}
            </label> */}
          </div>
          {loading ? (
            <Skeleton active></Skeleton>
          ) : (
            <div className="px-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h1 className="text-sm text-gray-800 font-semibold">
                    Campaign Title
                  </h1>
                  <p className="text-base  text-black font-semibold ">
                    {bidDetails?.data?.data?.campaignId.title}
                  </p>
                </div>
                <div>
                  <h1 className="text-sm text-gray-800 font-semibold">
                    BrandName
                  </h1>
                  <p className="text-base  text-black font-semibold ">
                    {" "}
                    {bidDetails?.data?.data?.sender?.name}
                  </p>
                </div>
              </div>
              <div className="flex-1 mb-2 p-2 border rounded my-2">
                <h1 className="text-sm text-gray-700 font-bold">
                  Campaign Description
                </h1>
                <p className="  text-gray-700 text-xs">
                  {bidDetails?.data?.data?.campaignId?.description}
                </p>
              </div>
              <div className="flex flex-row-reverse mb-1">
                <Link
                  className="link text-blue"
                  to="/campaigndetails"
                  state={{
                    id: bidDetails?.data?.data?.campaignId["_id"],
                    inviteId: bidDetails?.data?.data["_id"],
                    invite: true,
                  }}
                >
                  View campaign
                </Link>
              </div>
              <hr></hr>
              <div className="px-2 mt-2">
                <h1 className="text-sm text-gray-800 font-semibold">
                  {" "}
                  Platforms
                </h1>
                <div className="flex flex-wrap">
                  {bidDetails?.data?.data?.campaignId?.platform?.map((item) => {
                    const color =
                      item === "Any"
                        ? "volcano"
                        : ["linkedIn", "Twitter", "Facebook"].includes(item)
                        ? "blue"
                        : "purple";
                    return <Tag color={color}>{item}</Tag>;
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2  gap-2 p-2">
                <div>
                  <h1 className="text-sm font-semibold "> Recieved At</h1>
                  <Tag color="green">
                    {dayjs(bidDetails?.data?.data?.createdAt)
                      .toDate()
                      .toLocaleString()}
                  </Tag>
                </div>
              </div>
            </div>
          )}
          {/* <div className="px-4 flex flex-col h-full bg-pink">
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
                  {/* {bidDetails?.data?.data?.campaignId?.title} */}
          {/* </p>
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-sm font-semibold text-gray-800">
                Proposal Description
              </h1>
              <p className=" text-sm text-gray-700 ">
                {bidDetails.data.data.discription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <h1 className="text-grey-500 font-semibold"> Submitted at</h1>
                <Tag color="green">
                  {dayjs(bidDetails.data.data.createdAt)
                    .toDate()
                    .toLocaleDateString()}
                </Tag>
              </div>

              <div>
                <h1 className="text-grey-500 font-semibold">
                  {" "}
                  Proposal Amount
                </h1>
                <Tag color="red">{bidDetails.data.data.amount}</Tag>
              </div>
              <div>
                <h1 className="text-grey-500 font-semibold"> Status</h1>
                <Tag color="red">
                  {bidDetails.data.data.accepted === false
                    ? "Pending"
                    : "Approved"}
                </Tag>
              </div>
            </div>
          </div> */}
        </div>
      </Modal>
    </>
  );
};
export default InfluencerInviteModal;
