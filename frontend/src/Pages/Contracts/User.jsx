import React, { useContext } from "react";
import profileImage from "../../images/profile.jpg";
import { Button, Tag } from "antd";
import { ContractContext } from "./ContractProvider";

const User = () => {
  const { user, contract } = useContext(ContractContext);

  return (
    <>
      {user?.role === "influencer" ? null : (
        <div className="border px-4 py-5 bg-white">
          <div className="flex flex-col w-full space-y-2">
            <h1 className="text-gray-600 text-sm font-medium">
              {contract?.to?.role}
            </h1>
            <div className="flex space-x-4 border-y py-3">
              <img
                className="w-[50px] h-[50px] rounded-full object-fit"
                src={contract?.to?.photo}
                alt="tomatoes are disgusting"
              ></img>
              <div>
                <h1 className="text-xl text-gray-800 font-semibold">
                  {contract?.to?.name}
                </h1>
                <div>
                  {contract?.to?.platforms?.map((item) => {
                    const color =
                      item === "Any"
                        ? "volcano"
                        : ["linkedIn", "Twitter", "Facebook"].includes(item)
                        ? "blue"
                        : "purple";
                    return (
                      <Tag key={item} color={color}>
                        {" "}
                        {item}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-row-reverse gap-3">
              <Button size="small" rootClassName="text-white bg-blue px-3 py-1">
                Chat
              </Button>
              <Button size="small" rootClassName=" font-semibold px-3 py-1">
                View Profile
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
