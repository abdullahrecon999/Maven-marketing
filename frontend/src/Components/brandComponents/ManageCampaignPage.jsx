import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import profileImage from "../../images/profile.jpg";
import { Tabs, Table, Tag, Button, Space, Modal, Skeleton } from "antd";
const { Column } = Table;
const Bids = () => {
  const [bids, setBids] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        `http://localhost:3000/brand/getallbids/64180cea09878a11f84d9b98`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      const bidsData = data.data.data.map((item) => {
        return {
          key: item["_id"],
          campaignName: item?.campaignId?.title,
          brandName: item?.to.name,
          platforms: item?.campaignId?.platform,
          submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
          status: item?.rejected ? "Rejected" : "Pending",
        };
      });
      setBids(bidsData);
    };
    fetch();
  }, []);
  return (
    <div className="p-4">
      <Table>
        <Column
          title="Campaign Name"
          dataIndex="campaignName"
          key="campaignName"
        ></Column>
        <Column
          title="Brand name"
          dataIndex="brandName"
          key="brandName"
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
              record.status === "Pending"
                ? "purple"
                : record.status === "Rejected"
                ? "red"
                : "green";
            return <Tag color="red">Pending</Tag>;
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

const Invites = () => {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    // const fetch = async () => {
    //   const data = await axios.get(
    //     `http://localhost:3000/influencer/getInvites/}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(data);
    //   const bidsData = data.data.data.map((item) => {
    //     return {
    //       key: item["_id"],
    //       campaignName: item?.campaignId?.title,
    //       brandName: item?.to.name,
    //       platforms: item?.campaignId?.platform,
    //       submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
    //       status: item?.rejected ? "Rejected" : "Pending",
    //     };
    //   });
    //   setBids(bidsData);
    // };
    // fetch();
  }, []);

  return (
    <div className="p-4">
      <Table>
        <Column
          title="Campaign Name"
          dataIndex="campaignName"
          key="campaignName"
        ></Column>
        <Column
          title="Brand name"
          dataIndex="brandName"
          key="brandName"
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
              record.status === "Pending"
                ? "purple"
                : record.status === "Rejected"
                ? "red"
                : "green";
            return <Tag color="red">Pending</Tag>;
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

const CurrentInfluencers = () => {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    // const fetch = async () => {
    //   const data = await axios.get(
    //     `http://localhost:3000/influencer/getInvites/}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(data);
    //   const bidsData = data.data.data.map((item) => {
    //     return {
    //       key: item["_id"],
    //       campaignName: item?.campaignId?.title,
    //       brandName: item?.to.name,
    //       platforms: item?.campaignId?.platform,
    //       submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
    //       status: item?.rejected ? "Rejected" : "Pending",
    //     };
    //   });
    //   setBids(bidsData);
    // };
    // fetch();
  }, []);

  return (
    <div className="p-4">
      <Table>
        <Column
          title="Campaign Name"
          dataIndex="campaignName"
          key="campaignName"
        ></Column>
        <Column
          title="Brand name"
          dataIndex="brandName"
          key="brandName"
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
              record.status === "Pending"
                ? "purple"
                : record.status === "Rejected"
                ? "red"
                : "green";
            return <Tag color="red">Pending</Tag>;
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
const ManageCampaignPage = () => {
  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [loadingInfluencers, setLoadingInfluencers] = useState(false);
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
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        `http://localhost:3000/campaign/campaigns/details/64078565f1116ce68f3aff06`,
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
    const fetchInfluencer = () => {};
    console.log("sadajfiajsdnc");
  }, [count]);
  return (
    <div>
      <Modal
        title="Invite influencers to campaign"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {loadingInfluencers ? (
          <Skeleton active></Skeleton>
        ) : (
          <div className="flex flex-col">
            <h1>
              Here are some influencers that you can invite for the campaigns
            </h1>
            <div className="flex px-2 py-1 border rounded gap-4">
              <div className="flex justify-center items-center">
                <img src={profileImage} className="w-[50px] h-[50px]"></img>
              </div>
              <div>
                <h1>Name</h1>
                <div>
                  <h1>Platforms</h1>
                  <Tag color="green">Twitter</Tag>
                </div>
              </div>
              <div className=" flex flex-1 justify-end items-end gap-1">
                <Button size="small">View Profile</Button>
                <Button className="text-white bg-blue" size="small">
                  Invite for Campaign
                </Button>
              </div>
            </div>
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
                      children: <CurrentInfluencers></CurrentInfluencers>,
                    },
                    {
                      label: "Bids",
                      key: 2,
                      children: <Bids />,
                    },
                    {
                      label: "Accepted Invites",
                      key: 3,
                      children: <Invites />,
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
