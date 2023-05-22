import React, { useState, useEffect, useContext } from "react";

import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { AuthContext } from "../../utils/authProvider";
import InfluencerGenaricModal from "./InfluencerGenaricModal";
import CloseIcon from "@mui/icons-material/Close";
import DetailBox from "./DetailBox";
import { Link } from "react-router-dom";
import PageviewIcon from "@mui/icons-material/Pageview";
import dayjs from "dayjs";
import { useNavigation } from "react-router-dom";
import TableAntd from "./TableAntd";
import { Table } from "antd";
const { Column } = Table;
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Campaign Title",
    width: 150,
  },
  {
    field: "brandName",
    headerName: "Brand Name",
    width: 150,
  },
  {
    field: "submittedAt",
    headerName: "Recieved At",

    width: 110,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 110,
  },
];

const Initialbids = () => {
  return (
    <div className=" px-[20%] w-full">
      <div className=" flex flex-col justify-center items-center rounded-t-lg border-2 h-[60vh] bg-slate-50">
        <h1 className="text-xl md:text-4xl text-black font-railway">
          Oppps! so Empty
        </h1>
        <p className="text-base text-center md:text-xl text-gray-500 font-railway">
          Go the the campaigns and place some bids
        </p>
      </div>
    </div>
  );
};

const Modal = ({ onClose, id }) => {
  const {
    isLoading,
    data: bidDetails,
    isError,
    isSuccess,
    status,
  } = useQuery(["getInvites"], () => {
    return axios.get(`http://localhost:3000/influencer/invites/detail/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  });

  const handleClose = () => {
    onClose();
  };

  const handleInviteAccept = () => {
    return axios.post(
      `http://localhost:3000/influencer/invite/accept/${id}`,
      {
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const handleDeclineAccept = (id) => {
    return axios.post(
      `http://localhost:3000/influencer/invite/reject/${id}`,
      {
        accepted: false,
        rejected: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const {
    mutate,
    isLoading: isAccepting,
    isSuccess: isAcceptingSuccess,
  } = useMutation(handleInviteAccept);

  if (isLoading) {
    return <div>loading</div>;
  }

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
          className="self-end hover:bg-slate-100"
        ></CloseIcon>
      </div>
      <h1 className="text-2xl bg-slate-200 text-gray-800 py-2 border-2 font-railway">
        Invite Details
      </h1>
      <hr></hr>

      <div>
        <p className="text-2xl px-2 text-black font-railway ">
          {bidDetails.data.data.campaignId.title}
        </p>
      </div>
      <div className="flex-1 mb-6">
        <p className=" px-2 text-grey text-base">
          {bidDetails.data.data.campaignId.description}
        </p>
      </div>
      <div className="px-2">
        <h1 className="text-black font-railway text-base"> Platforms</h1>
        <div className="flex flex-wrap">
          {bidDetails.data.data.campaignId.platform.map((item) => {
            return <DetailBox text={item} key={item}></DetailBox>;
          })}
        </div>
      </div>
      <div className="flex space-x-4 px-2">
        <div>
          <h1 className="text-black font-railway text-base"> Recieved At</h1>
          <DetailBox text={bidDetails.data.data.updatedAt}></DetailBox>
        </div>

        <div>
          <h1 className="text-black font-railway text-base"> Compensation</h1>
          <DetailBox text={"cash"}></DetailBox>
        </div>
      </div>
      <div className="w-[30%] my-6 px-4">
        <Link
          to="/campaigndetails"
          state={{
            id: bidDetails.data.data.campaignId["_id"],
            inviteId: bidDetails.data.data["_id"],
            invite: true,
          }}
        >
          <h1 className="text-white bg-blue text-xl text-center font-railway border rounded-full py-1 px-2 hover:bg-indigo-500 shadow-lg">
            <PageviewIcon></PageviewIcon>View Campaign
          </h1>
        </Link>
      </div>

      <hr></hr>
      <div className="flex self-stretchs space-x-3 px-4 my-3">
        <button
          onClick={() => {
            handleInviteAccept();
          }}
          className="text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey"
        >
          Accept
        </button>
        <button className="text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey">
          Decline
        </button>
      </div>
      {isAcceptingSuccess ? (
        <p className="text-red-500 text-xl">invite accepted successfull</p>
      ) : null}
    </InfluencerGenaricModal>
  );
};
const Bids = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [close, setClose] = useState(false);
  const [id, setId] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const {
    isLoading,
    data: bids,
    isError,
    isSuccess,
    status,
  } = useQuery(
    ["getinvites"],
    () => {
      return axios.get(
        `http://localhost:3000/influencer/getInvites/${user["_id"]}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    },
    {
      refetchInterval: 2000,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const data = bids?.data.data.map((item, i) => {
        console.log(item);
        return {
          key: item["_id"],
          campaignName: item?.campaignId?.title,
          brandName: item?.sender?.name,
          platforms: item?.campaignId?.platform,
          recievedAt: dayjs(item?.createdAt).toDate().toLocaleTimeString(),
          status: item?.rejected
            ? "Rejected"
            : item?.accepted
            ? "Accepted"
            : "Pending",
        };
      });
      console.log(data);
      setData(data);
    }
  }, [isSuccess, status, bids]);

  const handleSetSearch = (value) => {
    setQuery(value);
  };

  const handleOpen = (id) => {
    setId(id);
    setClose(true);
  };

  const handleClose = () => {
    setClose(!close);
  };

  if (isError) {
    return (
      <div className="px-[10%] justify-center items-center ">
        <h1 className="text-xl text-red-500 font-medium">
          Oppss something went wrong
        </h1>
        <p className="text-sm text-gray-500">
          Something went wrong. Check your internet connect or try again later
        </p>
      </div>
    );
  }
  return (
    <>
      <div className=" px-[10%]">
        {/* {close && <Modal onClose={handleClose} id={id} onOpen={handleOpen} />} */}

        {!close && (
          <>
            <div className=" flex flex-col items-center shadow-md h-100 p-10 rounded-xl  bg-white ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
              <div className="flex flex-col self-start items-start mb-2 md:flex-row">
                <div className="self-start">
                  <h1 className="text-xl self-start md:text-2xl text-gray-800  mb-1 pl-4">
                    Invites
                  </h1>
                  <p className="text-xs self-start text-grey mb-6 pl-4 md:text-sm">
                    {" "}
                    All the invites that you recieve are displayed here. Accept
                    the invites to collaborate in the campaign
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-md w-full flex border  ">
                <TableAntd
                  className="w-full"
                  data={Object.keys(data).length === 0 ? [] : data}
                  open={handleOpen}
                  type="invite"
                  loading={isLoading}
                >
                  <Column
                    title="Recieved At"
                    dataIndex="recievedAt"
                    key="recievedAt"
                  ></Column>
                </TableAntd>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
const InfluencerInvites = () => {
  return <>{true && <Bids />}</>;
};

export default InfluencerInvites;
