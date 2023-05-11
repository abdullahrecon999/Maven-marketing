import React, { useEffect, useState } from "react";
import InfluencerGenaricModal from "../InfluencerComponents/InfluencerGenaricModal";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { TailSpin } from "react-loader-spinner";
const MyContainer = ({ className, children }) => {
  return (
    <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
      <CalendarContainer className={className}>
        <div style={{ background: "#f0f0f0" }}>What is your favorite day?</div>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};
const ContractModel = ({ handleClose, id }) => {
  const [bidData, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const { data } = useQuery(["getbiddetails"], () => {
    return axios.get(`http://localhost:3000/brand/getbiddetails/${id}`);
  });

  const { mutate, isLoading, isSuccess } = useMutation(() => {
    if (Object.keys(bidData).length !== 0) {
      const val = {
        campaignId: bidData?.campaignId["_id"],
        to: bidData?.sender["_id"],
        sender: bidData?.campaignId?.brand,
        accepted: false,
        amount: amount,
        expiresAt: startDate,
      };
      console.log(val);
      return axios.post("http://localhost:3000/brand/createContract", val);
    }
  });
  useEffect(() => {
    setData(data?.data?.data);
  }, [data]);
  return (
    <InfluencerGenaricModal>
      <div className="h-full flex flex-col justify-start ">
        <div className="flex justify-end bg-slate-200 ">
          <CloseIcon
            onClick={() => {
              handleClose();
            }}
            className=" hover:bg-slate-100"
          ></CloseIcon>
        </div>

        <div className="px-5">
          <h1 className="text-xl text-gray-900 font-railway">
            Contract Details
          </h1>
          <p className="text-sm text-gray-500 font-railway">
            Enter Contract details to set up the contract between the you and
            influencer
          </p>
        </div>
        <div className="flex-1 justify-start h-full px-5 mt-4  overflow-y-auto">
          <div className="space-y-5 mb-3">
            <h1 className="text-2xl font-railway ">
              {bidData?.campaignId?.title}
            </h1>
            <p className="text-sm text-gray-600">
              {bidData?.campaignId?.description}
            </p>
          </div>
          <div className="spa">
            <h1 className="text-2xl font-railway ">Influencer Information</h1>
            <h1 className="text-xl text-gray-600">{bidData?.sender?.name}</h1>
          </div>
          <form
            className="flex flex-col "
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            <div className="flex mt-7 w-[60%] justify-between">
              <div>
                <h1 className="text-xl font-railway">
                  Contract Amount <span className="text-red-500">*</span>
                </h1>
                <input
                  required
                  className="bg-slate-100 rounded-full px-2"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  placeholder="Enter amount"
                ></input>
              </div>
              <div>
                <h1 className="text-xl font-railway">
                  End Date <span className="text-red-500">*</span>
                </h1>
                <DatePicker
                  required
                  className="bg-slate-100 rounded-full px-2"
                  onChange={(date) => setStartDate(date)}
                  selected={new Date()}
                />
              </div>
              {/* {ashshjead} */}
            </div>
            <div className="flex h-56 justify-end">
              {!isSuccess && (
                <button
                  disable={isSuccess}
                  type="submit"
                  className="bg-blue btn hover:opacity-60 px-2 py-1 h-[50px] text-white font-railway rounded-full"
                >
                  create contract{" "}
                  {isLoading ? (
                    <TailSpin
                      height="20"
                      width="20"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : null}
                </button>
              )}

              {isSuccess && (
                <h1 className="text-green italic border border-green h-[30px] btn text-white font-railway bg-green  text-center">
                  Contract sent
                </h1>
              )}
            </div>
          </form>
        </div>
      </div>
    </InfluencerGenaricModal>
  );
};

export default ContractModel;
