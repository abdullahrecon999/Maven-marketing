import React, { useContext, useEffect } from "react";
import ContractDetails from "./ContractDetails";
import { ContractProvider } from "./ContractProvider";
import { ContractContext } from "./ContractProvider";
import axios from "axios";
import useFetch from "../../utils/Hooks/useFetch";
const Contract = () => {
  const { contract, setContract } = useContext(ContractContext);

  const { data, loading, error } = useFetch(
    "http://localhost:3000/influencer/contractDetails/641591be9481d41b80f07ab5"
  );
  console.log("this is the damn loading" + loading);
  useEffect(() => {
    if (!loading) {
      setContract(data.data);
      console.log(contract, "this is the conrract in the main contrainer");
    }
  }, [data]);

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
