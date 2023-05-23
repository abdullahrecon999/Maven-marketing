import React, { useState } from "react";
import { Box } from "@mui/material";
import { SettingOutlined } from "@ant-design/icons";
import { Cascader, Input, Select, Space, Button, Form, message } from "antd";
import { useMutation } from "react-query";
import axios from "axios";

const AddConnection = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  // const fetchData = async (postData) => {
  //   const response = await axios.post('http://localhost:3000/users/verify/', postData);
  //   return response.data + "," + postData.username;
  // };

  // const mutater = useMutation(fetchData, {
  //   onSuccess: async (data) => {
  //     // Do something on success, like show a success message
  //     console.log('data', data.split(',')[0]);
  //     if (data.split(',')[0] === 'Real') {
  //       message.success('Verified');
  //       // post call to backend with the username
  //       const res = await axios.post('http://localhost:3000/influencer/activateProfile/' + id, {
  //         handle: data.split(',')[1],
  //         platform: 'Twitter',
  //         followers: 0
  //       });

  //       console.log('res', res);

  //     } else {
  //       message.error('Not Verified, Sent for review');
  //     }
  //   },
  //   onError: () => {
  //     // Do something on error, like show an error message
  //   },
  //   onSettled: () => {
  //     setIsLoading(false);
  //   },
  // });

  // const handleSubmit = (values) => {
  //   setIsLoading(true);
  //   mutater.mutate(values);
  // };

  return (
    <div className=" flex flex-1">
      <div className="px-6 py-4 flex flex-col justify-center">
        <h1 className="text-xl text-gray-800 font-semibold">Add Platforms</h1>
        <div className="flex flex-col gap-3 items-center">
          <Button>LinkedIn</Button>
          <Button>Instagram</Button>
          <Button>Youtube</Button>
          <Button>FaceBook</Button>
          <Button>Redit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddConnection;
