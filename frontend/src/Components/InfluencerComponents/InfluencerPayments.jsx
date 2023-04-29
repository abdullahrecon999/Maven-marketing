import React, { useState } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import masterCardPng from "../../images/mastercard-26161.png";
import { Button, TextField } from "@mui/material";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InfluencerManagePaymentMethods from "./InfluencerManagePaymentMethods";
import SettingsIcon from "@mui/icons-material/Settings";
dayjs.extend(customParseFormat);

const dateFormat = "YYYY/MM/DD";

const ManageModal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative h-[70vh]">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add New Payment Method</h3>

          <form>
            <div className="flex flex-col space-y-5 mt-2">
              <TextField
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                }}
                inputProps={{
                  style: {
                    height: "8px",
                  },
                }}
                placeholder="Card Number *"
                label="Card Number *"
                required
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    paddingBottom: 12,
                  },
                }}
              ></TextField>
              <div className="flex justify-between space-x-2">
                <Space className="w-[80%]" direction="vertical">
                  <DatePicker
                    size="large"
                    style={{ height: "100%" }}
                    className="w-full bg"
                    rootClassName="h-full"
                    aria-required
                    defaultValue={dayjs("2015/01/01", dateFormat)}
                    format={dateFormat}
                    placeholder="Card Expiry Date"
                  />
                </Space>
                <TextField
                  sx={{
                    backgroundColor: "white",
                  }}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                  required
                  placeholder="CVV*"
                  label="CVV*"
                  InputLabelProps={{
                    style: {
                      fontSize: "15px",
                      paddingBottom: 12,
                    },
                  }}
                ></TextField>
              </div>
              <TextField
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                }}
                inputProps={{
                  style: {
                    height: "8px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    paddingBottom: 12,
                  },
                }}
                placeholder="Enter card holder name"
                label="Card Holder Name"
                required
              ></TextField>
              <Button variant="contained" sx={{ color: "primary" }}>
                Contained
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const InfluencerPayments = () => {
  const [paymentTabs, setPaymentTabs] = useState(true);
  const handleChangeTabs = (e) => {
    console.log(e.nativeEvent.target.id);
    const id = e.nativeEvent.target.id;
    if (id === "available") {
      setPaymentTabs(true);
    } else if (id === "pending") {
      setPaymentTabs(false);
    }
  };
  return (
    <div className="container mx-auto space-y-4">
      <ManageModal></ManageModal>
      <InfluencerManagePaymentMethods></InfluencerManagePaymentMethods>
      <section className="flex justify-evenly bg-gray-200 rounded-lg p-5">
        <div className="w-[33%] flex justify-start items-center">
          <h1 className="text-2xl  text-gray-800 font-bold">Last 30 Days</h1>
        </div>
        <div className="w-[33%] flex flex-col items-center">
          <h1 className="text-2xl text-gray-800 font-bold">Transactions</h1>
          <h1 className="text-3xl text-gray-700 ">30</h1>
        </div>
        <div className="w-[33%] flex flex-col items-center">
          <h1 className="text-2xl text-gray-800 font-bold">Earnings</h1>
          <h1 className="text-3xl text-gray-700 ">$123456</h1>
        </div>
      </section>
      <section className="flex space-x-3">
        <div className="bg-gray-200 flex flex-1 flex-col space-y-3 p-4 rounded-lg">
          <h1 className="text-xl font-railway">My Balance</h1>
          <div
            className={`flex flex-col w-full justify-center py-4 px-4 h-[30vh]  space-x-0 space-y-2  rounded-lg md:flex-row md:space-x-2 md:space-y-0 `}
          >
            <div
              className={`flex rounded-lg items-center space-x-4 px-3 py-2 ${
                paymentTabs ? "bg-gray-300 shadow-sm" : ""
              } justify-center w-[40%] h-full  `}
            >
              <h1 className="">
                <PaidIcon className="text-5xl"></PaidIcon>
              </h1>
              <div className="flex flex-col ">
                <h1 className="text-gray-600 text-xl font-semibold">
                  Available Balance
                </h1>

                <h1 className="text-2xl text-gray-700 font-bold">$1235</h1>
                <h1
                  onClick={(e) => {
                    handleChangeTabs(e);
                  }}
                  id="available"
                  className="link text-blue font-semibold text-sm"
                >
                  View Transactions
                </h1>
              </div>
            </div>

            <div
              className={`flex rounded-lg items-center space-x-4 px-3 py-2 justify-center w-[40%] h-full ${
                !paymentTabs ? "bg-gray-300 shadow-sm" : ""
              } `}
            >
              <h1 className="">
                <PaidIcon className="text-5xl"></PaidIcon>
              </h1>
              <div className="flex flex-col ">
                <h1 className="text-gray-600 text-xl font-semibold">Pending</h1>
                <h1 className="text-2xl text-gray-700 font-bold">$1235</h1>
                <h1
                  onClick={(e) => {
                    handleChangeTabs(e);
                  }}
                  id="pending"
                  className="link text-blue font-semibold text-sm"
                >
                  View
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col flex-[0.5] p-4 bg-gray-100 rounded-lg p-5">
          <div className="flex justify-between px-3">
            <h1 className="text-xl text-gray-800 font-semibold">
              Payment Methods
            </h1>
            <label
              htmlFor="managePayments"
              className="text-gray-700 hover:text-gray-800 hover:scale-125"
            >
              <SettingsIcon></SettingsIcon>
            </label>
          </div>
          <div>
            {false ? (
              <div className="flex flex-col justify-center items-center p-12 space-y-3">
                <h1 className="text-base text-gray-400">no payment methods</h1>

                <label htmlFor="my-modal-3" className="btn">
                  Add new Payment method
                </label>
              </div>
            ) : (
              <div className="flex flex-col py-6 px-2">
                <div className="flex justify-evenly items-center p-2 border bg-white ">
                  <img
                    src={masterCardPng}
                    alt="andjahs"
                    className="w-[30px] h-[30px]"
                  ></img>
                  <h1 className="text-sm font-semibold text-gray-800">
                    Master Card 1245*******789
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex w-full h-[60vh] bg-gray-200 rounded-lg">
          <h1>Transactions</h1>
        </div>
      </section>
    </div>
  );
};

export default InfluencerPayments;
