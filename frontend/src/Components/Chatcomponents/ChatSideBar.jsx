import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { AuthContext } from "../../utils/authProvider";
import { ChatContext } from "./ChatProvider";
import { io } from "socket.io-client";
import useFetch from "../../utils/Hooks/useFetch";
const ChatSideBar = ({ setCurrent }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setCurrentUser, socket } = useContext(ChatContext);
  const [data, setContacts] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const handlefetch = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch(`http://localhost:3000/chats/getContacts/${user?._id}`);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setIsloading(true);
      const response = await axios.get(
        `http://localhost:3000/chats/getContacts/${user?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);

      setContacts(response);
    };
    fetch();
    socket.current = io("http://localhost:5000");
    socket.current.emit("add-user", user?._id);
  }, [user]);

  // useEffect(()=>{
  //   if(Object.keys(currentUser).length !==0){
  //     socket.current = io("http://localhost:5000")
  //     console.log(currentUser?._id, "the user is")
  //     socket.current.emit("add-user", currentUser?._id)
  //   }
  // }, [currentUser])

  // const {isLoading, isError, isSuccess, data, status} = useQuery(["getContacts"],()=>{
  //     return axios.get(`http://localhost:3000/chats/getContacts/${user["_id"]}`,
  //   {headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   withCredentials: true,
  // })
  // },{
  //   refetchInterval:100000
  // })

  // if(isLoading){
  //     return (<div className='h-screen border-r-2 w-[25%] flex flex-col '>
  //         <h1 className='font-railway text-2xl mx-3 mt-3 mb-4'> Messages</h1>
  //         <div className='flex flex-col px-3 py-12'>
  //         <h1 className='text-center text-2xl font-railway text-gray-600'> your contacts appear here</h1>
  //         </div>
  //     </div>)
  // }
  return (
    <React.Fragment>
      <div className="flex flex-col w-[25%] border-r-2 h-[10%] ">
        <h1 className=" text-xl mx-3 mt-3 mb-4 text-gray-900 font-semibold">
          {" "}
          Contacts
        </h1>
        {data?.data?.data[0]?.contacts?.lenght === 0 ? (
          <div className="flex flex-col px-3 py-12">
            <h1> your contacts appear here</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* {console.log(data.data.data[0].contacts.map(item =>{
                return (item.contact.name)
            }))} */}
            {data?.data?.data[0]?.contacts.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    setCurrentUser(item.contact);
                  }}
                  key={i}
                  className="flex flex-col items-start p-3 px-5 py-5 border w-[100%] hover:bg-grey"
                >
                  <h1 className="text-base font-semibold">
                    {item.contact.name}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ChatSideBar;
