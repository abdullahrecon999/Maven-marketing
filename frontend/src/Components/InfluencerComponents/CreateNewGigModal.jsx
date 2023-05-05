import React, { useState } from "react";
import { Input } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Formik, ErrorMessage } from "formik";
import { Upload } from "antd";
import { Select } from "antd";
import gigSchema from "../../ValidationSchemas/gigValidation";
const { TextArea } = Input;
const CreateNewGigModal = ({
  gigTitle = "Create a new Gig",
  open,
  setOpen,
  title = "",
  description = "",
  banner = "",
  additional = "",
  platform = "",
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
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
    <div>
      <Modal
        title={gigTitle}
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
                    value={title}
                  />
                </div>
                <div>
                  <h1 className="text-base text-gray-700 font-semibold">
                    Description <span className="text-red-600">*</span>
                  </h1>
                  <TextArea
                    value={description}
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
                    value={platform}
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

export default CreateNewGigModal;
