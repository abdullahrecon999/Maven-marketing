import React, { useEffect, useState } from 'react';
import { Modal, Button, Avatar, Select, DatePicker, TimePicker, Form, Checkbox, Row, Col, Divider, Space, Tabs } from 'antd';
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
} from '@ant-design/icons';

export function AddPages(props) {
    const [activeKey, setActiveKey] = useState('1');
    const [connectedPages, setConnectedPages] = useState(props?.data);
      
    const setPageVisible = (id, bool) => {
        console.log(id, bool);
        setConnectedPages((prevPages) =>
          prevPages.map((page) => {
            if (page.id == id) {
                console.log(page);
              return {
                ...page,
                visible: bool,
              };
            }
            return page;
          })
        );
        console.log(connectedPages);
    };

    return (
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
                    <div className="flex flex-col h-[350px]">
                        {console.log(connectedPages)}
                        <div className="h-1/2 p-2">
                            <div className="w-28 h-28 border-[2px] border-dashed flex flex-col justify-center hover:shadow-2xl  hover:border-solid rounded-md transition-all duration-100 cursor-pointer">
                                <RedditCircleFilled style={{ fontSize: 35, margin: 'auto' }} className="text-[#FF4500]" />
                                <p className="text-zinc-800 font-railway text-center">Add Reddit Profile</p>
                            </div>
                        </div>
                        <span className="border-[1px] ml-2 mr-2 border-[#838383] opacity-20"></span>

                        <span className="flex items-center ml-2">
                            <div className="rounded-xl w-2 h-2 bg-lime-600"></div>
                            <p className="ml-2 font-extralight mt-1 text-[#838383] opacity-80">Connected Communities</p>
                        </span>

                        <div className="h-full p-2 flex gap-3 overflow-x-scroll">
                            {
                                connectedPages?.map((page, id) => (
                                    <div className="w-36 h-36 border-[1px] flex flex-col justify-between transition-all duration-100">
                                        <div className="h-7 justify-between items-center align-middle pl-2 flex">
                                            <div className="tooltip tooltip-right" data-tip="Page visible">
                                                {
                                                    (page.is_visible) ? (
                                                        <EyeOutlined onClick={() => setPageVisible(id, false)} className="cursor-pointer" style={{ fontSize: 17, color: "gray" }} />
                                                    ) :
                                                        (
                                                            <EyeInvisibleOutlined onClick={() => setPageVisible(id, true)} className="cursor-pointer" style={{ fontSize: 17, color: "gray" }} />
                                                        )
                                                }
                                            </div>
                                            <div className="pr-2 tooltip" data-tip="Disconnect">
                                                <CloseCircleOutlined className={`text-[16px] transition-colors duration-200 text-red-500 hover:text-red-700`} />
                                            </div>
                                        </div>
                                        <div className="w-36 flex flex-col justify-center items-center ">
                                            {
                                                (page.icon) ? (
                                                    <Avatar size={35} style={{ margin: 5 }} icon={<img src={page.icon.split('?')[0]} />} />
                                                ) : (
                                                    <Avatar size={35} style={{ margin: 5 }} icon={<UserOutlined />} />
                                                )
                                            }
                                            <p className="text-zinc-800 font-railway text-center text-xs mb-5">r/{page.subreddit}</p>
                                            {
                                                (page.is_mod) ? (
                                                    <p className="rounded-full pl-2 pr-2 bg-purple-800 text-zinc-50 font-railway text-sm">mod</p>
                                                ) : (
                                                    <p className="rounded-full pl-2 pr-2 bg-lime-600 text-zinc-50 font-railway text-sm">subscriber</p>
                                                )
                                            }
                                            <p className="text-xs font-mono text-lime-600">CONNECTED</p>
                                        </div>
                                    </div>
                                    )
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
    )
}