import React, { useState } from 'react';
import { FileUpload } from './FileUploader';
import { NavBar } from "../../Components/brandComponents/navbar";
import { motion } from "framer-motion";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Modal, Button, Table, Tag, message } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function BulkSchedule() {
    const [csvData, setCSVData] = useState([]); // State to hold the parsed CSV data
    const [modalVisible, setModalVisible] = useState(false);
    const [invalidPosts, setInvalidPosts] = useState([]);
    const [warningVisible, setWarningVisible] = useState(false);
    const { isLoading, error, data, isSuccess } = useQuery('schedules', () => axios.get('http://localhost:3000/automate/reddit/v2/getScheduledPosts', { withCredentials: true }));

    const handleConfirm = () => {
        handleValidateScheduleTimes();

        // console.log("No errors, proceed with scheduling.")
        console.log(csvData);
        // axios.post('http://localhost:3000/automate/reddit/v2/bulkSchedule', { data: csvData }, { withCredentials: true })
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    };

    const onConfirm = () => {
        // delete the schedules from backend
        axios.post('http://localhost:3000/automate/reddit/v2/deleteScheduledPosts', { withCredentials: true })
            .then(res => {
                console.log(res)
                message.success('Successfully deleted Schedules');
            })
            .catch(err => {
                console.log(err)
                message.error('Failed to delete Schedules');
            })
        setWarningVisible(false);
    };

    const handleCancel = () => {
        setWarningVisible(false);
    };

    const handleValidateScheduleTimes = () => {
        const currentTime = dayjs();
        console.log("Current time: ", currentTime);

        const invalidPosts = csvData.filter(post => {
            const scheduledTime = dayjs(post['schedule time']);
            console.log("Scheduled time: ", scheduledTime);
            return scheduledTime.isBefore(currentTime);
        });

        console.log("Invalid posts: ", invalidPosts);

        if (invalidPosts.length === 0) {
            console.log("No errors, proceed with scheduling.")

            axios.post('http://localhost:3000/automate/reddit/v2/bulkSchedule', { data: csvData }, { withCredentials: true })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            return;
        }
        setInvalidPosts(invalidPosts);
        setModalVisible(true);
    };

    const handleProceed = () => {
        const validPosts = csvData.filter(post => !invalidPosts.includes(post));

        // Proceed with validPosts, send to backend, etc.
        console.log("validPosts: ", validPosts);
        axios.post('http://localhost:3000/automate/reddit/v2/bulkSchedule', { data: validPosts }, { withCredentials: true })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        setModalVisible(false);
    };

    return (
        <div>
            <motion.div whileInView={{ animation: "fadeIn" }} >
                <NavBar isSticky={false} />
            </motion.div>
            <Modal
                title="Schedule Time Errors"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="proceed" type="primary" onClick={handleProceed}>
                        Proceed Anyways
                    </Button>
                ]}
            >
                <p>The following posts have schedule times in the past:</p>
                {invalidPosts.map(post => (
                    <div key={post.key} className="bg-neutral-200 p-3 rounded-sm m-2">
                        <h3>Post Title: {post.title}</h3>
                        <p>Schedule Time: {post['schedule time'].toString()}</p>
                    </div>
                ))}
            </Modal>
            <Modal
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined className="text-red-500 text-4xl mr-2" />
                        <h2 className="text-red-500 text-2xl">Delete schedules?</h2>
                    </div>
                }
                visible={warningVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" type='default' onClick={handleCancel} className="border border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-100">
                        No, cancel
                    </Button>,
                    <Button key="delete" danger onClick={onConfirm} className="ml-2">
                        Yes, delete
                    </Button>,
                ]}
            >
                <p className="text-lg mb-4">This action is not reversible. Proceeding will permanently delete the schedules.</p>
                <p className="text-sm text-gray-600">The posts with status 
                <Tag className='m-1' color={"geekblue"}>
                    Scheduled
                </Tag>and
                <Tag className='m-1' color={"volcano"}>
                    Failed
                </Tag> will be removed.</p>
            </Modal>
            <FileUpload csvData={csvData} setCSVData={setCSVData} confirm={handleConfirm} />
            <div className="p-5 bg-white">
                <h1 className="text-lg font-bold">Scheduled Posts</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.response.data.error}</p>}
                {isSuccess && (
                    <div>
                        <Table
                            className='mt-3 mx-5'
                            dataSource={data.data.data[0].schedules}
                            columns={[
                                {
                                    title: 'Key',
                                    dataIndex: 'key',
                                    key: 'key',
                                },
                                {
                                    title: 'Subreddit',
                                    dataIndex: 'subredditName',
                                    key: 'subreddit',
                                },
                                {
                                    title: 'Title',
                                    dataIndex: 'title',
                                    key: 'title',
                                },
                                {
                                    title: 'Status',
                                    dataIndex: 'status',
                                    key: 'status',
                                    render: (text, record) => (
                                        <Tag color={(record.status === 'scheduled') ? "geekblue" : (record.status === 'posted') ? "green" : "volcano"}>
                                            {record.status}
                                        </Tag>
                                    )
                                },
                                {
                                    title: 'Schedule Time',
                                    dataIndex: 'scheduledAt',
                                    key: 'scheduledAt',
                                    render: (text, record) => (
                                        <span>
                                            {moment(record.scheduledAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </span>
                                    )
                                },
                                {
                                    title: 'Error',
                                    dataIndex: 'error',
                                    key: 'error',
                                    render: (text, record) => (
                                        <span>
                                            {record.error}
                                        </span>
                                    )
                                }
                            ]}
                            pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
                        />
                        {console.log(data.data.data[0].schedules)}
                        <button onClick={() => setWarningVisible(true)} className="border-dashed border-[1px] border-red-500 text-red-500 hover:border-red-300 hover:text-red-300 text-base font-bold py-2 px-4 rounded-md w-44 ml-auto flex mr-3">
                            Remove Schedules
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};