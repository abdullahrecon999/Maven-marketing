import React, { useState, useEffect, useContext } from "react";
import BidsTable from "./table";
import Search from "./Search";
import { useQuery } from "react-query";
import axios from "axios";
import { AuthContext } from "../../utils/authProvider";
import InfluencerGenaricModal from "./InfluencerGenaricModal";
import CloseIcon from "@mui/icons-material/Close";
import DetailBox from "./DetailBox";
import Loader from "./Loader";
import { Button, Space, Table, Tag } from "antd";
import TableAntd from "./TableAntd";
import dayjs from "dayjs";
import { InfluencerDashboardContext } from "./InfluencerDashboardContext";

const { Column } = Table;
// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "title",
//     headerName: "Campaign Title",
//     width: 150,
//   },
//   {
//     field: "brandName",
//     headerName: "Brand Name",
//     width: 150,
//   },
//   {
//     field: "submittedAt",
//     headerName: "Submitted At",

//     width: 110,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 110,
//   },
// ];

const Modal = ({ onClose, id }) => {
  const {
    isLoading,
    data: bidDetails,
    isError,
    isSuccess,
  } = useQuery(["getbidDetails"], () => {
    return axios.get(`http://localhost:3000/influencer/bidDetails/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  });
  const handleClose = () => {
    onClose();
  };

  if (isError) {
    return <div>errorr</div>;
  }
  return (
    <InfluencerGenaricModal>
      <div className="flex justify-end bg-slate-200">
        <CloseIcon
          onClick={() => {
            handleClose();
          }}
          className=" hover:bg-slate-100"
        ></CloseIcon>
      </div>
      {isLoading ? (
        <Loader title="Please Wait" subtitle="bid details are being loaded" />
      ) : (
        <div className=" h-full">
          <h1 className="text-2xl bg-slate-200 py-2 border-b-2 mt-0 border px-4 text-gray-800 font-railway">
            Bid Details
          </h1>

          <div className="px-4 flex flex-col h-full bg-pink">
            <div>
              <p className="text-3xl text-black font-railway ">
                {bidDetails?.data?.data?.to?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-railway text-xl ">
                {bidDetails.data.data.campaignId.title}
              </p>
            </div>
            <p className="mt-7 text-base text-stone-500 font-light font-railway">
              {bidDetails.data.data.discription}
            </p>
            <div className="w-[50%] mt-10">
              <h1 className="text-grey-500 font-semibold"> Submitted at</h1>
              <DetailBox text={bidDetails.data.data.createdAt}></DetailBox>
            </div>

            <div className="w-[50%] mt-10">
              <h1 className="text-grey-500 font-semibold"> Proposal Amount</h1>
              <DetailBox text={bidDetails.data.data.amount}></DetailBox>
            </div>
          </div>
        </div>
      )}
    </InfluencerGenaricModal>
  );
};
const Bids = () => {
  const { query, setQuery } = useState("");
  const [data, setData] = useState({});
  const [close, setClose] = useState(false);
  const [id, setId] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { openBidModal, setBidModal } = useContext(InfluencerDashboardContext);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const {
    isLoading,
    data: bids,
    isError,
    isSuccess,
    status,
  } = useQuery(["getbids"], () => {
    console.log(user["_id"]);
    return axios.get(`http://localhost:3000/influencer/myBids/${user["_id"]}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  });

  useEffect(() => {
    if (isSuccess) {
      const data = bids?.data.data.map((item, i) => {
        return {
          key: item["_id"],
          campaignName: item?.campaignId?.title,
          brandName: item?.to.name,
          platforms: item?.campaignId?.platform,
          submitAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
          status: item?.rejected ? "Rejected" : "Pending",
        };
      });
      setData(data);
    }
  }, [bids?.data?.data, isSuccess]);

  const handleSetSearch = (value) => {
    setQuery(value);
    console.log(query);
  };

  const handleOpen = (id) => {
    setId(id);
    setClose(true);
  };

  const search = () => {};

  const handleClose = () => {
    setClose(!close);
  };

  if (isError) {
    return <div>error</div>;
  }
  return (
    <div className=" px-[10%]">
      {/* {close && <Modal onClose={handleClose} id={id} onOpen={handleOpen} />} */}

      <>
        <div className=" flex flex-col items-center shadow-md h-100 p-10 rounded-xl  bg-white ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
          <div className="flex flex-col self-start items-start mb-2 md:flex-row">
            <div className="self-start">
              <h1 className="text-xl self-start md:text-2xl text-gray-800 mb-1 pl-4">
                Your Bids here
              </h1>

              <p className="text-xs self-start text-grey mb-4 pl-4 md:text-sm">
                All of the bids that you submitted and aare pendeling approval
                are displayed here
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md w-full flex justify-center  border ">
            {/* {Object.keys(data).length === 0 ? null : ( */}
            {/* // console.log("this is the data", data) */}
            <TableAntd
              className="w-full"
              data={Object.keys(data).length === 0 ? [] : data}
              open={handleOpen}
            >
              <Column
                title="Submited At"
                dataIndex="submitAt"
                key="submitAt"
              ></Column>
            </TableAntd>
            {/* )} */}

            {/* {data === "undefined" ? null : (
                    <BidsTable
                      rows={data}
                      onOpen={handleOpen}
                      columns={columns}
                    ></BidsTable>
                  )} */}
          </div>
        </div>
      </>
    </div>
  );
};
const InfluencerBids = () => {
  return <>{true && <Bids />}</>;
};

export default InfluencerBids;
