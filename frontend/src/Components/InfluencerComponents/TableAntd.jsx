import { Button, Space, Table, Tag } from "antd";
import React, { useContext } from "react";
import { InfluencerDashboardContext } from "./InfluencerDashboardContext";
const { Column } = Table;

const TableAntd = ({ data, open, type = "bid", children, loading }) => {
  const {
    setId,
    setInviteModal,
    setBidModal,
    setbidCounter,
    setInviteCounter,
    inviteCounter,
    bidCounter,
  } = useContext(InfluencerDashboardContext);
  return (
    <Table className="w-full" dataSource={data} loading={loading}>
      <Column
        title="Campaign Name"
        dataIndex="campaignName"
        key="campaignName"
      ></Column>
      <Column title="Brand name" dataIndex="brandName" key="brandName"></Column>
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
      {children}
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
              <Button
                onClick={() => {
                  if (type === "invite") {
                    setInviteCounter(inviteCounter + 1);
                    setInviteModal(true);
                  } else {
                    setbidCounter(bidCounter + 1);
                    setBidModal(true);
                  }
                  setId(record?.key);
                }}
              >
                View
              </Button>
            </Space>
          );
        }}
      ></Column>
    </Table>
  );
};

export default TableAntd;
