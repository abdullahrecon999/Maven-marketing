import React, { useState, useEffect, useContext } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import masterCardPng from "../../images/mastercard-26161.png";
import { TextField } from "@mui/material";
import { DatePicker, Space, Button, Table } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InfluencerManagePaymentMethods from "./InfluencerManagePaymentMethods";
import SettingsIcon from "@mui/icons-material/Settings";
import { Skeleton } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import mastercard from "../../images/mastercard-26161.png";
import visaCard from "../../images/visa.png";
import { useQuery } from "react-query";
import { AuthContext } from "../../utils/authProvider";
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
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [isMainPageloading, setMainPageLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(["getinfluencerhistory"], () => {
    return axios.get(
      "http://localhost:3000/payments/getinfluencerhistory/" + user?._id
    );
  });
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // const fetch = async () => {
    //   setLoading(true);
    //   const data = await axios.get(
    //     "http://localhost:3000/payments/getinfluencerhistory/" + user?._id
    //   );

    const history = transactions?.data?.data?.map((item) => {
      return {
        key: item?.paymentFor,
        name: item?.userFrom.name,
        date: dayjs(item?.createAt).toDate().toLocaleDateString(),
        amount: item?.amount,
      };
    });
    //   setData(history);
    //   setLoading(false);
    // };
    setData(history);

    //fetch();
  }, [transactions]);
  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        "http://localhost:3000/payments/getaccountdetails/" + user?._id
      );
      if (Object.keys(data.data.data).length !== 0) {
        setAccountExists(true);
        setAccountData(data.data.data);
        console.log(data.data.data);
        setMainPageLoading(false);
      } else {
        setMainPageLoading(false);
      }
    };

    fetch();
  }, [user]);

  const handleSetUp = () => {
    setLoading(true);

    const fetch = async () => {
      const val = {
        id: user?._id,
        email: user?.email,
      };
      const data = await axios.post(
        "http://localhost:3000/payments/create",
        val
      );

      window.open(data?.data?.url, "_self");
    };
    fetch();
    setLoading(false);
  };
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
    <>
      {isMainPageloading ? (
        <div className="container mx-auto px-3 h-[70vh]">
          <Skeleton className="h-full" active></Skeleton>
        </div>
      ) : (
        <>
          {accountExists ? (
            <div className="container mx-auto grid grid-col-1  md:grid-cols-3 gap-3 my-4">
              <div className="col-span-2 grid grid-cols-1 gap-3">
                {/* top header */}
                <section className="grid grid-cols-3 bg-white rounded-lg p-5">
                  <div className=" flex justify-center items-center">
                    <h1 className="text-xl  text-gray-800 font-semibold">
                      Last 30 Days
                    </h1>
                  </div>

                  <div className=" flex flex-col items-center">
                    <h1 className="text-base text-gray-800 font-semibold">
                      Earnings
                    </h1>
                    <h1 className="text-xl text-gray-700 ">
                      {accountData?.total}
                    </h1>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <Button
                      className="bg-blue text-white"
                      onClick={() => window.open(accountData?.loginLink)}
                    >
                      View Stripe Dashoard
                    </Button>
                  </div>
                </section>
                {/* my balance */}
                <section className="flex space-x-3">
                  <div className="bg-white border rounded-md flex flex-1 flex-col space-y-3 p-4 ">
                    <h1 className="text-xl font-semibold ">My Balance</h1>
                    <div
                      className={` grid  md:grid-cols-2  py-4 px-4   space-x-0 space-y-2  rounded-lg md:flex-row md:space-x-2 md:space-y-0 `}
                    >
                      <div
                        className={`flex rounded-lg items-center space-x-4 px-3 py-2 ${
                          paymentTabs ? "bg-white " : ""
                        } justify-center  h-full  `}
                      >
                        <h1 className="">
                          <PaidIcon className="text-2xl"></PaidIcon>
                        </h1>
                        <div className="flex flex-col ">
                          <h1 className="text-gray-800 text-base font-semibold">
                            Available Balance
                          </h1>

                          <h1 className="text-2xl text-gray-700 font-bold">
                            $ {accountData?.available}
                          </h1>
                        </div>
                      </div>

                      <div
                        className={`flex rounded-lg items-center space-x-4 px-3 py-2 justify-center  h-full ${
                          !paymentTabs ? "bg-gray-300 shadow-sm" : ""
                        } `}
                      >
                        <h1 className="">
                          <PaidIcon className="text-5xl"></PaidIcon>
                        </h1>
                        <div className="flex flex-col ">
                          <h1 className="text-gray-800 text-base font-semibold">
                            Pending
                          </h1>
                          <h1 className="text-2xl text-gray-700 font-bold">
                            $ {accountData?.pending}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <section>
                <div className=" flex flex-col flex-[0.5]  bg-white border  rounded-lg p-5">
                  <div className="flex flex-col">
                    <div className="flex justify-between px-3">
                      <h1 className="text-xl text-gray-800 font-semibold">
                        Linked external accounts
                      </h1>
                    </div>
                    <p className="px-3">
                      All your payouts that are approved will be transfered to
                      this account
                    </p>
                  </div>
                  <div>
                    {false ? (
                      <div className="flex flex-col justify-center items-center p-12 space-y-3">
                        <h1 className="text-base text-gray-400">
                          no payment methods
                        </h1>

                        <label htmlFor="my-modal-3" className="btn">
                          Add new Payment method
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-col py-6 px-2">
                        {accountData?.cards?.data?.map((item) => {
                          return (
                            <div className="bg-slate-50 px-2 py-1">
                              <div className="flex ">
                                <img
                                  className="w-10 h-10"
                                  src={
                                    item.brand === "Visa"
                                      ? visaCard
                                      : mastercard
                                  }
                                  alt="tomatoes"
                                ></img>
                                <div className="flex justify-between w-full">
                                  <div className="flex flex-col pl-5 justify-center">
                                    <h1 className="text-sm text-gray-800 font-semibold">
                                      {item?.brand}
                                    </h1>
                                    <h1 className="text-sm text-gray-600">
                                      **** **** **** {item?.last4}
                                    </h1>
                                  </div>
                                  <div>
                                    <h1 className="text-sm text-gray-800">
                                      Exp date
                                    </h1>
                                    <p className="text-xs text-gray-600">
                                      {item?.exp_month}/{item?.exp_year}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="px-3 my-2">
                          <p className="text-sm">
                            Want to change external account?
                          </p>
                          <p className="text-xs">
                            <a
                              className="link text-blue"
                              href={accountData.loginLink}
                            >
                              {" "}
                              Login
                            </a>{" "}
                            to your stripe and and go to setting to change the
                            external account
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              {/* transactions */}
              <section className="col-span-3">
                <div className="flex flex-col w-full  px-5 py-3 bg-white rounded-lg">
                  <h1 className="text-gray-800 font-semibold text-xl">
                    Transactions
                  </h1>
                  <div className="p-2 ">
                    {isError ? (
                      <div className="flex justify-center items-center">
                        <h1 className="text-xl text-red-500 font-medium">
                          Something Went wrong
                        </h1>
                        <p className="text-sm text-gray-500">
                          Please check your internet connection or try again
                          later
                        </p>
                      </div>
                    ) : (
                      <Table
                        className="border rounded"
                        loading={isLoading}
                        dataSource={data}
                      >
                        <Table.Column
                          title="Brand Name"
                          dataIndex="name"
                          key="name"
                        ></Table.Column>

                        <Table.Column
                          title="Amount"
                          dataIndex="amount"
                          key="amount"
                        ></Table.Column>

                        <Table.Column
                          title="Date"
                          key="date"
                          dataIndex="date"
                        ></Table.Column>
                        <Table.Column
                          title="View Contract"
                          key="action"
                          render={(record) => {
                            return (
                              <Space size="middle">
                                <Link
                                  to={`/contract/${record.key}`}
                                  className="link text-blue"
                                >
                                  View Contract
                                </Link>
                              </Space>
                            );
                          }}
                        ></Table.Column>
                      </Table>
                    )}
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="container mx-auto">
              <div className="grid grid-cols-2 p-4">
                <div className="col-span-2">
                  <h1 className="text-xl text-gray-800 font-semibold">
                    Manage your finances
                  </h1>
                  <p className="text-base text-gray-600 ">
                    All your payements and balances are shown here
                  </p>
                </div>
                <div className="col-span-2 flex flex-col justify-center items-center min-h-[65vh] space-y-1">
                  <h1 className="text-xl text-gray-800 font-semibold">
                    No account found
                  </h1>
                  <p className="text-sm text-gray-600">
                    lets create your stripe account so you can recieve payments
                    from businesses
                  </p>
                  <Button
                    loading={loading}
                    onClick={handleSetUp}
                    rootClassName="text-white bg-blue my-2"
                  >
                    Lets set up your account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InfluencerPayments;
