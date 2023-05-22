import React, { useState, useContext } from "react";
import profileImage from "../../images/profile.jpg";
import { Link } from "react-router-dom";
import { Button, Modal, Tag } from "antd";
import { WarningOutlined } from "@mui/icons-material";
import { ContractContext } from "./ContractProvider";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../../utils/authProvider";
const ContractInfo = () => {
  const { contract } = useContext(ContractContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setLoading(false);
    setSuccess(false);
  };
  const handleEndContract = async () => {
    setLoading(true);

    const data = await axios.post(
      "http://localhost:3000/brand/endcontract/" + contract?._id
    );
    console.log(data);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      window.location.reload(false);
    }, 3000);
  };
  return (
    <div className="border px-4 py-5 bg-white">
      <Modal
        title="End Contract"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <div>
            {success && <Tag color="green">Contract ended successfully</Tag>}
            <p className="text-orange-600 text-base font-semibold">
              <WarningOutlined></WarningOutlined> Are you sure that you want to
              end the contract?
            </p>
          </div>
          <p className="text-sm text-gray-700">
            The remaining contract payment will be sent to the influencer
          </p>
          <div className="flex flex-row-reverse gap-3 mt-4">
            <Button
              disabled={success}
              loading={loading}
              onClick={handleEndContract}
              rootClassName="text-white bg-red-600"
            >
              End Contract
            </Button>
            <Button onClick={() => handleCancel()}>Cancel </Button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col w-full space-y-2">
        <h1 className="text-gray-500 text-sm"> Contract Details</h1>
        <div className="flex flex-col  border-y py-3">
          <h1 className="font-railway text-gray-600">
            {contract?.expired ? "Expired" : "Active"}
          </h1>
          <h1 className="text-sm">
            Active since{" "}
            <span className="text-xs text-green opacity-70">
              {dayjs(contract?.createdAt).toDate().toLocaleDateString()}
            </span>
          </h1>
          <h1 className="text-sm">
            Expires At{" "}
            <span className="text-xs text-green opacity-70">
              {dayjs(contract?.expiresAt).toDate().toLocaleDateString()}
            </span>
          </h1>
          <Link
            to="/campaigndetails"
            state={{ id: contract?.campaignId?._id }}
            className="text-sm link text-blue"
          >
            View Original Campaign
          </Link>
        </div>
        {contract?.expired === true ? null : (
          <div className="flex flex-row-reverse">
            {user?.role !== "brand" ? null : (
              <Button
                onClick={() => {
                  showModal();
                }}
                rootClassName="text-white bg-blue px-2 py-1 "
              >
                End Contract
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractInfo;
