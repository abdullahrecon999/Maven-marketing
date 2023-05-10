import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Select } from "antd";
import { Formik, ErrorMessage } from "formik";
import gigSchema from "../../ValidationSchemas/gigValidation";
const { TextArea } = Input;
const length = 0;
const fileList = [];
const InfluencerGigs = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [files, setFiles] = useState([]);
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
  const handleView = () => {
    // add navigation code here
  };
  return (
    <div className="w-[full]">
      {length !== 0 ? (
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
      ) : (
        <div className="w-full h-[70vh] flex flex-col py-8 bg-white border rounded-xl space-y-4 px-10">
          {/* add this in a map */}
          <div className="bg-gray-50 flex flex-col md:flex  w-full rounded-lg px-3 py-2 border shadow mb-2">
            <div className="flex flex-col flex-1 space-y-1">
              <h1 className="text-xl font-semibold text-gray-700">Title</h1>
              <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-sm text-blue">Created on data</p>
            </div>
            <div className="flex flex-[0.25] items-end justify-end">
              <Button className="mr-1 bg-blue text-white" onClick={handleView}>
                View
              </Button>
              <Button className="mr-1 bg-blue text-white hover:bg-red-500 hover:text-white">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* modal to create a new listing */}
      <Modal
        title="Create a new Gig"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            bannerImage: "",
            platform: "",
            access: false,
          }}
        >
          {(formik) => (
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
                    onChange={(e) => {
                      console.log("formik values", formik.values);
                      formik.setFieldValue("title", e.target.value);
                    }}
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
                    onChange={(e) => {
                      formik.setFieldValue("description", e.target.value);
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
                    Additional posts{" "}
                    <span className="text-gray-600">{"(optional)"}</span>
                  </h1>
                  <p className="text-gray-500 text-xxs mb-2">
                    These post allow you to show case your content to brands{" "}
                  </p>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    beforeUpload={() => false}
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
                    onSelect={(value) => {
                      formik.setFieldValue("platform", value);
                    }}
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
                      Please give access of your LinkedIn Account inorder to
                      fetch the nessecart details{" "}
                    </p>
                    <Button className="bg-blue text-white mt-3">
                      Give Access
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default InfluencerGigs;
