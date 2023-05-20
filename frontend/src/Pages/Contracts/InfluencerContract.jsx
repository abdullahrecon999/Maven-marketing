import React, { useContext, useEffect, useState } from "react";
import ContractDetails from "./ContractDetails";
import { ContractProvider } from "./ContractProvider";
import { ContractContext } from "./ContractProvider";
import axios from "axios";
import useFetch from "../../utils/Hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Spin } from "antd";
const Contract = () => {
  const { setContract, setUser } = useContext(ContractContext);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { data, isLoading } = useQuery(["getcontract"], () => {
    return axios.get("http://localhost:3000/brand/getcontractdetails/" + id);
  });
  useEffect(() => {
    if (data?.data?.data) {
      setContract(data?.data?.data);
    }
  }, [data]);
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  //   const fetch = async () => {
  //     setLoading(true);
  //     const data = await axios.get(
  //       "http://localhost:3000/brand/getcontractdetails/" + id
  //     );

  //     console.log(data.data.data, "this is the data in the contract");
  //     setContract(data.data.data);
  //     setLoading(false);
  //   };
  //   fetch();
  // }, []);
  // const { data, loading, error } = useFetch(
  //   "http://localhost:3000/influencer/contractDetails/641591be9481d41b80f07ab5"
  // );
  // console.log("this is the damn loading" + loading);
  // useEffect(() => {
  //   if (!loading) {
  //     setContract(data.data);
  //     console.log(contract, "this is the conrract in the main contrainer");
  //   }
  // }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <Spin></Spin>
      </div>
    );
  }
  return (
    <React.Fragment>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="my-[4%]">
              <ContractDetails></ContractDetails>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
const InfluencerContract = () => {
  return (
    <ContractProvider>
      <Contract />
    </ContractProvider>
  );
};

export default InfluencerContract;
