import React, { useContext } from "react";
import User from "./User";
import ContractInfo from "./ContractInfo";
import Container from "./WorkTrack/Container";
import { ContractContext } from "./ContractProvider";
import { Button, Tag } from "antd";
const ContractDetails = () => {
  const { contract } = useContext(ContractContext);

  return (
    <div className="container mx-auto">
      {console.log(contract)}
      <div className="flex flex-col space-y-2">
        <h1 className="px-9 text-xl font-railway"></h1>
        <div className="flex flex-col justify-center space-y-3 px-5 md:flex-row md:space-y-0">
          <div className="flex-1 ">
            {/* Top header */}
            <div className="flex flex-col mx-3 border shadow-sm rounded-md px-8 py-3">
              <div className="grid grid-cols-5 gap-4 mb-3">
                <div>
                  <h1 className="text-base font-semibold text-gray-700">
                    Campaign Name
                  </h1>
                  <h1 className="text-xl text-gray-800 font-semibold">Name</h1>
                </div>
                <div className="col-span-2">
                  <h1 className="text-base font-semibold text-gray-700">
                    Platforms
                  </h1>
                  <div className=" gap-1">
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                    <Tag color="red">Name</Tag>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                <h1 className="text-sm  text-gray-700 font-medium">Amount</h1>
                <h1 className="text-xl text-gray-800 ">$ 17000</h1>
              </div>
            </div>

            {/* Work Tracker */}
            <Container></Container>
          </div>
          <div className="flex-[0.45] flex-col space-y-2">
            <User></User>
            <ContractInfo></ContractInfo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
