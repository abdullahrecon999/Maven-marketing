import React, { useContext } from "react";
import { ChatContext } from "./ChatProvider";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Button } from "antd";
const Contract = ({ text, id }) => {
  const { openContract, setOpenContract, setId } = useContext(ChatContext);

  return (
    <div className="flex  p-2   rounded-md ">
      <div className="flex flex-col justify-center  w-[100%] ">
        <h1 className="text-base text-black  self px-2 ">Contract</h1>
        <div className="space-y-3 border-2 px-4 py-3 w-[100%] bg-white rounded-md">
          <h1 className="text-base text-black ">
            You have new contract available
          </h1>

          <Button
            onClick={() => {
              setOpenContract(true);
              setId(id);
            }}
            className="text-white bg-blue"
          >
            View
          </Button>
        </div>

        <p className=" text-black italic mt-2 px-3">{text}</p>
      </div>
    </div>
  );
};

export default Contract;

// const Contract = ({text, id})=>{
//     return (<div className='flex  p-4 border bg-white rounded-md shadow-xl'>
//             <div className="flex flex-col justify-center  w-[100%] ">
//                 <h1 className='text-base text-black font-railway self px-2 mb-3'>Contract</h1>
//                 <div className="space-y-3 border-2 px-4 py-3 w-[100%] bg-slate-50 rounded-md">
//                     <h1 className='text-xl font-railway'>Campaign Name</h1>
//                     <h3 className='text-xl font-railway'>Brand Name</h3>
//                     <DetailBox text="due date"></DetailBox>
//                     <button className='bg-green text-center text-white font-railway rounded-full px-3 py-2 hover:bg-grey'>View</button>

//                 </div>

//                 <p className='font-railway text-black italic mt-2 px-3'>{text}</p>

//             </div>
//     </div>)
// }
