import React, { useState } from 'react'
import { Box } from '@mui/material'
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space, Button, Form, message } from 'antd';
import { useMutation } from 'react-query';
import axios from 'axios';

const AddConnection = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (postData) => {
    const response = await axios.post('http://localhost:3000/users/verify/', postData);
    return response.data + "," + postData.username;
  };

  const mutater = useMutation(fetchData, {
    onSuccess: async (data) => {
      // Do something on success, like show a success message
      console.log('data', data.split(',')[0]);
      if (data.split(',')[0] === 'Real') {
        message.success('Verified');
        // post call to backend with the username
        const res = await axios.post('http://localhost:3000/influencer/activateProfile/' + id, {
          handle: data.split(',')[1],
          platform: 'Twitter',
          followers: 0
        });

        console.log('res', res);

      } else {
        message.error('Not Verified, Sent for review');
      }
    },
    onError: () => {
      // Do something on error, like show an error message
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    mutater.mutate(values);
  };

  return (
    <div className=' flex flex-1' >
      <Box
        sx={{
          flex: 1,
          display: {
            xs: "none",
            sm: "none",
            md: "flex"
          },
          flexDirection: 'column',
          boxShadow: 0.5,
          padding: 2,
          height: "100%"
        }}
      >
        <Box sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4

        }}>
          <h1 className="text-lg font-railway">Add Platform</h1>
        </Box>

        <Form
          name="basic"
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Twitter username!',
              }, {
                pattern: /^[A-Za-z0-9_]{1,15}$/,
                message: 'Please enter a valid Twitter username!',
              }
            ]}
          >
            <Input addonBefore={
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="20" height="20"
                viewBox="0 0 48 48">
                <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
              </svg>
            } placeholder="johndoe" />
          </Form.Item>

          <Form.Item>
            <Button type="default" htmlType="submit" loading={isLoading}>
              Verify
            </Button>
          </Form.Item>

        </Form>
        <h1 className="text-lg font-railway">Add Banner Image and Video</h1>
        <Form
          name="basic"
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
        </Form>
      </Box>
    </div>
  )
}

export default AddConnection