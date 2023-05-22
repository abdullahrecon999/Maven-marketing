import { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, CommentOutlined, LinkOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Title } = Typography;

const AnalyticsPost = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (props.visible && props.post) {
            // Fetch data from the backend
            console.log("Fetching data from backend: ", props.post)
            axios.get('http://localhost:3000/automate/reddit/v2/getPostDetails', {
                params: {
                    postid: props.post
                }
            })
                .then((response) => {
                    // Set the fetched data
                    setData(response.data);
                    console.log("Data fetched: ", response.data)
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [props.post, props.visible]);

    return (
        <div>
            <Modal
                visible={props.visible}
                onCancel={props.onClose}
                width={900}
                footer={null}
                title={<p className='text-xl font-railway'>Analytics</p>}
            >
                {loading ? (
                    <>
                        <Spin size="large" />
                        <p className='text-xl font-railway'>{props.post}</p>
                    </>
                ) : (
                    data ? (
                        <div className='flex flex-col md:h-96'>
                            <div className="flex flex-col sm:flex-row justify-between">
                                <div class="px-4 py-6 shadow-lg shadow-cyan-200 w-44 h-44">
                                    <ArrowUpOutlined className="text-xl h-14 w-14 rounded-xl bg-cyan-50 p-4 text-cyan-500" />
                                    <p class="mt-4 font-medium">Upvotes</p>
                                    <p class="mt-2 text-2xl font-semibold gap-3 flex items-center">
                                        {data.response[0].data.children[0].data.ups}
                                        <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </p>
                                </div>
                                <div class="px-4 py-6 shadow-lg shadow-emerald-200 w-44 h-44">
                                    <CommentOutlined className="text-xl h-14 w-14 rounded-xl bg-emerald-50 p-4 text-emerald-500" />
                                    <p class="mt-4 font-medium">Comments</p>
                                    <p class="mt-2 text-2xl font-semibold">
                                        {data.response[0].data.children[0].data.num_comments}
                                    </p>
                                </div>
                                <div class="px-4 py-6 shadow-lg shadow-red-200 w-44 h-44">
                                    <LinkOutlined className="text-xl h-14 w-14 rounded-xl bg-red-50 p-4 text-red-500" />
                                    <p class="mt-4 font-medium">Shares</p>
                                    <p class="mt-2 text-2xl font-semibold">
                                        {data.response[0].data.children[0].data.num_crossposts}
                                    </p>
                                </div>
                                <div class="px-4 py-6 shadow-lg shadow-yellow-100 w-44 h-44">
                                    <SmileOutlined className="text-xl h-14 w-14 rounded-xl bg-yellow-50 p-4 text-yellow-500" />
                                    <p class="mt-4 font-medium">Sentiments</p>
                                    <p class="mt-2 text-2xl font-semibold">
                                        Positive

                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col p-2 mt-4'>
                                <Title level={4}>Comments</Title>
                                <div className='overflow-y-auto h-full'>
                                    {data.response[1]?.data?.children.map((comment) => (
                                        <div key={comment.data.id} className="border rounded p-3 mb-3">
                                            <p className="font-bold">{comment.data.body}</p>
                                            <p className="text-gray-500">Upvotes: {comment.data.ups}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No data available.</p>
                    )
                )}
            </Modal>
        </div>
    );
};

export default AnalyticsPost;
