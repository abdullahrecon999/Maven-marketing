import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Tabs,
  Skeleton,
  Button,
  Modal,
  Table,
  Space,
  Tag,
  Spin,
  Input,
} from "antd";
import axios from "axios";
import { Elements, CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";
import image from "../../images/mastercard-26161.png";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { AuthContext } from "../../utils/authProvider";
import { Formik, Field, ErrorMessage } from "formik";
import addcardvalidation from "../../ValidationSchemas/addcardvalidation";
const stripePromise = loadStripe(
  "pk_test_51Kk9d7Bq8Z0lAI0snltQ0QOD7hs4xODeg3U5HrtjMobqdKVCUaYrzSv07IgLmquhG5itjtvBZqPPrL69n51qk8fZ007BqQe00i"
);
const PaymentHistory = () => {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const {
    data: history,
    isLoading,
    isError,
  } = useQuery(["getbrandhistory"], () => {
    return axios.get(
      "http://localhost:3000/payments/getbrandhistory/" + user?._id
    );
  });

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("user")));
    // const fetch = async () => {
    //   setLoading(true);
    //   const data = await axios.get(
    //     "http://localhost:3000/payments/getbrandhistory/" + user?._id
    //   );

    //   const history = data.data.data.map((item) => {
    //     return {
    //       key: item?._id,
    //       name: item?.userTo.name,
    //       date: dayjs(item?.createAt).toDate().toLocaleDateString(),
    //       amount: item?.amount,
    //     };
    //   });
    //   setData(history);
    //   setLoading(false);
    // };

    // fetch();

    if (history?.data?.data) {
      const historydata = history?.data?.data?.map((item) => {
        return {
          key: item?._id,
          name: item?.userTo?.name,
          date: dayjs(item?.createAt).toDate().toLocaleDateString(),
          amount: item?.amount,
        };
      });
      setData(historydata);
    }
  }, [history]);
  return (
    <div className="p-2">
      {isError && <Tag color="red">Something Went Wrong</Tag>}
      <Table loading={loading} dataSource={data}>
        <Table.Column
          title="Influencer Name"
          dataIndex="name"
          key="name"
        ></Table.Column>

        <Table.Column
          title="Amount"
          dataIndex="amount"
          key="amount"
        ></Table.Column>

        <Table.Column title="Date" key="date" dataIndex="date"></Table.Column>
        <Table.Column
          title="View Contract"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Link to={`/contract/${record.key}`} className="link text-blue">
                  View Contract
                </Link>
              </Space>
            );
          }}
        ></Table.Column>
      </Table>
    </div>
  );
};
const PendingPayment = () => {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const {
    data: pending,
    isLoading,
    isError,
  } = useQuery(["getPendingPayments"], () => {
    return axios.get(
      "http://localhost:3000/payments/getpendingPayment/" + user?._id
    );
  });
  useEffect(() => {
    if (pending?.data?.data) {
      setData(pending?.data?.data);
    }
    fetch();
  }, [pending]);
  return (
    <div>
      {isError && <Tag color="red">Something Went Wrong</Tag>}
      <Table loading={isLoading} dataSource={data}>
        <Table.Column
          title="Influencer Name"
          dataIndex="name"
          key="name"
        ></Table.Column>
        <Table.Column
          title="Campaign"
          dataIndex="campaign"
          key="campaing"
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
          render={(record) => {
            return <h1>{dayjs(record).toDate().toLocaleDateString()}</h1>;
          }}
        ></Table.Column>
        <Table.Column
          title="View Contract"
          key="action"
          render={(record) => {
            return (
              <Space size="middle">
                <Link to={`/contract/${record.key}`} className="link text-blue">
                  View Contract
                </Link>
              </Space>
            );
          }}
        ></Table.Column>
      </Table>
    </div>
  );
};
const items = [
  {
    key: "1",
    label: `Payment History`,
    children: [<PaymentHistory></PaymentHistory>],
  },
  {
    key: "2",
    label: `Pending Payments`,
    children: [<PendingPayment></PendingPayment>],
  },
];

const PaymentMethods = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const [paymentsMethodsData, setPaymentMethodsData] = useState([]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const {
    data: accountData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["getAccountDetails"], () => {
    return axios.get(
      "http://localhost:3000/payments/getbrandaccountdetails/" + user?._id
    );
  });

  // const { data: paymentMethods, isLoading: paymentMethodsIsLoading } = useQuery(
  //   ["getPaymentMethods"],
  //   () => {
  //     axios.get(
  //       "http://localhost:3000/payments/getpaymentmethods/" +
  //         accountData?.data?.data?.accountId
  //     );
  //   },
  //   [accountData]
  // );
  useEffect(() => {
    console.log(accountData);
  }, [accountData]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const {
    mutate,
    isLoading: attachingPaymentMethod,
    isSuccess: attacingPaymentMehtodSuccess,
    isError: attachIsError,
  } = useMutation(["attachpaymentmethod"], (val) => {
    console.log(accountData?.data?.accountId);

    return axios.post(
      "http://localhost:3000/payments/attachpaymentmethod/" +
        accountData?.data?.accountId,
      val
    );
  });
  const handleCancel = () => {
    if (attacingPaymentMehtodSuccess) {
      refetch();
    }
    setIsModalOpen(false);
  };
  // useEffect(() => {
  //   console.log("this is the payment methos", paymentMethods);
  // }, [paymentMethods]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spin></Spin>
      </div>
    );
  }
  return (
    <>
      <Modal
        title="Attach a Payment Method"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Formik
          initialValues={{
            number: "",
            exp_year: "",
            exp_month: "",
            cvc: "",
          }}
          validationSchema={addcardvalidation}
        >
          {(formik) => (
            <div className="grid grid-cols-2 gap-2">
              <h1 className="text-base text-gray-800 font-medium col-span-2">
                Card details
              </h1>
              <div className="col-span-2">
                <h1 className="text-sm text-gray-800 font-medium ">
                  Card Number
                </h1>
                <Field name="number">
                  {({ field }) => (
                    <Input {...field} placeholder="4242424242424242"></Input>
                  )}
                </Field>
                <ErrorMessage
                  className="text-red-500 text-xs"
                  component="div"
                  name="number"
                ></ErrorMessage>
              </div>
              <div className="col-span-1">
                <h1 className="text-sm text-gray-800 font-medium ">
                  Expiry Month
                </h1>
                <Field name="exp_month">
                  {({ field }) => <Input {...field} placeholder="MM"></Input>}
                </Field>
                <ErrorMessage
                  className="text-red-500 text-xs"
                  component="div"
                  name="exp_month"
                ></ErrorMessage>
              </div>
              <div className="col-span-1">
                <h1 className="text-sm text-gray-800 font-medium ">
                  Expiry Year
                </h1>
                <Field name="exp_year">
                  {({ field }) => <Input {...field} placeholder="YYYY"></Input>}
                </Field>
                <ErrorMessage
                  className="text-red-500 text-xs"
                  component="div"
                  name="exp_year"
                ></ErrorMessage>
              </div>
              <div className="col-span-2">
                <h1 className="text-sm text-gray-800 font-medium ">
                  CVC Number
                </h1>
                <Field name="cvc">
                  {({ field }) => (
                    <Input {...field} placeholder="3 digit CVC"></Input>
                  )}
                </Field>
                <ErrorMessage
                  className="text-red-500 text-xs"
                  component="div"
                  name="cvc"
                ></ErrorMessage>
              </div>
              <div className="col-span-2 flex flex-row-reverse">
                <Button
                  loading={attachingPaymentMethod}
                  disabled={attacingPaymentMehtodSuccess}
                  onClick={() => {
                    mutate(formik.values);
                  }}
                  className="text-white bg-blue"
                >
                  Add Payment Method
                </Button>
                {attacingPaymentMehtodSuccess && (
                  <Tag color="green">Card added Successfully</Tag>
                )}
              </div>
            </div>
          )}
        </Formik>
      </Modal>
      {accountData?.data?.data?.map((item) => {
        return (
          <div className="bg-slate-50 px-2 py-1">
            <div className="flex ">
              <img className="w-10 h-10" src={image}></img>
              <div className="flex justify-between w-full">
                <div className="flex flex-col pl-5 justify-center">
                  <h1 className="text-sm text-gray-800">{item?.card?.brand}</h1>
                  <h1 className="text-sm text-gray-600 font-medium">
                    **** **** **** {item?.card?.last4}
                  </h1>
                </div>
                <div>
                  <h1 className="text-sm text-gray-800">Exp date</h1>
                  <p className="text-xs text-gray-600">
                    {item?.card?.exp_month}/{item?.card?.exp_year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="my-2 flex flex-row-reverse">
        {accountData?.data?.data?.length === 0 ? (
          <Button
            onClick={() => {
              showModal();
            }}
            className="text-white bg-blue"
          >
            Add a new payment method
          </Button>
        ) : null}
      </div>
    </>
  );
};
const BrandPayments = () => {
  const [accountdata, setAccountData] = useState({});
  const { user, setUser } = useContext(AuthContext);
  const accountExists = useRef(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [clientSecret, setClientSecret] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      const data = await axios.get(
        "http://localhost:3000/payments/getbrandaccountdetails/" + user?._id
      );
      if (Object.keys(data?.data?.data).length !== 0) {
        accountExists.current = true;

        setAccountData(data?.data?.data);

        // if (Object.keys(paymentMethods?.data?.paymentMethods).length !== 0) {
        //   setPaymentMethods(paymentMethods?.data?.paymentMethods);
        //   console.log(paymentMethods?.data?.paymentMethods);
        // }

        // const clientSecret = await axios.get(
        //   "http://localhost:3000/payments/getsecret/" + accountdata.accountId
        // );

        // setClientSecret(clientSecret?.data?.data);
      }
    };

    fetch();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto my-auto">
      <React.Fragment>
        {loading ? (
          <div className="h-[80vh]">
            <Skeleton className="h-full" active></Skeleton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-7 bg-white rounded-md border gap-3 px-3">
            <div className="col-span-7  px-4 py-5">
              <h1 className="text-xl text-gray-800 font-semibold">Payments</h1>
            </div>
            <div className=" col-span-1 md:col-span-5  p-4  border rounded ">
              <Tabs defaultActiveKey="1" items={items} />
            </div>
            <div className=" col-span-1 md:col-span-2 border p-4  ">
              <h1 className="text-base text-gray-800 font-medium">
                Payment Methods
              </h1>
              <PaymentMethods></PaymentMethods>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default BrandPayments;
