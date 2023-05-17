import React, { useState } from "react";
import { TabComponent } from "../../Components/brandComponents/tabcomponent";
import { ListingCard } from "../../Components/brandComponents/listingCard";
import { ProfileStatusCard } from "../../Components/brandComponents/profileStatusCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { message, Upload, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { storage } from "../../utils/fireBase/fireBaseInit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;
const { Dragger } = Upload;

const InfluencerListing = (id) => {
  window.open("/influencerlisting/" + id, "_blank");
};

const props = {
  name: "file",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      return info.file.xhr;
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  async customRequest({ file, onSuccess }) {
    const storage = firebase.storage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = await storage.ref();
    const imageName = generateHashName(); //a unique name for the image
    const imgFile = storageRef.child(`files/${imageName}`);
    try {
      const image = await imgFile.put(file, metadata);
      onSuccess(null, image);
    } catch (e) {
      onError(e);
    }
  },
};

// custom request for upload that returns file upload url instead of file name
const customRequest = async ({ file, onSuccess }) => {
  const storageRef = ref(storage, `files/${file.name + v4()}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  onSuccess(null, downloadURL);
};

const getInfluencers = async () => {
  const response = await fetch(
    "http://localhost:3000/influencer/topinfluencers"
  );
  const data = await response.json();
  console.log(data);
  return data.data;
};

export function Dashboard({ uid }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: influencer,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("influencer", getInfluencers, { fetchPolicy: "network-only" });

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Campaign created successfully",
      description:
        "Your campaign has been created successfully as a draft. Add additional details to your campaign to make it live.",
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(uid);

    const data = {
      brand: uid,
      title: values.title,
      description: values.description,
      campaignType: values.campaignType,
      deliveryDate: values.date,
      bannerImg: values.photo,
    };

    // console.log("campaign: ",data)

    fetch("http://localhost:3000/campaign/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        openNotificationWithIcon("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {contextHolder}
      <Drawer
        title="Create a new campaign"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button
              className="btn btn-sm btn-outline btn-warning"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              style={{ color: "black", borderWidth: 0 }}
              className="btn btn-sm btn-success"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter campaign title",
                  },
                ]}
              >
                <Input placeholder="Campaign Title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter Campaign description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  showCount
                  minLength={500}
                  maxLength={1000}
                  placeholder="Campaign Description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="campaignType"
                label="Campaign Type"
                rules={[
                  {
                    required: true,
                    message: "Please select an Campaign Type",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="select campaign type"
                >
                  <Option value="job">Job Listing</Option>
                  <Option value="influencer">Influencer marketing</Option>
                  <Option value="work">Work for hire</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Due Date"
                rules={[
                  {
                    required: true,
                    message: "Please choose the date",
                  },
                ]}
              >
                <DatePicker
                  placement="bottomLeft"
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
            <Row gutter={16}>
              <Col span={28}>
                <Form.Item
                  name="photo"
                  label="File"
                  getValueFromEvent={props.onChange}
                >
                  <Dragger
                    accept="image"
                    customRequest={customRequest}
                    listType="picture"
                    maxCount={1}
                    multiple={false}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single upload. Strictly prohibited from
                      uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Form>
      </Drawer>
      <div data-theme="cupcake" className="flex-col px-9 h-full bg-transparent">
        <div className="flex justify-between items-center py-3 relative">
          <h1 className="text-xl font-bold text-slate-200">Dashboard</h1>
          <button className="btn btn-warning gap-1" onClick={showDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p>Create Campaign</p>
          </button>
        </div>

        <ProfileStatusCard />

        <div className="flex justify-between py-10 flex-wrap gap-5">
          <a onClick={showDrawer}>
            <div
              className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
              data-theme="corporate"
            >
              <div className="card-body flex-row p-5">
                <div className="flex-col w-40">
                  <h2 className="card-title">Create Campaign</h2>
                  <p className="py-2 text-sm">
                    Create a campaign to attract influencers and creators
                  </p>
                  <a className="link link-primary">Create Campaign</a>
                </div>
                <div className="flex-col w-20">
                  <div className="h-20 w-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="70"
                      height="70"
                      viewBox="0 0 64 64"
                    >
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1"
                        x1="37"
                        x2="37"
                        y1="16.125"
                        y2="22.38"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Na_43971_gr1)"
                        d="M42,22H32c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v4 C43,21.552,42.552,22,42,22z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2"
                        x1="39.5"
                        x2="39.5"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nb_43971_gr2)"
                        d="M58,36c0-2.967-2.167-5.431-5-5.91v-7.004c0-0.777-0.435-1.468-1.135-1.805 c-0.7-0.335-1.511-0.244-2.119,0.241l-7.996,6.396c-0.03,0.024-0.052,0.055-0.081,0.081H30c-2.757,0-5,2.243-5,5h-2 c-1.103,0-2,0.897-2,2v2c0,1.103,0.897,2,2,2h2c0,2.757,2.243,5,5,5v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6h3.669 c0.029,0.026,0.051,0.057,0.082,0.082l7.995,6.396c0.365,0.292,0.804,0.441,1.247,0.441c0.295,0,0.593-0.066,0.872-0.2 C52.565,50.382,53,49.69,53,48.914V41.91C55.833,41.431,58,38.967,58,36z M23,37v-2h2v2H23z M36,50c0,1.103-0.897,2-2,2 s-2-0.897-2-2v-6h4V50z M30,42c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3h11v12h-3H30z M50.996,48.916L43,42.518V29.479l4-3.197 V36h2V24.684l2-1.598l0.002,25.834C51.002,48.92,51,48.919,50.996,48.916z M53,39.858v-7.716c1.72,0.447,3,2,3,3.858 S54.72,39.411,53,39.858z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3"
                        x1="31"
                        x2="31"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nc_43971_gr3)"
                        d="M29,34v2h2v-2h2v-2h-2C29.897,32,29,32.897,29,34z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4"
                        x1="27.5"
                        x2="27.5"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nd_43971_gr4)"
                        d="M8,40V15c0-1.654,1.346-3,3-3h33c1.654,0,3,1.346,3,3v4h2v-4c0-2.757-2.243-5-5-5H11 c-2.757,0-5,2.243-5,5v25c0,2.757,2.243,5,5,5h12v-2H11C9.346,43,8,41.654,8,40z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5"
                        x1="19"
                        x2="19"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ne_43971_gr5)"
                        d="M12 16H26V18H12z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6"
                        x1="19"
                        x2="19"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nf_43971_gr6)"
                        d="M12 20H26V22H12z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7"
                        x1="17"
                        x2="17"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Ng_43971_gr7)"
                        d="M12 24H22V26H12z"
                      ></path>
                      <linearGradient
                        id="Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8"
                        x1="16"
                        x2="16"
                        y1="10"
                        y2="54.388"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ca7QdyIinGM4Hm3w4Cg7Nh_43971_gr8)"
                        d="M12 28H20V30H12z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a onClick={() => navigate("/marketplace")}>
            <div
              className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
              data-theme="corporate"
            >
              <div className="card-body flex-row p-5">
                <div className="flex-col w-40">
                  <h2 className="card-title">Find Influencers</h2>
                  <p className="py-2 text-sm">
                    Visit the Marketplace of your favourite Influencers to hire
                  </p>
                  <a className="link link-primary">Marketplace</a>
                </div>
                <div className="flex-col w-20">
                  <div className="h-20 w-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="70"
                      height="70"
                      viewBox="0 0 64 64"
                    >
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6a_52998_gr1"
                        x1="32.002"
                        x2="32.002"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6a_52998_gr1)"
                        d="M57.002,32c0-13.785-11.215-25-25-25s-25,11.215-25,25s11.215,25,25,25 S57.002,45.785,57.002,32z M32.002,55c-12.683,0-23-10.317-23-23s10.317-23,23-23s23,10.317,23,23S44.685,55,32.002,55z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6b_52998_gr2"
                        x1="51.181"
                        x2="51.181"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6b_52998_gr2)"
                        d="M55.146,18.087l1.713-1.031c-2.53-4.201-6.111-7.72-10.355-10.175l-1.002,1.73 C49.454,10.898,52.789,14.175,55.146,18.087z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6c_52998_gr3"
                        x1="12.693"
                        x2="12.693"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6c_52998_gr3)"
                        d="M18.503,8.611l-1.002-1.73C13.102,9.425,9.43,13.096,6.883,17.498l1.73,1.002 C10.985,14.4,14.405,10.981,18.503,8.611z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6d_52998_gr4"
                        x1="12.484"
                        x2="12.484"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6d_52998_gr4)"
                        d="M8.609,45.494l-1.73,1.002c2.455,4.246,5.975,7.829,10.179,10.361l1.031-1.713 C14.174,52.786,10.896,49.449,8.609,45.494z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6e_52998_gr5"
                        x1="51.311"
                        x2="51.311"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6e_52998_gr5)"
                        d="M55.391,45.499c-2.371,4.098-5.79,7.518-9.89,9.89l1.002,1.73 c4.401-2.546,8.073-6.218,10.618-10.618L55.391,45.499z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6f_52998_gr6"
                        x1="32.002"
                        x2="32.002"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6f_52998_gr6)"
                        d="M40.122,28.12c0.56,1.18,0.88,2.49,0.88,3.88c0,4.96-4.04,9-9,9s-9-4.04-9-9s4.04-9,9-9 c1.39,0,2.7,0.32,3.88,0.88l1.48-1.48c-1.58-0.89-3.41-1.4-5.36-1.4c-6.07,0-11,4.93-11,11c0,6.07,4.93,11,11,11s11-4.93,11-11 c0-1.95-0.51-3.78-1.4-5.36L40.122,28.12z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6g_52998_gr7"
                        x1="36.105"
                        x2="36.105"
                        y1="4.667"
                        y2="59.509"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6g_52998_gr7)"
                        d="M34.755,27.833C33.964,27.309,33.019,27,32.001,27c-2.757,0-5,2.243-5,5s2.243,5,5,5 s5-2.243,5-5c0-1.017-0.309-1.962-0.833-2.752l9.04-9.04l-1.414-1.414L34.755,27.833z M32.001,35c-1.654,0-3-1.346-3-3s1.346-3,3-3 s3,1.346,3,3S33.656,35,32.001,35z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6h_52998_gr8"
                        x1="32.002"
                        x2="32.002"
                        y1="13.5"
                        y2="53.051"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6h_52998_gr8)"
                        d="M53.002,32c0-2.022-1.513-3.681-3.463-3.946c-0.534-2.392-1.504-4.591-2.857-6.495L45.242,23 c1.065,1.568,1.84,3.355,2.3,5.286c-1.484,0.585-2.54,2.025-2.54,3.715c0,1.695,1.063,3.138,2.555,3.72 c-1.393,5.839-5.997,10.443-11.835,11.835C35.14,46.063,33.697,45,32.002,45s-3.138,1.063-3.72,2.556 c-5.838-1.392-10.443-5.997-11.836-11.836c1.492-0.581,2.556-2.024,2.556-3.72c0-1.693-1.061-3.135-2.549-3.718 C18.155,21.113,24.541,16,32.001,16c3.31,0,6.42,1.01,9,2.76l1.44-1.44c-2.96-2.1-6.57-3.32-10.44-3.32 c-8.473,0-15.716,5.862-17.546,14.056c-1.945,0.27-3.453,1.926-3.453,3.945c0,2.017,1.505,3.672,3.448,3.944 c1.515,6.761,6.846,12.093,13.608,13.607C28.329,51.495,29.985,53,32.002,53s3.673-1.505,3.944-3.449 c6.761-1.515,12.091-6.846,13.607-13.607C51.497,35.673,53.002,34.017,53.002,32z M13.002,32c0-1.103,0.897-2,2-2s2,0.897,2,2 s-0.897,2-2,2S13.002,33.103,13.002,32z M32.002,51c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S33.104,51,32.002,51z M49.002,34 c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S50.104,34,49.002,34z"
                      ></path>
                      <linearGradient
                        id="VT2h0f6cfTAxYdWXp0CV6i_52998_gr9"
                        x1="32.002"
                        x2="32.002"
                        y1="28.583"
                        y2="35.086"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#VT2h0f6cfTAxYdWXp0CV6i_52998_gr9)"
                        d="M32.002 29A3 3 0 1 0 32.002 35A3 3 0 1 0 32.002 29Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="#">
            <div
              className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
              data-theme="corporate"
            >
              <div className="card-body flex-row p-5">
                <div className="flex-col w-40">
                  <h2 className="card-title text-base">Marketing Automation</h2>
                  <p className="py-2 text-sm">
                    Automate Social media campaigns
                  </p>
                  <a className="link link-primary">Create Campaign</a>
                </div>
                <div className="flex-col w-20">
                  <div className="h-20 w-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="70"
                      height="70"
                      viewBox="0 0 64 64"
                    >
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Ja_44046_gr1"
                        x1="42"
                        x2="42"
                        y1="18.375"
                        y2="28.25"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Ja_44046_gr1)"
                        d="M42 19A4 4 0 1 0 42 27A4 4 0 1 0 42 19Z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jb_44046_gr2"
                        x1="32"
                        x2="32"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jb_44046_gr2)"
                        d="M55,20h-1.393c-0.286-1.061-0.749-2.078-1.336-3.029l1.042-1.043 c1.17-1.17,1.17-3.072,0-4.242s-3.072-1.17-4.242,0l-1.056,1.056c-0.943-0.577-1.956-1.036-3.015-1.336V10c0-1.654-1.346-3-3-3 s-3,1.346-3,3v1.406c-1.059,0.3-2.072,0.759-3.015,1.336l-1.056-1.056c-1.17-1.17-3.072-1.17-4.242,0 c-0.634,0.634-0.912,1.482-0.859,2.313H9c-1.654,0-3,1.346-3,3v34c0,1.302,0.838,2.402,2,2.816V55c0,1.103,0.897,2,2,2h29 c1.103,0,2-0.897,2-2v-1.184c1.162-0.414,2-1.514,2-2.816V38.816c1.162-0.414,2-1.514,2-2.816v-1.406 c1.059-0.3,2.072-0.759,3.015-1.336l1.056,1.056c0.585,0.585,1.353,0.877,2.121,0.877s1.536-0.292,2.121-0.877 c1.17-1.17,1.17-3.072,0-4.242l-1.042-1.043c0.588-0.951,1.051-1.968,1.336-3.029H55c1.654,0,3-1.346,3-3S56.654,20,55,20z M50.485,13.101c0.379-0.377,1.035-0.377,1.414,0c0.188,0.189,0.293,0.44,0.293,0.707s-0.104,0.518-0.293,0.707l-0.836,0.836 c-0.436-0.504-0.909-0.975-1.419-1.409L50.485,13.101z M32.101,13.101c0.379-0.377,1.035-0.377,1.414,0l0.842,0.841 c-0.51,0.434-0.983,0.905-1.419,1.409l-0.836-0.836c-0.188-0.189-0.293-0.44-0.293-0.707S31.912,13.29,32.101,13.101z M10,55v-1h29 v1H10z M40,52H9c-0.552,0-1-0.448-1-1V17c0-0.552,0.448-1,1-1h21.758l0.971,0.971c-0.588,0.951-1.051,1.967-1.337,3.029H29 c-1.654,0-3,1.346-3,3s1.346,3,3,3h1.393c0.286,1.061,0.749,2.078,1.337,3.029l-1.043,1.043c-1.17,1.17-1.17,3.072,0,4.242 c0.585,0.585,1.353,0.877,2.121,0.877s1.536-0.292,2.121-0.877l1.056-1.056c0.943,0.577,1.956,1.036,3.015,1.336V36 c0,1.302,0.838,2.402,2,2.816V51C41,51.552,40.552,52,40,52z M32.101,31.485l0.836-0.836c0.436,0.504,0.909,0.975,1.419,1.409 l-0.842,0.841c-0.379,0.377-1.035,0.377-1.414,0c-0.188-0.189-0.293-0.44-0.293-0.707S31.912,31.675,32.101,31.485z M51.899,31.485 c0.188,0.189,0.293,0.44,0.293,0.707s-0.104,0.518-0.293,0.707c-0.379,0.377-1.035,0.377-1.414,0l-0.842-0.841 c0.51-0.434,0.983-0.905,1.419-1.409L51.899,31.485z M55,24h-3.023l-0.15,0.819c-0.693,3.769-4.145,7.213-8.027,8.011L43,32.994V36 c0,0.552-0.448,1-1,1s-1-0.448-1-1v-3.006l-0.799-0.164c-3.883-0.798-7.334-4.242-8.027-8.011L32.023,24H29c-0.552,0-1-0.448-1-1 s0.448-1,1-1h3.023l0.15-0.819c0.693-3.769,4.145-7.213,8.027-8.011L41,13.006V10c0-0.552,0.448-1,1-1s1,0.448,1,1v3.006 l0.799,0.164c3.883,0.798,7.334,4.242,8.027,8.011L51.977,22H55c0.552,0,1,0.448,1,1S55.552,24,55,24z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jc_44046_gr3"
                        x1="42"
                        x2="42"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#0d81ff"></stop>
                        <stop offset="1" stop-color="#9610ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jc_44046_gr3)"
                        d="M42,15c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S46.411,15,42,15z M42,29 c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S45.309,29,42,29z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jd_44046_gr4"
                        x1="15"
                        x2="15"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jd_44046_gr4)"
                        d="M15,31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,31,15,31z M15,35 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,35,15,35z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Je_44046_gr5"
                        x1="15"
                        x2="15"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Je_44046_gr5)"
                        d="M15,23c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,23,15,23z M15,27 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,27,15,27z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jf_44046_gr6"
                        x1="15"
                        x2="15"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jf_44046_gr6)"
                        d="M15,39c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S16.654,39,15,39z M15,43 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S15.552,43,15,43z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jg_44046_gr7"
                        x1="22.5"
                        x2="22.5"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jg_44046_gr7)"
                        d="M20 27H25V29H20z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jh_44046_gr8"
                        x1="24"
                        x2="24"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jh_44046_gr8)"
                        d="M20 35H28V37H20z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Ji_44046_gr9"
                        x1="28.5"
                        x2="28.5"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Ji_44046_gr9)"
                        d="M20 43H37V45H20z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jj_44046_gr10"
                        x1="28.5"
                        x2="28.5"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jj_44046_gr10)"
                        d="M20 39H37V41H20z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jk_44046_gr11"
                        x1="24"
                        x2="24"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jk_44046_gr11)"
                        d="M20 31H28V33H20z"
                      ></path>
                      <linearGradient
                        id="43RbhJKYusvovOdtfDO2Jl_44046_gr12"
                        x1="22.5"
                        x2="22.5"
                        y1="6.375"
                        y2="57.869"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#43RbhJKYusvovOdtfDO2Jl_44046_gr12)"
                        d="M20 24H25V26H20z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="#">
            <div
              className="card w-72 h-40 bg-base-100 shadow-xl rounded-xl"
              data-theme="corporate"
            >
              <div className="card-body flex-row p-5">
                <div className="flex-col w-40">
                  <h2 className="card-title">Finances</h2>
                  <p className="py-2 text-sm">
                    Manage expenses and other financial informations
                  </p>
                  <Link
                    to="/brandpayments/manage"
                    className="link link-primary"
                  >
                    Create Campaign
                  </Link>
                </div>
                <div className="flex-col w-20">
                  <div className="h-20 w-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="70"
                      height="70"
                      viewBox="0 0 64 64"
                    >
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMa_44778_gr1"
                        x1="20"
                        x2="20"
                        y1="28.626"
                        y2="35.541"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#6dc7ff"></stop>
                        <stop offset="1" stop-color="#e6abff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMa_44778_gr1)"
                        d="M20 29A3 3 0 1 0 20 35A3 3 0 1 0 20 29Z"
                      ></path>
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMb_44778_gr2"
                        x1="45"
                        x2="45"
                        y1="5.667"
                        y2="59.355"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMb_44778_gr2)"
                        d="M40 26H50V28H40z"
                      ></path>
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMc_44778_gr3"
                        x1="45"
                        x2="45"
                        y1="5.667"
                        y2="59.355"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMc_44778_gr3)"
                        d="M40 22H50V24H40z"
                      ></path>
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMd_44778_gr4"
                        x1="45"
                        x2="45"
                        y1="5.667"
                        y2="59.355"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMd_44778_gr4)"
                        d="M40 30H50V32H40z"
                      ></path>
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMe_44778_gr5"
                        x1="45"
                        x2="45"
                        y1="5.668"
                        y2="59.355"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMe_44778_gr5)"
                        d="M45,34c-2.206,0-4,1.794-4,4c0,2.206,1.794,4,4,4s4-1.794,4-4C49,35.794,47.206,34,45,34z M45,40c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S46.102,40,45,40z"
                      ></path>
                      <linearGradient
                        id="sHY1CI8Ori38MeFTisdAMf_44778_gr6"
                        x1="32"
                        x2="32"
                        y1="5.668"
                        y2="59.355"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stop-color="#1a6dff"></stop>
                        <stop offset="1" stop-color="#c822ff"></stop>
                      </linearGradient>
                      <path
                        fill="url(#sHY1CI8Ori38MeFTisdAMf_44778_gr6)"
                        d="M56.767,6.306c-0.743-0.309-1.594-0.143-2.167,0.428L53.102,8.23l-2.524-1.843 c-0.704-0.516-1.651-0.517-2.355-0.001l-2.62,1.917l-2.624-1.916c-0.703-0.516-1.65-0.517-2.355-0.001l-2.62,1.917l-2.625-1.916 c-0.703-0.516-1.65-0.517-2.355-0.001l-2.62,1.917l-2.624-1.916c-0.703-0.516-1.65-0.517-2.355-0.001l-2.521,1.843L21.4,6.734 c-0.574-0.571-1.425-0.739-2.167-0.428C18.484,6.616,18,7.344,18,8.157V22H8.001C6.898,22,6,22.898,6,24.001v16 c0,1.103,0.898,2,2.001,2H18v6h-8v5c0,2.757,2.244,5,5,5h37.999C55.756,58,58,55.757,58,53V8.157 C58,7.344,57.516,6.616,56.767,6.306z M32,27.899C30.044,27.501,28.5,26,28.101,24H32V27.899z M26.08,24 c0.441,3,2.861,5.48,5.92,5.92v4.16c-3.059,0.44-5.479,2.92-5.92,5.92H13.921C13.48,37,11,34.521,8,34.08v-4.16 c3-0.44,5.48-2.92,5.921-5.92H26.08z M32,36.101V40h-3.899C28.5,38,30.044,36.5,32,36.101z M11.899,24C11.501,26,10,27.501,8,27.899 V24H11.899z M8,36.101C10,36.5,11.501,38,11.899,40H8V36.101z M15,56c-1.654,0-3-1.346-3-3v-3h36v3c0,1.125,0.373,2,1.001,3H15z M56,53c0,1.654-1.346,3-3,3s-3-1.346-3-3v-5H20v-6h12c1.103,0,2-0.897,2-2v-16C34,22.898,33.103,22,32,22H20L19.99,8.151 l1.502,1.495c0.7,0.696,1.786,0.779,2.586,0.198l2.52-1.844l2.625,1.917c0.706,0.515,1.65,0.513,2.354,0l2.62-1.917l2.626,1.917 c0.705,0.514,1.648,0.514,2.353,0l2.621-1.917l2.625,1.917c0.706,0.515,1.65,0.513,2.354,0l2.62-1.917l2.526,1.844 c0.797,0.582,1.885,0.499,2.585-0.198L56,8.157V53z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="flex justify-between z-1">
          <TabComponent uid={uid} />
        </div>

        <div className="flex justify-between py-5 min-w-xl">
          <div
            className="flex-col card-body p-4 rounded-lg h-auto bg-base-100 w-full"
            data-theme="corporate"
          >
            <div>
              <h1 className="font-bold">Influencers you might like</h1>
              <div className="divider m-0"></div>
            </div>

            <div className="flex w-full h-[450px]">
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
              ) : (
                isSuccess && (
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={250}
                    centeredSlides={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper w-full"
                  >
                    {influencer.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ListingCard
                          onclick={() => InfluencerListing(item._id)}
                          description={item.description}
                          avatar={item.photo}
                          name={item.name}
                          followers={item.socialMediaHandles[0]?.followers}
                          banner={item.photo}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )
              )}
              {/* <Swiper
                slidesPerView={5}
                spaceBetween={250}
                centeredSlides={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-full"
              >
                <SwiperSlide><ListingCard avatar="https://www.rfa.org/english/news/china/warning-01082021091841.html/@@images/2ad7ab11-b78f-44d3-b587-618128d3dfc7.jpeg" name="Jack Musk" followers="10k" video banner="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /></SwiperSlide>
              </Swiper> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
