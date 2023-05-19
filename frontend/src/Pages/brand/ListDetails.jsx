import React, { useState, useEffect, useContext } from "react";
import BannerImage from "../../images/banner.jpg";
import ProfileImage from "../../images/profile.jpg";
import { useQuery, useMutation } from "react-query";
import Views from "../../images/view.png";
import axios from "axios";
import { Button, Modal, Alert, Skeleton, Select, Tag } from "antd";
import CreateNewGigModal from "../../Components/InfluencerComponents/CreateNewGigModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/authProvider";

const ListDetails = () => {
  const [data, setData] = useState({});

  const { id } = useParams();
  // states of delete modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "are you sure you want to delete the listing"
  );
  // states of edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

  //states of campaign modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const { user, setUser } = useContext(AuthContext);
  const [selectedCampaignId, setSelectedCampaingIds] = useState([]);
  const [campaignsData, setCampaignData] = useState([]);
  const [selectionError, setSelectionError] = useState(false);
  const showInviteModal = () => {
    setInviteModalOpen(true);
    setCount(count + 1);
  };
  const handleInviteModalClose = () => {
    setInviteModalOpen(false);
    setSelectionError(false);
  };
  const showEditModal = () => {
    setOpenEdit(true);
  };
  const handleEditOk = () => {
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 2000);
  };
  const handleEditCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // functions of delete modal
  const showDeleteModal = () => {
    setOpen(true);
  };
  const handleDeleteOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleInviteIdChange = (value) => {
    if (selectedCampaignId.length !== 0) {
      setSelectionError(false);
    }
    setSelectedCampaingIds(value);
  };
  const handleDeleteCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const {
    data: campaingns,
    isLoading,
    isError,
    isSucces,
  } = useQuery(["getmycampaigns"], () => {
    return axios.get("http://localhost:3000/brand/mycampaigns/" + user["_id"]);
  });

  const {
    mutate,
    isLoading: isInviting,
    isSuccess: isInvitingSuccess,
    isError: isInvitingError,
  } = useMutation(["multipleInvites"], () => {
    if (selectedCampaignId.length !== 0) {
      setSelectionError(false);
      const val = {
        sender: user?._id,
        to: data?.owner,
        campaignIds: selectedCampaignId,
      };
      console.log(val);
      return axios.post("http://localhost:3000/brand/sendmultipleinvites", val);
    } else {
      setSelectionError(true);
    }

    //return axios.post("http://localhost:3000/brand/sendmultipleinvites", );
  });
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    const fetch = async () => {
      const data = await axios.get(
        "http://localhost:3000/list/getlistingdetails/" + id
      );

      setData(data?.data?.data);
    };

    fetch();
  }, []);
  useEffect(() => {
    const data = campaingns?.data?.data?.map((item) => {
      return {
        label: item?.title,
        value: item?._id,
      };
    });
    setCampaignData(data);
  }, [campaingns?.data]);

  return (
    <div className="container mx-auto mt-5 bg-white">
      {/* this is the delete modal */}
      <Modal
        title="Delete this Gig?"
        open={open}
        onOk={handleDeleteOk}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteCancel}
      >
        <p>{modalText}</p>
      </Modal>

      <Modal
        title="Invite For campaigns"
        open={inviteModalOpen}
        onOk={handleInviteModalClose}
        confirmLoading={confirmLoading}
        onCancel={handleInviteModalClose}
        footer={[
          <Button
            disabled={isInvitingSuccess}
            loading={isInviting}
            onClick={mutate}
            className="text-white bg-blue"
          >
            Send Invite
          </Button>,
        ]}
      >
        <div>
          <h1 className="text-xl text-gray-800 font-medium">
            Select Campaings to send invites
          </h1>
          {selectionError && (
            <Tag className="my-2" color="red">
              Please selected a campaign/s
            </Tag>
          )}{" "}
          <div>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              options={campaignsData}
              onChange={handleInviteIdChange}
            />
          </div>
        </div>
      </Modal>

      {/* this modal is used for both edit and creating new gig */}
      <CreateNewGigModal
        gigTitle="Edit Gig"
        open={openEdit}
        setOpen={setOpenEdit}
        title={data?.title}
        description={data?.description}
        platform={data?.platform}
      ></CreateNewGigModal>
      <header className="w-full h-[60vh] flex justify-center px-10 mb-2">
        <div
          style={{
            backgroundImage: `url("${data?.banner}")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.6,
          }}
          className="w-full relative border rounded-t-2xl flex flex-col justify-center items-center "
        >
          {user?.role === "influencer" && data?.registered ? (
            <div className="dropdown dropdown-end absolute top-2 right-5">
              <label tabIndex={0} className="text-white">
                <EditOutlined></EditOutlined>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li>
                  <label className="text-xs " onClick={() => showEditModal()}>
                    <EditOutlined></EditOutlined>Edit
                  </label>
                </li>
                <li>
                  <label
                    className="text-xs "
                    onClick={() => showDeleteModal(true)}
                  >
                    <DeleteOutlined className="text-red-500"></DeleteOutlined>{" "}
                    Delete gig
                  </label>
                </li>
              </ul>
            </div>
          ) : null}
          <div className="flex flex-col item-center relative justify-center ">
            <div className="relative">
              <img
                src={data?.profilePic}
                className="w-36 rounded-full h-36 border-2 border-green opacity-100"
              ></img>
              <div
                className={`${
                  data?.registered ? "bg-green" : "bg-grey"
                } border-white flex justify-center py-1 absolute top-20 -right-14 rounded-full border-2 px-2`}
              >
                <h1 className="text-white text-sm">
                  {data?.registered ? "Registered" : "Unregistered"}
                </h1>
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
                <h1 className="text-base text-gray-600 font-bold ">Posts</h1>
                <h4 className="text-xl text-gray-800  font-medium">
                  {data?.no_posts} Posts
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-base text-gray-600 font-bold ">
                  Followers
                </h1>
                <h4 className="text-xl text-gray-800  font-medium">
                  {data?.followers_avg}
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-base text-gray-600 font-bold ">Plaform</h1>
                <h4 className="text-xl text-gray-800  font-medium">
                  {data?.platform}
                </h4>
              </div>
            </div>
            <div className="flex  justify-between items-center px-4 py-2 border border-2 rounded-xl space-x-4 shadow-lg px-6 py-6">
              <img className="w-7 h-7" src={Views} />
              <div className="flex flex-col justify-center items-center">
                {data.registered ? (
                  <Link
                    to={"/influencerListing/" + data?.owner}
                    className="text-base text-gray-600 font-bold "
                  >
                    View Profile
                  </Link>
                ) : (
                  <a
                    href={data?.url}
                    className="text-base text-gray-600 font-bold "
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        {!data?.registered ? (
          <div className="w-[30%]">
            <Alert
              showIcon
              description="This user is not registered on our platform. To collaborate with him you can message then directly but we dont recommend that"
              message="Warning Text"
              type="warning"
            />
          </div>
        ) : null}
      </section>
      <section className="px-10 ">
        <div className="p-4 ">
          <h1 className="text-xl text-gray-800 font-medium">Post</h1>
          <p className="text-base text-gray-400">
            Here are some Post of the Influencers
          </p>
          {data?.platform === "Youtube" && !data.registered ? (
            <div className="flex flex-col md:flex-row gap-3">
              <div>
                <iframe
                  width="500"
                  height="300"
                  src={`https://www.youtube.com/embed/${data?.posts[0]?.slice(
                    -11
                  )}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div className="flex flex-col gap-3">
                <iframe
                  width="250"
                  height="145"
                  src={`https://www.youtube.com/embed/${data?.posts[1]?.slice(
                    -11
                  )}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
                <iframe
                  width="250"
                  height="145"
                  src={`https://www.youtube.com/embed/${data?.posts[2]?.slice(
                    -11
                  )}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <section className="px-10 ">
        <div className="p-4">
          <Button onClick={showInviteModal} className="text-white bg-blue">
            Invite For campaign
          </Button>
        </div>
      </section>

      <hr></hr>
    </div>
  );
};

export default ListDetails;
