import React, { useEffect, useState } from 'react';
import { Modal, Button, Avatar, Select, DatePicker, TimePicker, Form, Checkbox, Row, Col, Divider, Space, Tabs, Input, message, notification } from 'antd';
const { TabPane } = Tabs;
import {
    RedditCircleFilled,
    FileImageOutlined,
    FileGifOutlined,
    UserOutlined,
    LinkedinFilled,
    FileTextOutlined,
    SmileOutlined,
    ClockCircleOutlined,
    CaretDownOutlined,
    SendOutlined,
    UploadOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    SyncOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Spin } from 'antd';

const connectReddit = () => {
    // open in new tab
    window.open('http://localhost:3000/users/auth/reddit', '_blank');
}

export function AddPages(props) {
    const [activeKey, setActiveKey] = useState('1');
    const [connectedPages, setConnectedPages] = useState(props?.data);
    const [originalData, setOriginalData] = useState(props?.data);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [hover, setHover] = useState(false);

    const [form] = Form.useForm();
    const [description, setDescription] = useState("");
    const [iconUrl, setIconUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [iconFile, setIconFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, msg, description) => {
      api[type]({
        message: msg,
        description:
          description,
      });
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleIconUrlChange = (e) => {
        setIconUrl(e.target.value);
    };

    const handleBannerUrlChange = (e) => {
        setBannerUrl(e.target.value);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const handleIconFileChange = (e) => {
        const file = e.target.files[0];
        setIconFile(file);
        setIconUrl(URL.createObjectURL(file));
    };

    const handleBannerFileChange = (e) => {
        const file = e.target.files[0];
        setBannerFile(file);
        setBannerUrl(URL.createObjectURL(file));
    };

    const saveConfig = () => {
        console.log("save config");
        console.log("CONFIG: ", connectedPages);

        // backend call to save the config
        axios.post("http://localhost:3000/automate/reddit/savePageVisibility", {
            subredditConfig: connectedPages,
        }).then((res) => {
            console.log(res);
            window.location.reload();
        }
        ).catch((err) => {
            console.log(err);
        })
    };

    const refreshPages = () => {
        // refresh the pages data in DB
        axios.get('http://localhost:3000/automate/reddit/getSubreddits', { withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res.status == 200) {
                console.log("Success: ", res.data);
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleCreate = () => {
        form.validateFields().then((values) => {
            // form.resetFields();
            setLoading(true);
            axios.post('http://localhost:3000/automate/reddit/v2/createSubreddit', values)
                .then((response) => {
                    const { data } = response;
                    // Handle success response
                    console.log(data);
                    setLoading(false);

                    if(data.success == false){
                        console.log("Error: ", data.message);
                        // openNotificationWithIcon('error', 'Error', data.message);
                        props.notifyError('error', 'Error', data.message);
                    } else {
                        console.log("Success: ", data.message);
                        // openNotificationWithIcon('success', 'Success', data.message);
                        props.notifyError('success', 'Success', data.message);

                        // refresh the pages data in DB
                        refreshPages();

                        setVisible(false);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with an error status
                        const { data } = error.response;
                        // Handle error response
                        console.log(data.message);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log('No response received');
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error:', error.message);
                    }
                });
        });
    };

    const setPageVisible = (id, bool) => {
        console.log(id, bool);
        setConnectedPages((prevPages) =>
            prevPages.map((page) => {
                if (page.id == id) {
                    console.log("CHANGE PAGE: ", page);
                    return {
                        ...page,
                        is_visible: bool,
                    };
                }
                return page;
            })
        );
        console.log(connectedPages);
    };

    const handleDelete = async (id, username) => {
        console.log("Logout Account: ", username);
        axios.delete('http://localhost:3000/automate/reddit/me', {
            data: {
                username: username,
            }, withCredentials: true
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                message.success("Account deleted successfully");
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        setConnectedPages(props?.data);
        setOriginalData(props?.data);
    }, [props?.data]);

    useEffect(() => {
        // Compare the current data with the original data and update the isDataChanged state accordingly
        setIsDataChanged(JSON.stringify(connectedPages) !== JSON.stringify(originalData));
        console.log(isDataChanged)
    }, [connectedPages, originalData]);


    return (
        <>
            <Modal
                visible={visible}
                title="Create Subreddit"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={handleCreate}
            >
                <div>
                    <Spin spinning={loading} size="large" >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Subreddit Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the Name of the subreddit!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the title of the subreddit!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </Modal>
            <Modal
                style={{
                    top: 40,
                    backgroundColor: "#FFFFFF",
                    borderRadius: '4px',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: "0px 5px 10px rgba(0, 1, 1, 0.5)",
                }}
                footer={null}
                open={props.addPagesOpen}
                width={'45%'}
                className="modalStyle"
                title={
                    <div className="flex justify-center items-center">
                        <p className="text-[20px] font-medium">Add Social Media Pages</p>
                    </div>
                }
                onOk={() => props.setaddPagesOpen(false)}
                onCancel={() => props.setaddPagesOpen(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
            >

                <Tabs
                    centered
                    defaultActiveKey="1"
                    activeTabClassName="custom-active-tab"
                    onChange={(e) => setActiveKey(e)}
                >
                    <TabPane
                        tab={
                            <div className="flex rounded-t-lg justify-center items-center align-middle">
                                <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className={(activeKey == '1') ? "text-[#FF4500]" : "text-gray-400"} />
                            </div>
                        }
                        key="1"
                    >
                        <div className="flex flex-col h-[360px]">
                            {console.log(props.profile)}
                            {console.log(props.data)}
                            {console.log(connectedPages)}
                            {
                                (props.profile) ? (
                                    <div className="h-1/2 p-2 flex">
                                        <div
                                            className="w-fit h-16 border-[1px] rounded-lg pl-2 pr-2 tooltip"
                                            style={{ backgroundImage: "url(" + props.bannerPic + ")", backgroundSize: "cover" }}
                                            data-tip={"Updated At: " + props.profile.updatedAt}
                                        >
                                            <div className="flex items-center h-full">
                                                <div className="flex justify-center items-center">
                                                    <Avatar size={40} src={props.profile?.profilePic.split("?")[0]} />
                                                </div>
                                                <div>
                                                    <p className="ml-1 font-railway text-stone-800">{props.profile?.username}</p>
                                                </div>
                                                <button
                                                    className={`w-5 h-5 ml-3 shadow-lg rounded-full flex items-center justify-center transition-colors duration-300 ${hover ? "bg-red-500" : "bg-green"
                                                        }`}
                                                    onMouseEnter={() => setHover(true)}
                                                    onMouseLeave={() => setHover(false)}
                                                    onClick={() => {
                                                        handleDelete(props.profile?.id, props.profile?.username);
                                                    }}
                                                >
                                                    {hover ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-8 w-8 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-8 w-8 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="h-1/2 p-2" onClick={() => setVisible(true)}>
                                            <div className="w-28 h-28 border-[2px] border-dashed flex flex-col justify-center hover:shadow-2xl  hover:border-solid rounded-md transition-all duration-100 cursor-pointer">
                                                <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className="text-[#FF4500]" />
                                                <p className="text-zinc-800 font-railway text-center">Create a Subreddit</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-1/2 p-2" onClick={() => connectReddit()}>
                                        <div className="w-28 h-28 border-[2px] border-dashed flex flex-col justify-center hover:shadow-2xl  hover:border-solid rounded-md transition-all duration-100 cursor-pointer">
                                            <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className="text-[#FF4500]" />
                                            <p className="text-zinc-800 font-railway text-center">Add Reddit Profile</p>
                                        </div>
                                    </div>
                                )
                            }

                            {/* <div className="h-1/2 p-2" onClick={() => connectReddit()}>
                            <div className="w-28 h-28 border-[2px] border-dashed flex flex-col justify-center hover:shadow-2xl  hover:border-solid rounded-md transition-all duration-100 cursor-pointer">
                                <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className="text-[#FF4500]" />
                                <p className="text-zinc-800 font-railway text-center">Add Reddit Profile</p>
                            </div>
                        </div> */}
                            <span className="border-[1px] ml-2 mr-2 border-[#838383] opacity-20"></span>

                            <span className="flex items-center ml-2">
                                <div className="rounded-xl w-2 h-2 bg-lime-600"></div>
                                <p className="ml-2 font-extralight mt-1 text-[#838383] opacity-80">Connected Communities</p>
                                <Button onClick={saveConfig} className="ml-2 mt-1 h-7 p-0" disabled={!isDataChanged} type="default" shape="round" >SAVE</Button>
                                <div onClick={refreshPages} className='ml-auto mr-2 tooltip tooltip-left' data-tip="Refresh Pages">
                                    <SyncOutlined className='text-[16px] text-gray-400 hover:text-slate-900 cursor-pointer' />
                                </div>
                            </span>

                            <div className="h-full p-2 flex gap-3 overflow-x-scroll">
                                {
                                    (connectedPages.length != 0) ? (
                                        connectedPages?.map((page, id) => (
                                            <div className="w-36 h-36 pb-2 border-[1px] flex flex-col justify-between transition-all duration-100">
                                                <div className="h-7 justify-between items-center align-middle pl-2 flex">
                                                    <div className="tooltip tooltip-right" data-tip="Page visible">
                                                        {
                                                            (page.is_visible) ? (
                                                                <EyeOutlined onClick={() => setPageVisible(page.id, false)} className="cursor-pointer" style={{ fontSize: 17, color: "gray" }} />
                                                            ) :
                                                                (
                                                                    <EyeInvisibleOutlined onClick={() => setPageVisible(page.id, true)} className="cursor-pointer" style={{ fontSize: 17, color: "gray" }} />
                                                                )
                                                        }
                                                    </div>
                                                    {/* <div className="pr-2 tooltip" data-tip="Disconnect">
                                                        <CloseCircleOutlined className={`text-[16px] transition-colors duration-200 text-red-500 hover:text-red-700`} />
                                                    </div> */}
                                                </div>
                                                <div className="w-36 flex flex-col justify-center items-center ">
                                                    <Avatar size={35} style={{ margin: 5 }} icon={<img src={(page.icon == '') ? "https://b.thumbs.redditmedia.com/iTldIIlQVSoH6SPlH9iiPZZVzFWubJU7cOM__uqSOqU.png" : page?.icon?.split('?')[0]} />} />
                                                    <p className="text-zinc-800 font-railway text-center text-xs mb-5">r/{page.subreddit}</p>
                                                    {
                                                        (page.is_mod) ? (
                                                            <p className="rounded-full pl-2 pr-2 bg-purple-800 text-zinc-50 font-railway text-sm">mod</p>
                                                        ) : (
                                                            <p className="rounded-full pl-2 pr-2 bg-blue text-zinc-50 font-railway text-sm">member</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>
                                            {console.log(connectedPages)}
                                            {console.log(props.data)}
                                            <p className="text-zinc-800 font-railway text-center">No Connected Communities</p>
                                            <p className="text-zinc-800 font-railway text-center">Add a community to get started</p>
                                            <div className="h-1/2 p-2" onClick={{}}>
                                                <div className="w-28 h-28 border-[2px] border-dashed flex flex-col justify-center hover:shadow-2xl  hover:border-solid rounded-md transition-all duration-100 cursor-pointer">
                                                    <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className="text-[#FF4500]" />
                                                    <p className="text-zinc-800 font-railway text-center">Create a Subreddit</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={ // Custom tab header with bold title in the middle
                            <div className="flex rounded-t-lg justify-center items-center align-middle">
                                <LinkedinFilled style={{ fontSize: 35, margin: 'auto' }} className={(activeKey == '2') ? "text-[#0077b5]" : "text-gray-400"} />
                            </div>
                        }
                        key="2"
                    >
                        Tab 2 content
                    </TabPane>
                </Tabs>

            </Modal>
        </>
    )
}