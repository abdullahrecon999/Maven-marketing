import React, { useEffect, useState, useRef } from "react";
import { Tabs, Skeleton, Button, Modal, Table, Space, Tag } from "antd";
import axios from "axios";
import { Elements, CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";
import image from "../../images/mastercard-26161.png";
import { Link } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51Kk9d7Bq8Z0lAI0snltQ0QOD7hs4xODeg3U5HrtjMobqdKVCUaYrzSv07IgLmquhG5itjtvBZqPPrL69n51qk8fZ007BqQe00i"
);
const PaymentHistory = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        "http://localhost:3000/payments/getbrandhistory/" + user?._id
      );

      const history = data.data.data.map((item) => {
        return {
          key: item?._id,
          name: item?.userTo.name,
          date: dayjs(item?.createAt).toDate().toLocaleDateString(),
          amount: item?.amount,
        };
      });
      setData(history);
      setLoading(false);
    };

    fetch();
  }, []);
  return (
    <div className="p-2">
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
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await axios.get(
        "http://localhost:3000/payments/getpendingPayment/64180cea09878a11f84d9b98"
      );
      console.log(data.data.data);
      setData(data.data.data);
      setLoading(false);
    };

    fetch();
  }, [user]);
  return (
    <div>
      <Table dataSource={data}>
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

const PaymentMethods = ({ id, clientSecret, paymentMethods }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customerId = useRef(id);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <PaymentElement></PaymentElement>
            <button type="submit">add payment method</button>
          </Elements>
        </form>
      </Modal>
      {paymentMethods.map((item) => {
        return (
          <div className="bg-slate-50 px-2 py-1">
            <div className="flex ">
              <img className="w-10 h-10" src={image}></img>
              <div className="flex justify-between w-full">
                <div className="flex flex-col pl-5 justify-center">
                  <h1 className="text-sm text-gray-800">{item?.card?.brand}</h1>
                  <h1 className="text-sm text-gray-600">
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
        <Button
          onClick={() => {
            showModal();
          }}
          className="text-white bg-blue"
        >
          Add a new payment method
        </Button>
      </div>
    </>
  );
};
const BrandPayments = () => {
  const [accountdata, setAccountData] = useState({});
  const [user, setUser] = useState({});
  const accountExists = useRef(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [clientSecret, setClientSecret] = useState({});

  useEffect(() => {
    setLoading(true);
    setUser(JSON.parse(localStorage.getItem("user")));
    const user = JSON.parse(localStorage.getItem("user"));
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

  useEffect(() => {
    const fetch = async () => {
      const paymentMethods = await axios.get(
        "http://localhost:3000/payments/getpaymentmethods/" +
          accountdata.accountId
      );

      setPaymentMethods(paymentMethods.data.paymentMethods);
    };
    fetch();
  }, [accountdata]);
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
              <PaymentMethods
                clientSecret={clientSecret}
                paymentMethods={paymentMethods}
                id={accountdata.accountId}
              ></PaymentMethods>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default BrandPayments;
