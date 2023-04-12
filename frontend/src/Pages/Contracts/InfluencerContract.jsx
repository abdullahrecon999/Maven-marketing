import React, {useContext, useEffect} from "react";
import ContractDetails from "./ContractDetails";
import { ContractProvider } from "./ContractProvider";
import {ContractContext} from "./ContractProvider"
import axios from 'axios'
import useFetch from "../../utils/Hooks/useFetch";
const Contract = ()=>{
  const {contract, setContract} = useContext(ContractContext)

  const {data, loading, error} = useFetch("http://localhost:3000/influencer/contractDetails/641591be9481d41b80f07ab5")
  console.log("this is the damn loading"+loading)
  useEffect(()=>{
    
    setContract(data.data)
    console.log(contract)
  },[data])
  

  return (
  <React.Fragment>
    {loading?<div>loading</div>:
      <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="my-[4%]">
          <ContractDetails></ContractDetails>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="p-4  w-96 bg-base-100 text-base-content rounded-l-xl">
          <div className="flex flex-col">
            <h1 className="text-gray-800 font-railway">End Contract and Request for payment</h1>
            <h1 className="text-gray-400 font-railway text-sm">Contract Details</h1>
            <ul className="px-1">
    
              <li className="font-railway text-base text-gray-800">{(!contract?.expired && contract?.accepted)?"Active":"Expired"}</li>
              <li className="">Remainging Days</li>
              <li>Expires At</li>
              <li> Amount Paid 10 $</li>
              <li>Amount Remaining</li>
              <input type="text" />
            </ul>
            <label className="btn">Request Payment</label>
            
          </div>
        </div>
      </div>
    
      
      
    </div>
    }
  </React.Fragment>
)
}
const InfluencerContract = () => {
  
  return (
    <ContractProvider>
      <Contract/>
    </ContractProvider>
  );
};

export default InfluencerContract;
