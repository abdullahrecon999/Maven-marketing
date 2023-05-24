import { Button, Modal, Spin } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined, InstagramOutlined, YoutubeOutlined, RedditOutlined, LinkedinOutlined } from "@ant-design/icons";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, Tag, Alert } from "antd";
import { Select } from "antd";
import { Formik, ErrorMessage } from "formik";
import gigSchema from "../../ValidationSchemas/gigValidation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/fireBase/fireBaseInit";
import { v4 } from "uuid";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { AuthContext } from "../../utils/authProvider";
const { Option } = Select;

const { TextArea } = Input;
const length = 0;
const fileList = [];
const InfluencerGigs = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  // const [files, setFiles] = useState([]);
  // const [urls, setUrls] = useState([]);
  const [posts, setPosts] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [gigsData, setGigsData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [userLoading, setUserLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    console.log('Get the Accounts object');
    setUserLoading(true);
    axios.get('http://localhost:3000/influencer/connectedaccounts').then((res) => {
      console.log('res', res);
      setAccounts(res.data.data);

      const options = res.data.data.map((account) => {
        return { value: account._id, label: account.username, pic: ((account.platform == "reddit")? account.profilePic.split("?")[0] : account.profilePic ), platform: account.platform };
      });

      setAccountOptions(options);

      setUserLoading(false);
    }).catch((err) => {
      console.log('err', err);
    })
  }, []);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await axios.get(
  //       "http://localhost:3000/list/getmylisting/" + user?._id
  //     );
  //     console.log("this is the data in the gey my gigs", data.data.data);
  //     setGigsData(data.data.data);
  //   };
  //   fetch();
  // }, [user]);
  const showModal = () => {
    setOpen(true);
  };

  const { isLoading, data, isError, isSuccess, status, refetch } = useQuery(
    ["getmylisting"],
    () => {
      return axios.get("http://localhost:3000/list/getmylisting/" + user?._id, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    [user]
  );

  useEffect(() => {
    setGigsData(data?.data?.data);
  }, [data]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    await axios.get("http://localhost:3000/list/delete/" + id);
    refetch();
    setDeleteLoading(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setSuccess(false);
    setOpen(false);
    // setPosts([]);
    // setPostUrls([]);
    // setBannerImage("");
    // setFiles([]);
  };

  const handleSubmit = async (val) => {
    setLoading(true);
    const value = {
      banner: bannerImage,
      posts: [posts],
      owner: user._id,
      ...val,
    };
    console.log(value);
    await axios.post("http://localhost:3000/list/create", value);
    setLoading(false);
    setSuccess(true);
    refetch();
  };
  // const handleUpload = async (vals) => {
  //   try {
  //     if (files.length !== 0) {
  //       const bannerReference = ref(storage, "/gigs/" + files[0].name + v4());
  //       const snapShot = await uploadBytes(bannerReference, files[0]);
  //       const url = await getDownloadURL(bannerReference);
  //       console.log(url);
  //       setBannerImage(url);
  //     }
  //   } catch (e) {}

  //   try {
  //     posts.forEach(async (file) => {
  //       const reference = ref(storage, "/gigs/" + file.name + v4());
  //       const snapShot = await uploadBytes(reference, file);
  //       const url = await getDownloadURL(reference);
  //       setPostUrls([...postUrls, url]);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   console.log(vals);
  //   delete vals["bannerImage"];
  //   const val = {
  //     owner: user?._id,
  //     banner: bannerImage,
  //     posts: postUrls,
  //     ...vals,
  //   };
  //   console.log(val);
  // };
  const handleView = (id) => {
    // add navigation code here
    navigate("/listdetails/" + id);
  };
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center bg-white">
        <Spin></Spin>
      </div>
    );
  }
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
    <div className="w-[full]">
      {console.log(data)}
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
          <div className="flex flex-row-reverse">
            <Button
              rootClassName="text-white bg-blue"
              onClick={() => {
                showModal();
              }}
            >
              Create a new gig
            </Button>
          </div>
          <div className="h-80 overflow-y-auto">
            {gigsData?.map((item) => {
              return (
                <div
                  key={item}
                  className="bg-gray-50 flex flex-col md:flex  w-full rounded-lg px-3 py-2 border shadow mb-2"
                >
                  <div className="flex flex-col flex-1 space-y-1">
                    <h1 className="text-xl font-semibold text-gray-700">
                      {item?.title}
                    </h1>
                    <p className="text-sm text-gray-400">{item?.description}</p>
                    <p className="text-sm text-blue">
                      Created on{" "}
                      {dayjs(item?.createdAt).toDate().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-[0.25] items-end justify-end">
                    <Button
                      className="mr-1 bg-blue text-white"
                      onClick={() => {
                        handleView(item?._id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(item?._id);
                      }}
                      className="mr-1 bg-blue text-white hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* modal to create a new listing */}
      <Modal
        title="Create a new Gig"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            platform: "",
            access: true,
          }}
          validationSchema={gigSchema}
        >
          {(formik) => (
            <form>
              <div className="flex flex-col gap-y-2 px-2 space-y-1 overflow-y-auto max-h-[500px]">
                <div>
                  <h1 className="text-base text-gray-700 font-semibold">
                    Title <span className="text-red-600">*</span>
                  </h1>
                  <Input
                    size="large"
                    placeholder="Enter Gig Title"
                    prefix={<UserOutlined className="text-gray-600" />}
                    onChange={(e) => {
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
                    Upload Banner Image {"(optional)"}
                  </h1>
                  <p className="text-xxs textgray-500 mb-2">
                    only one banner image is allowed
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      const bannerReference = ref(storage, "/gigs/" + v4());
                      uploadBytes(bannerReference, e.target.files[0])
                        .then((snapShot) => {
                          return getDownloadURL(snapShot.ref);
                        })
                        .then((url) => {
                          setBannerImage(url);
                          alert("Image uploaded successfull " + url);
                        })
                        .catch((e) => {
                          alert("there was an error in uploading the files");
                        });
                    }}
                  ></input>

                  {/* <Upload
                    // onChange={(e) => {
                    //   console.log("this is the value in the event", e.file);
                    //   setFiles(e.file.originFileObj);
                    // }}
                    maxCount={1}
                    beforeUpload={(file) => {
                      setFiles([...files, file]);

                      console.log(files);
                      return false;
                    }}
                    onRemove={(file) => {
                      const index = files.indexOf(file);
                      const newFileList = files.slice();
                      newFileList.splice(index, 1);
                      setFiles(newFileList);
                    }}
                    listType="picture-card"
                  >
                    <Button icon={<PlusOutlined />}>Upload</Button>
                  </Upload> */}
                </div>
                <div>
                  <h1 className="text-base text-gray-700 font-semibold">
                    Additional posts{" "}
                    <span className="text-gray-600">{"(optional)"}</span>
                  </h1>
                  <p className="text-gray-500 text-xxs mb-2">
                    These post allow you to show case your content to brands{" "}
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      const bannerReference = ref(storage, "/gigs/" + v4());
                      uploadBytes(bannerReference, e.target.files[0])
                        .then((snapShot) => {
                          return getDownloadURL(snapShot.ref);
                        })
                        .then((url) => {
                          setPosts(url);
                          alert("Image uploaded successfull " + url);
                        })
                        .catch((e) => {
                          alert("there was an error in uploading the files");
                        });
                    }}
                  ></input>
                  {/* <Upload
                    beforeUpload={(file) => {
                      setPosts([...posts, file]);
                      return false;
                    }}
                    onRemove={(file) => {
                      const index = posts.indexOf(file);
                      const newFileList = posts.slice();
                      newFileList.splice(index, 1);
                      setPosts(newFileList);
                    }}
                    listType="picture-card"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload> */}
                </div>
                <div>
                  <h1 className="text-base text-gray-700 font-semibold">
                    Select Account <span className="text-red-600">*</span>
                  </h1>
                  <Select
                    showSearch
                    style={{
                      width: 400,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    onSelect={(value) => {
                      formik.setFieldValue("platform", value);
                    }}
                    size="large"
                  >
                    {accountOptions.map((account) => (
                      <Option
                        key={account.value}
                        value={account.value}
                        label={account.platform}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                          {
														account.platform === "youtube" ? (
															<YoutubeOutlined className="text-red-600 text-xl" />
														) : (
														account.platform === "reddit" ? (
															<RedditOutlined className="text-orange-500 text-xl" />
														) : (
															<LinkedinOutlined className="text-sky-800 text-xl" />
														))
													}
                            <p>{account.label}</p>
                          </div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
                            <img src={account.pic} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col space-y-4">
                  {/* <div>
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
                  </div> */}
                </div>
                <div className="my-2 flex flex-row-reverse">
                  <Button
                    loading={loading}
                    disabled={(accountOptions.length === 0) || (formik.values.description === "") || (formik.values.platform === "")}
                    onClick={() => {
                      // handleUpload(formik.values);
                      handleSubmit(formik.values);
                    }}
                    className="text-white bg-blue"
                  >
                    Create Gig
                  </Button>
                  {success && <Tag color="red">Success</Tag>}
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
