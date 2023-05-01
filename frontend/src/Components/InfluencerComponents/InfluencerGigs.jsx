import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Select } from "antd";
import { Formik } from "formik";
const { TextArea } = Input;
const length = 0;

const InfluencerGigs = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <div className="w-[full]">
      {length === 0 ? (
        <div className="w-full h-[70vh] flex flex-col justify-center items-center bg-white border rounded-xl space-y-4 px-10">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-base text-gray-800 font-semibold">
              No listings
            </h1>
            <p className="text-xs text-gray-600 font-semibold">
              There are no listings found. Create one to get noticed and find
              more work
            </p>
          </div>
          <Button onClick={showModal} className="bg-blue text-white">
            Create A gig
          </Button>
        </div>
      ) : null}

      <Modal
        title="Create a new Gig"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div className="flex flex-col px-2 space-y-1 overflow-y-auto max-h-[350px]">
            <div>
              <h1 className="text-base text-gray-700 font-semibold">
                Title <span className="text-red-600">*</span>
              </h1>
              <Input
                size="large"
                placeholder="Enter Gig Title"
                prefix={<UserOutlined className="text-gray-600" />}
              />
            </div>
            <div>
              <h1 className="text-base text-gray-700 font-semibold">
                Description <span className="text-red-600">*</span>
              </h1>
              <TextArea
                showCount
                placeholder="Enter details of the services that you provide"
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
                maxLength={400}
              />
            </div>
            <div>
              <h1 className="text-base text-gray-700 font-semibold">
                Upload Banner Image <span className="text-red-600">*</span>
              </h1>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
            <div>
              <h1 className="text-base text-gray-700 font-semibold">
                Select Platform <span className="text-red-600">*</span>
              </h1>
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "Instagram",
                    label: "Instagram",
                  },
                  {
                    value: "Facebook",
                    label: "Facebook",
                  },
                  {
                    value: "Twitter",
                    label: "Twitter",
                  },
                  {
                    value: "Redit",
                    label: "Redit",
                  },
                  {
                    value: "Pinterest",
                    label: "Pinterest",
                  },
                  {
                    value: "LinkedIn",
                    label: "LinkedIn",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-base text-gray-700 font-semibold">
                  Account Access <span className="text-red-600">*</span>
                </h1>
                <p className="text-xs text-gray-500">
                  Please give access of your LinkedIn Account inorder to fetch
                  the nessecart details{" "}
                </p>
                <Button className="bg-blue text-white mt-3">Give Access</Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InfluencerGigs;
