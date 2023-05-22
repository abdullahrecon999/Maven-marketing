import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../utils/authProvider";
import { useQuery, useMutation } from "react-query";
import { ChatContext } from "./ChatProvider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { storage } from "../../utils/fireBase/fireBaseInit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
import messageImage from "../../images/Messaging-rafiki.png";
import Contract from "./ContractContainer";
import InfluencerGenaricModel from "../InfluencerComponents/InfluencerGenaricModal";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { Modal, Tag, Button, Input } from "antd";
const FallBack = () => {
  return (
    <div className="h-[80vh] flex flex-col flex-1 mt-10 items-center px-4 py-2 bg-slate-50">
      <div className="flex flex-col border-gray-400 border-2 shadow-inner  px-12 py-6 rounded-lg  w-[70%] h-[50vh] justify-center items-center">
        <h1 className="text-4xl text-gray-600 ">Chat here</h1>
        <p className="text-xl text-grey ">your chats appear here</p>
      </div>
    </div>
  );
};

const ContractModel = () => {
  const [Data, setData] = useState({});
  const { openContract, setOpenContract, Id } = useContext(ChatContext);

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  const { data, isLoading } = useQuery(["getContractdetails"], () => {
    return axios.get("http://localhost:3000/chats/getcontractdetails/" + Id);
  });

  useEffect(() => {
    setData(data?.data?.data);
  }, [data]);

  const {
    mutate,
    isLoading: isAcceptLoading,
    isSuccess,
    isError,
  } = useMutation(() => {
    return axios.post(
      "http://localhost:3000/influencer/acceptcontract/" + Data["_id"]
    );
  });
  return (
    <Modal
      open={openContract}
      onCancel={() => {
        setOpenContract(false);
      }}
      footer={[]}
      title="Contract Details"
    >
      <div className=" grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        <div className="col-span-2">
          <h1 className="text-base text-gray-800 font-semibold">
            Campaign Name
          </h1>
          <h1 className="text-xl font-bold text-gray-800  ">
            {Data?.campaignId?.title}
          </h1>
        </div>

        <p className="text-sm text-gray-600 col-span-2">
          {Data?.campaignId?.description}
        </p>

        <div className="col-span-2">
          <h1 className="text-base  text-gray-800 font-medium">Brand Name</h1>
          <h1 className="text-xl text-gray-800 font-semibold italic">
            {Data?.sender?.name}
          </h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          className="flex flex-col col-span-2 "
        >
          <div className="  gap-3 px-3 grid grid-cols-2 border rounded">
            <h1 className="text-base font-semibold text-gray-800 col-span-2">
              Details
            </h1>

            <div>
              <h1 className="text-sm font-semibold">Contract Amount</h1>
              <h2 className="text-base italic text-gray-800 font-medium">
                {Data?.amount}
              </h2>
            </div>
            <div>
              <h1 className="text-sm font-semibold">End Date</h1>
              <Tag color="volcano">
                {dayjs(Data?.expiresAt).toDate().toLocaleDateString()}
              </Tag>
            </div>
          </div>
          <div className="flex flex-row-reverse ">
            {user?.role === "brand" ? null : (
              <>
                <Button
                  loading={isAcceptLoading}
                  disabled={isSuccess}
                  className="bg-blue text-white my-3"
                  onClick={() => {
                    mutate();
                  }}
                  type="submit"
                >
                  Accept Contract
                </Button>
                {isSuccess && (
                  <div className="flex justify-center items-center">
                    <Tag color="green">Contract Accepted</Tag>
                  </div>
                )}
                {isError && (
                  <div>
                    <Tag color="red">ops something went wrong</Tag>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </Modal>
    // <InfluencerGenaricModel>
    //   <div className="h-full flex flex-col justify-start ">
    //     <div className="flex justify-end bg-slate-200 ">
    //       <CloseIcon
    //         onClick={() => {
    //           setOpenContract(false);
    //         }}
    //         className=" hover:bg-slate-100"
    //       ></CloseIcon>
    //     </div>

    //   </div>
    // </InfluencerGenaricModel>
  );
};

const ChatContainer = () => {
  const { user, setUser } = useContext(AuthContext);
  const { currentUser, openContract, socket } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [disable, setdisable] = useState(false);
  const [Fileurl, setUrl] = useState("");
  const [isUploaded, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [status, setStatus] = useState("offline");

  const scrollRef = useRef();
  const handleMessageChange = (e) => {
    setUpload(false);
    setMessage(e.target.value);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("this is the socket", socket);
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      if (Object.keys(currentUser).length !== 0) {
        const response = await axios.post(
          "http://localhost:3000/chats/getMessages",
          {
            to: currentUser["_id"],
            from: user["_id"],
          }
        );
        setMessages(response?.data?.projectMessages);
      }
    };
    fetchMessages();
    if (socket.current) {
      socket.current.emit("checkOnline", currentUser["_id"]);
      socket.current.on("userOnline", (text) => {
        if (text === "online") setStatus(text);
        else setStatus(text);
      });
      socket.current.on("offlineTime", (time) => {
        console.log("the offline time is", time);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("msg is ", msg);
        setMessages([
          ...messages,
          {
            fromSelf: false,
            message: msg,
          },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviou: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleTabClose = (e) => {
      if (socket.current) {
        socket.current.emit("logout", user?._id);
      }
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  });

  const handleFileUpload = (fileUpload) => {
    console.log(fileUpload.name);

    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);

    setUploading(true);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        console.log("uploading the files in the db");

        getDownloadURL(fileRef).then((url) => {
          alert("file is uploaded");
          console.log("this is the file reference");

          setUrl(url);
          console.log(uploading);
          setUploading(false);
          setUpload(true);
          console.log("file", Fileurl);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { data, isLoading } = useQuery(
    ["getAllMessages"],
    () => {
      if (Object.keys(currentUser).length !== 0)
        console.log(currentUser["_id"]);
      return axios.post("http://localhost:3000/chats/getMessages", {
        to: currentUser["_id"],
        from: user["_id"],
      });
    },
    {
      refetchInterval: 100000,
    }
  );
  const { mutate } = useMutation(() => {
    console.log(socket, "the socket is");
    socket.current.emit("send-msg", {
      to: currentUser._id,
      from: user._id,
      text: message,
    });
    // socket.on("recieve-msg",(data)=>{
    //     const allMessages = [...data.data.projectMessages]
    //     allMessages.push({
    //         fromSelf : true,
    //         text: message
    //     })

    // })

    console.log("in mutation", message);
    var text = message;
    setMessage("");

    if (Object.keys(currentUser).length !== 0) {
      console.log("innn");
      if (Fileurl === "") {
        setUrl("");
        setMessages([
          ...messages,
          {
            message: text,
            fromSelf: true,
          },
        ]);
        return axios.post(
          "http://localhost:3000/chats/addMessage",

          {
            text: text,
            users: [currentUser["_id"], user["_id"]],
            sender: user["_id"],
          }
        );
      } else {
        console.log("here");
        setdisable(false);

        setUpload(false);
        setMessages([
          ...messages,
          {
            message: Fileurl,
            fromSelf: true,
          },
        ]);
        const msg = {
          text: Fileurl,
          users: [currentUser["_id"], user["_id"]],
          sender: user["_id"],
        };
        setUrl("");
        console.log("ye yaha nhi chal rha hai", Fileurl);
        return axios.post("http://localhost:3000/chats/addMessage", msg);
      }
    }
  });
  return (
    <>
      {openContract && <ContractModel></ContractModel>}
      {Object.keys(currentUser).length === 0 ? (
        <FallBack />
      ) : (
        <div className="flex flex-col flex-1  shadow-inner my-0 bg-white">
          <div className="flex flex-col shadow-md w-[100%] px-5 py-2 ">
            <h1 className="text-sm text-black font-semibold ">
              {currentUser?.name}
            </h1>
            <p
              className={
                status === "online"
                  ? "text-xs text-blue-600"
                  : "text-xs text-green-500"
              }
            >
              {status}
            </p>
          </div>

          <div className=" flex-col  overflow-y-auto  w-full h-[68vh] px-6">
            {messages.map((msg) => {
              return (
                <div
                  className={
                    msg?.fromSelf === true
                      ? "flex justify-end my-1"
                      : "justify-start my-1"
                  }
                >
                  {msg?.msgType === "contract" ? (
                    <div
                      className={
                        msg?.fromSelf === true
                          ? " text-white max-w-[50%] rounded-full my-1 px-4 py-1"
                          : "text-black max-w-[50%] rounded-full my-2 px-4 py-1"
                      }
                    >
                      <Contract id={msg?.id} text={msg?.msgType} />
                    </div>
                  ) : (
                    <div className="flex   ">
                      <div className="flex flex-col justify-end ">
                        <div
                          className={
                            msg?.fromSelf
                              ? "px-3 flex justify-end"
                              : "px-3 flex justify-start "
                          }
                        >
                          <img
                            src={msg?.sender?.photo}
                            alt="tomatoes are disgusting"
                            className="w-[30px] h-[30px] rounded-full object-cover"
                          />
                          <div>
                            <h1 className="text-base text-gray-800 font-semibold">
                              {msg?.sender?.name}
                            </h1>
                            <p className="text-xxs">
                              {dayjs(msg?.date).toDate().toLocaleTimeString()}{" "}
                              {dayjs(msg?.date).toDate().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <h1
                          ref={scrollRef}
                          className={
                            msg?.fromSelf === true
                              ? " text-gray-700 text-sm text-end bg-gray-300  my-1 px-4 py-1"
                              : "text-black w-full text-sm text-end bg-slate-200  my-2 px-4 py-1"
                          }
                        >
                          {msg?.message}
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex items-center shadow-md px-5   space-x-2">
              <label
                htmlFor="fileInput"
                className="text-grey text-xs hover:bg-gray-300 "
              >
                <AttachFileIcon />
              </label>
              <input
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  setdisable(true);
                  setFileUpload(e.target.files[0]);

                  handleFileUpload(e.target.files[0]);
                }}
                type="file"
              ></input>
              <Input
                disabled={disable}
                value={message}
                size="small"
                placeholder="send message ..."
                className="border px-3 text-sm w-[100%] "
                sx={{
                  width: "70%",
                  borderRadius: 200,
                }}
                onChange={(e) => {
                  handleMessageChange(e);
                }}
              ></Input>
              {uploading ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="gray"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <button
                  onClick={() => {
                    console.log("chal ja yr teri mehr bani");
                    mutate();
                  }}
                  className="text-grey rounded-full hover:bg-slate-300 p-3"
                >
                  <SendIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
