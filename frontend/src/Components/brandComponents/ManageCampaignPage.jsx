import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import profileImage from "../../images/profile.jpg";
import { Tabs, Table, Tag, Button, Space, Modal, Skeleton } from "antd";
import { Collapse } from "antd";
import { useQuery, useMutation } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";

const { Panel } = Collapse;
const { Column } = Table;
const Bids = ({ id }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textButton, setTextButton] = useState(true);
  const [reset, setReset] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [bidId, setBidId] = useState("");
  const [bidLoading, setBidLoading] = useState(false);
  const [acceptingBid, setAcceptingBid] = useState(false);
  const [isAcceptingSuccess, setAcceptingSuccess] = useState(false);
  const showModal = () => {
    setIsBidModalOpen(true);
  };
  const handleOk = () => {
    setIsBidModalOpen(false);
  };
  const handleCancel = () => {
    setIsBidModalOpen(false);
    setAcceptingSuccess(false);
    setAcceptingBid(false);
  };
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        `http://localhost:3000/brand/getallbids/` + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const bidsData = data.data.data.map((item) => {
        return {
          key: item["_id"],
          campaignName: item?.campaignId?.title,
          sender: item?.sender?.name,
          platforms: item?.campaignId?.platform,
          submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
          status: item?.accepted
            ? "Accepted"
            : item?.rejected
            ? "Rejected"
            : "Pending",
          accepted: item?.accepted ? "Accepted" : "Rejected",
        };
      });
      console.log(bidsData);
      setBids(bidsData);
      setLoading(false);
    };
    fetch();
  }, [reset]);

  useEffect(() => {
    setLoading(true);
    if (!textButton) {
      const filtered = bids.filter((item) => {
        return item.status === "Pending";
      });

      console.log("pending", filtered);
      setBids(filtered);
    }
    if (textButton) {
      console.log("accepted");
      const filtered = bids.filter((item) => {
        return item.status === "Accepted";
      });
      setBids(filtered);
      console.log(filtered);
    }
    setLoading(false);
  }, [textButton]);

  const handleBidDetails = (bidId) => {
    const fetch = async () => {
      setBidLoading(true);
      const data = await axios.get(
        "http://localhost:3000/brand/getbiddetails/" + bidId
      );
      console.log(data?.data?.data);
      setBidDetails(data?.data?.data);
      setBidLoading(false);
    };
    fetch();
  };

  const handleAcceptingBid = async (bidId) => {
    console.log(bidId);
    setAcceptingBid(true);
    const data = await axios.post(
      "http://localhost:3000/brand/bid/accept/" + bidId
    );
    setAcceptingBid(false);
    setAcceptingSuccess(true);
  };
  return (
    <div className="p-4">
      <Modal
        footer={[]}
        title="Bid Details"
        open={isBidModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {bidLoading ? (
          <Skeleton active></Skeleton>
        ) : (
          <div className="grid grid-cols-2 h-80 overflow-y-auto p-4">
            <div className="col-span-2">
              <h1 className="text-sm text-gray-700 font-semibold">
                Campaign Name
              </h1>
              <h1 className="text-base text-gray-700 font-semibold">
                {bidDetails?.campaignId?.title}
              </h1>
            </div>
            <div className="">
              <h1 className="text-sm text-gray-700 font-semibold">Amount</h1>
              <h1 className="text-base text-gray-700 font-semibold">
                {bidDetails?.amount}
              </h1>
            </div>

            <h1 className="col-span-2 text-xl text-gray-700 font-semibold">
              Influencer Details
            </h1>
            <div className="col-span-2">
              <h1 className="text-sm text-gray-700 font-semibold">Name</h1>
              <h1 className="text-base text-gray-700 font-semibold">
                {bidDetails?.sender?.name}
              </h1>
            </div>
            <div>
              <h1 className="text-sm text-gray-700 font-semibold">Platforms</h1>
              <div className="flex gap-3 flex-wrap">
                {bidDetails?.sender?.platforms?.map((item) => {
                  return <Tag color="purple">{item}</Tag>;
                })}
              </div>
            </div>
            <div>
              <h1 className="text-sm text-gray-700 font-semibold">country</h1>
              <Tag>{bidDetails?.sender?.country[0]}</Tag>
            </div>
            <div className="py-3">
              <Button className="bg-blue text-white">View Profile</Button>
            </div>
            <h1 className="text-base col-span-2 text-gray-700 font-semibold">
              Additional Information
            </h1>
            {/* <div className="col-span-2">
              <h1 className="text-sm text-gray-700 font-semibold">Files</h1>
              <h1>Files</h1>
            </div> */}
            {/* <div className="col-span-2">
              <h1 className="text-sm text-gray-700 font-semibold">questions</h1>
              <Collapse defaultActiveKey={["1", "2", "3"]}></Collapse>
            </div> */}
            <div className="col-span-2">
              {!bidDetails?.accepted && (
                <>
                  <Button
                    loading={acceptingBid}
                    onClick={() => {
                      handleAcceptingBid(bidDetails?._id);
                    }}
                    disabled={isAcceptingSuccess}
                  >
                    Accept
                  </Button>
                  <Button disabled={isAcceptingSuccess}>Decline</Button>
                  {isAcceptingSuccess && (
                    <Tag color="red">Bid Accepted Successfully</Tag>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
      <div className="gap-3 my-2">
        <Button
          onClick={() => {
            setTextButton(!textButton);
          }}
          className="text-white bg-blue"
        >
          {textButton ? "View Pending" : "View Approved"}
        </Button>
        <Button onClick={() => setReset(!reset)} className="text-white bg-blue">
          Reset
        </Button>
      </div>
      <Table
        dataSource={bids.length === 0 ? [] : bids}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 300 }}
        loading={loading}
      >
        <Column
          title="Campaign Name"
          dataIndex="campaignName"
          key="campaignName"
        ></Column>
        <Column title="Influencer" dataIndex="sender" key="sender"></Column>
        <Column
          title="platforms"
          dataIndex="platforms"
          key="platforms"
          render={(tags) => {
            return (
              <>
                {tags.map((item) => {
                  const color =
                    item === "Any"
                      ? "volcano"
                      : ["linkedIn", "Twitter", "Facebook"].includes(item)
                      ? "blue"
                      : "purple";

                  return (
                    <>
                      <Tag color={color}>{item}</Tag>
                    </>
                  );
                })}
              </>
            );
          }}
        ></Column>
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(record) => {
            const color =
              record === "Pending"
                ? "red"
                : record === "Rejected"
                ? "red"
                : "green";

            return <Tag color={color}>{record}</Tag>;
          }}
        ></Column>
        <Column
          title="Action"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Button
                  onClick={() => {
                    setCounter(counter + 1);
                    handleBidDetails(record?.key);
                    showModal(true);
                  }}
                >
                  View
                </Button>
              </Space>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
};

const Invites = ({ id, userId }) => {
  const [invites, setInvites] = useState([]);

  const [loading, setLoading] = useState(false);
  const [textButton, setTextButton] = useState(true);
  const [reset, setReset] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await axios.post(
        `http://localhost:3000/brand/getinvites/`,
        {
          campaignId: id,
          sender: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      const inviteData = data.data.data.map((item) => {
        return {
          key: item["_id"],
          campaignName: item?.campaignId?.title,
          influencer: item?.to.name,
          platforms: item?.campaignId?.platform,
          submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
          status: item?.rejected ? "Rejected" : "Pending",
        };
      });
      setInvites(inviteData);
    };
    fetch();
    setLoading(false);
  }, [reset]);

  useEffect(() => {
    setLoading(true);
    if (!textButton) {
      const filtered = invites.filter((item) => {
        return item.status === "Pending";
      });

      console.log("pending", filtered);
      setInvites(filtered);
    }
    if (textButton) {
      console.log("accepted");
      const filtered = invites.filter((item) => {
        return item.status === "Accepted";
      });
      setInvites(filtered);
      console.log(filtered);
    }
    setLoading(false);
  }, [textButton]);

  return (
    <div className="p-4">
      <div className="gap-3 my-2">
        <Button
          onClick={() => {
            setTextButton(!textButton);
          }}
          className="text-white bg-blue"
        >
          {textButton ? "View Pending" : "View Approved"}
        </Button>
        <Button onClick={() => setReset(!reset)} className="text-white bg-blue">
          Reset
        </Button>
      </div>
      <Table
        pagination={{ pageSize: 10 }}
        scroll={{ y: 300 }}
        loading={loading}
        dataSource={invites}
      >
        <Column
          title="Campaign Name"
          dataIndex="campaignName"
          key="campaignName"
        ></Column>
        <Column
          title="influencer"
          dataIndex="influencer"
          key="influencer"
        ></Column>
        <Column
          title="platforms"
          dataIndex="platforms"
          key="platforms"
          render={(tags) => {
            return (
              <>
                {tags.map((item) => {
                  const color =
                    item === "Any"
                      ? "volcano"
                      : ["linkedIn", "Twitter", "Facebook"].includes(item)
                      ? "blue"
                      : "purple";

                  return (
                    <>
                      <Tag color={color}>{item}</Tag>
                    </>
                  );
                })}
              </>
            );
          }}
        ></Column>
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(record) => {
            const color =
              record === "Pending"
                ? "purple"
                : record === "Rejected"
                ? "red"
                : "green";
            return <Tag color="red">{record}</Tag>;
          }}
        ></Column>
        <Column
          title="Action"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Button onClick={() => {}}>View</Button>
              </Space>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
};

const ProfileDetails = ({ item, id, brandId }) => {
  const [invitesentloading, setInviteSentLoading] = useState(false);
  const [isInviteSendSuccess, setInviteSentSuccess] = useState(false);
  const handleInviteSent = () => {
    const sendInvite = async () => {
      setInviteSentLoading(true);
      const val = {
        campaignId: id,
        to: item["_id"],
        sender: brandId,
      };
      const data = await axios.post(
        "http://localhost:3000/brand/sendinvite",
        val
      );
    };
    sendInvite();
    setInviteSentLoading(false);
    setInviteSentSuccess(true);
  };
  return (
    <div key={item} className="flex px-2 py-1 border rounded my-1">
      <div className="flex justify-center items-center">
        <img
          src={item?.photo}
          alt={profileImage}
          className="w-[50px] h-[50px] object-fit rounded-full"
        ></img>
      </div>
      <div className="mx-2 grid grid-cols-2">
        <h1 className="text-xs text-gray-800 font-semibold col-span-2">
          {item?.name}
        </h1>
        <div>
          <h1 className="text-xxs text-gray-700 font-semibold">Platforms</h1>
          {item?.platforms?.map((item) => {
            const color =
              item === "Any"
                ? "volcano"
                : ["linkedIn", "twitter", "Facebook"].includes(item)
                ? "blue"
                : "purple";
            return (
              <Tag className="text-xxs" color={color}>
                {item}
              </Tag>
            );
          })}
        </div>
        <div>
          <h1 className="text-xxs text-gray-700 font-semibold">Country</h1>
          {item?.country?.map((item) => {
            return (
              <Tag className="text-xxs" color="green">
                {item}
              </Tag>
            );
          })}
        </div>
      </div>
      <div className=" flex flex-1 justify-end items-end gap-1">
        {isInviteSendSuccess ? (
          <h1 className="text-xxs italic text-green">Invite Sent</h1>
        ) : (
          <Button
            loading={invitesentloading}
            onClick={() => {
              setInviteSentLoading(true);
              handleInviteSent();
            }}
            key={item}
            size="small"
          >
            Invite
          </Button>
        )}
      </div>
    </div>
  );
};

const CurrentInfluencers = ({ id }) => {
  const [currentInfluencers, setCurrentInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        "http://localhost:3000/brand/getcurrentworkinginfluencers/64078565f1116ce68f3aff06",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const currentInfluencerData = data.data.data.map((item) => {
        return {
          key: item["_id"],

          name: item?.to.name,
          status: "Active",
        };
      });
      setCurrentInfluencers(currentInfluencerData);
      setLoading(false);
    };
    fetch();
  }, [refresh]);

  return (
    <div className="p-4">
      <div className="my-2">
        <Button
          className="text-white bg-blue"
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          Refresh
        </Button>
      </div>
      <Table loading={loading} dataSource={currentInfluencers}>
        <Column title="Influencer Name" dataIndex="name" key="name"></Column>

        <Column
          title="Contract Status"
          dataIndex="status"
          key="status"
          render={(record) => {
            return <Tag color="green">Active</Tag>;
          }}
        ></Column>

        <Column
          title="Action"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Link className="link text-blue">View Contract</Link>
              </Space>
            );
          }}
        ></Column>
        <Column
          title="Influencer Profile"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Link className="link text-blue" onClick={() => {}}>
                  View Profile
                </Link>
              </Space>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
};
const ManageCampaignPage = () => {
  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [loadingInfluencers, setLoadingInfluencers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [influencerList, setInfluencerList] = useState([]);
  const [invitesentloading, setInviteSentLoading] = useState(false);
  const [user, setUser] = useState({});
  const { id } = useParams();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    console.log("the value in the state is ", id);
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        `http://localhost:3000/campaign/campaigns/details/` + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCampaign(data.data.data);
      setLoading(false);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setLoadingInfluencers(true);
      const data = await axios.get(
        "http://localhost:3000/brand/inviteinfluencers"
      );

      setInfluencerList(data?.data?.data);
      setLoadingInfluencers(false);
    };
    fetch();
    console.log(influencerList);
  }, [count]);

  return (
    <div>
      <Modal
        title="Invite influencers to campaign"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        {loadingInfluencers ? (
          <Skeleton active></Skeleton>
        ) : (
          <div className="flex flex-col h-80 overflow-y-auto">
            <h1>
              Here are some influencers that you can invite for the campaigns
            </h1>
            {influencerList.map((item) => {
              return (
                <ProfileDetails
                  key={item}
                  item={item}
                  id={id}
                  brandId={user?._id}
                ></ProfileDetails>
              );
            })}
          </div>
        )}
      </Modal>
      {loading ? null : (
        <div className="gap-4">
          <section className="container mx-auto px-[10%] gap-5">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div>
                  <h1 className="text-xl text-gray-800 font-semibold">
                    {campaign?.title}
                  </h1>
                  <p className="text-sm text-gray-800 font-semibold">
                    {dayjs(campaign?.deliveryDate).toDate().toLocaleString()}
                  </p>
                </div>
                <div>
                  <Tag color="green">{campaign?.status}</Tag>
                </div>
              </div>
            </div>
          </section>
          <section className="container mx-auto px-[10%] gap-5">
            <div className="flex flex-col  justify-center items-start">
              <div className="self-end">
                <Button
                  onClick={() => {
                    showModal(true);
                    setCount(count + 1);
                  }}
                  className="text-white bg-blue"
                >
                  Invite Influencers to campaign
                </Button>
              </div>
              <div className="w-full">
                <Tabs
                  type="card"
                  items={[
                    {
                      label: "Current Influencer",
                      key: 1,
                      children: (
                        <CurrentInfluencers
                          id={id}
                          userId={user?._id}
                        ></CurrentInfluencers>
                      ),
                    },
                    {
                      label: "Bids",
                      key: 2,
                      children: <Bids id={id} userId={user?._id} />,
                    },
                    {
                      label: "Sent Invites",
                      key: 3,
                      children: <Invites id={id} userId={user?._id} />,
                    },
                  ]}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ManageCampaignPage;
