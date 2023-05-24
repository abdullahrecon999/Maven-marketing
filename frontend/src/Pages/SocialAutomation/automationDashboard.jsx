import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import { NavBar } from "../../Components/brandComponents/navbar";
import { motion, AnimatePresence } from "framer-motion"
import { Select, Dropdown, Button, Modal, Avatar, Popover, DatePicker, Menu, Drawer, Input, Switch } from 'antd';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from 'marked';
import debounce from 'lodash.debounce';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Image, Checkbox, Tabs, Spin, notification } from 'antd';
import LazyLoad from 'react-lazy-load';
import { GifSelector } from "./gifSelector";
import { MediaSelector } from "./mediaSelector";
import { RedditUI } from "./redditUI";
import { Typewriter } from 'react-simple-typewriter'
import { MyCalendar } from "./calenderComponent";
import { AddPages } from "./addPageModal";
import axios from "axios";
import { RenderOptions } from "./textOptions";
import { EditorMDE } from "./editorComponent";
import {Link} from 'react-router-dom';
const { TabPane } = Tabs;
const { Dragger } = Upload;
import moment from 'moment';

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
import { useQuery } from "react-query";

// const items = [
//     {
//         label: <div className="flex gap-2 items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                 width="15" height="15"
//                 viewBox="0 0 16 16">
//                 <path d="M 3.1679688 1.25 C 2.7179687 1.25 2.2847969 1.4381563 1.9667969 1.7851562 C 1.6707969 2.1071563 1.5 2.544 1.5 3 L 1.5 13 C 1.5 13.456 1.6707969 13.892844 1.9667969 14.214844 C 2.2847969 14.561844 2.7179687 14.75 3.1679688 14.75 L 12.332031 14.75 C 12.782031 14.75 13.215203 14.561844 13.533203 14.214844 C 13.829203 13.892844 14 13.456 14 13 L 14 12 C 14 11.586 13.664 11.25 13.25 11.25 C 12.836 11.25 12.5 11.586 12.5 12 L 12.5 13 C 12.5 13.075 12.477688 13.147219 12.429688 13.199219 C 12.403688 13.228219 12.369031 13.25 12.332031 13.25 L 3.1679688 13.25 C 3.1309688 13.25 3.0963125 13.228219 3.0703125 13.199219 C 3.0223125 13.147219 3 13.075 3 13 L 3 3 C 3 2.925 3.0223125 2.8527813 3.0703125 2.8007812 C 3.0963125 2.7717813 3.1309687 2.75 3.1679688 2.75 L 12.332031 2.75 C 12.369031 2.75 12.403688 2.7717813 12.429688 2.8007812 C 12.477688 2.8527813 12.5 2.925 12.5 3 L 12.5 4 C 12.5 4.414 12.836 4.75 13.25 4.75 C 13.664 4.75 14 4.414 14 4 L 14 3 C 14 2.544 13.829203 2.1071562 13.533203 1.7851562 C 13.215203 1.4381563 12.782031 1.25 12.332031 1.25 L 3.1679688 1.25 z M 8.75 5.25 C 8.558 5.25 8.3667031 5.3242031 8.2207031 5.4707031 L 6.2207031 7.4707031 C 5.9277031 7.7637031 5.9277031 8.2362969 6.2207031 8.5292969 L 8.2207031 10.529297 C 8.5127031 10.822297 8.9872969 10.822297 9.2792969 10.529297 C 9.5722969 10.237297 9.5722969 9.7627031 9.2792969 9.4707031 L 8.5585938 8.75 L 13.75 8.75 C 14.164 8.75 14.5 8.414 14.5 8 C 14.5 7.586 14.164 7.25 13.75 7.25 L 8.5585938 7.25 L 9.2792969 6.5292969 C 9.5722969 6.2372969 9.5722969 5.7627031 9.2792969 5.4707031 C 9.1332969 5.3242031 8.942 5.25 8.75 5.25 z"></path>
//             </svg>
//             Bulk Scheduling
//         </div>,
//         key: '0',
//     },
//     {
//         label: <div className="flex gap-2 items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                 width="15" height="15"
//                 viewBox="0 0 24 24">
//                 <path fill="#303C42" d="M14,11.5564575V3c0-1.1030273-0.8969727-2-2-2s-2,0.8969727-2,2v8.5564575 C8.8102417,12.2503662,8,13.5261841,8,15s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2s2-0.8969727,2-2 v-2.5564575C15.1897583,17.7496338,16,16.4738159,16,15S15.1897583,12.2503662,14,11.5564575z"></path><path fill="#303C42" d="M8,7c0-1.4738159-0.8102417-2.7496338-2-3.4435425V3c0-1.1030273-0.8969727-2-2-2S2,1.8969727,2,3 v0.5564575C0.8102417,4.2503662,0,5.5261841,0,7s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2s2-0.8969727,2-2 V10.4435425C7.1897583,9.7496338,8,8.4738159,8,7z"></path><path fill="#303C42" d="M24,9c0-1.4738159-0.8102417-2.7496338-2-3.4435425V3c0-1.1030273-0.8969727-2-2-2s-2,0.8969727-2,2 v2.5564575C16.8102417,6.2503662,16,7.5261841,16,9s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2 s2-0.8969727,2-2v-8.5564575C23.1897583,11.7496338,24,10.4738159,24,9z"></path>
//             </svg>
//             Analytics
//         </div>,
//         key: '1',
//     },
// ];

const ImageCheckbox = ({ src, checked, onChange }) => {
    const handleCheckboxChange = (e) => {
        onChange(e.target.checked);
    };

    return (
        <div className="relative">
            <label
                className="absolute top-0 left-0 m-2 cursor-pointer z-10"
                style={{ width: '24px', height: '24px' }}
            >
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    style={{ fontSize: '16px' }}
                />
            </label>
            <Image width={200} src={src} />
        </div>
    );
};

const loadMedia = async () => {
    console.log("Loading Media");
    try {
        const response = await axios.get("http://localhost:3000/media/getMedia", {
            withCredentials: true,
        });
        if (response.status !== 200) {
            console.log("Error while fetching data");
        }
        console.log("RESPONSE: ", response.data)
        return response.data.data[0].media;
    } catch (error) {
        console.log(error);
        throw new Error("Error while fetching data");
    }
};

const loadDashboard = async () => {
    console.log("Loading Dashboard");
    return axios.get("http://localhost:3000/automate/reddit")
        .then(response => {
            if (response.status !== 200) {
                console.log("Error while fetching data");
                throw new Error("Error while fetching data");
            }
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw new Error("Error while fetching data");
        });
};

const AutomationDashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTab, setSelectedTab] = useState('0');
    const [addPagesOpen, setaddPagesOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [body, setBody] = useState('feed');
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);

    const [composeOpen, setComposeOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);
    const editorRef = useRef(null);
    const [postText, setPostText] = useState("");
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedSubreddits, setSelectedSubreddits] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [connectedPages, setConnectedPages] = useState([])

    const openNotificationWithIcon = (type, msg, description) => {
        api[type]({
            message: msg,
            description:
                description,
        });
    };

    const { data: subreddits, isLoading, isError, isSuccess } = useQuery("subreddits", loadDashboard, { fetchPolicy: "network-only" });
    const { data: media, isLoading: isMediaLoading, isSuccess: isMediaSuccess } = useQuery("media", loadMedia, { fetchPolicy: "network-only" });

    const generateItems = (data) => {
        return [
            {
                label: <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="15" height="15"
                        viewBox="0 0 16 16">
                        <path d="M 3.1679688 1.25 C 2.7179687 1.25 2.2847969 1.4381563 1.9667969 1.7851562 C 1.6707969 2.1071563 1.5 2.544 1.5 3 L 1.5 13 C 1.5 13.456 1.6707969 13.892844 1.9667969 14.214844 C 2.2847969 14.561844 2.7179687 14.75 3.1679688 14.75 L 12.332031 14.75 C 12.782031 14.75 13.215203 14.561844 13.533203 14.214844 C 13.829203 13.892844 14 13.456 14 13 L 14 12 C 14 11.586 13.664 11.25 13.25 11.25 C 12.836 11.25 12.5 11.586 12.5 12 L 12.5 13 C 12.5 13.075 12.477688 13.147219 12.429688 13.199219 C 12.403688 13.228219 12.369031 13.25 12.332031 13.25 L 3.1679688 13.25 C 3.1309688 13.25 3.0963125 13.228219 3.0703125 13.199219 C 3.0223125 13.147219 3 13.075 3 13 L 3 3 C 3 2.925 3.0223125 2.8527813 3.0703125 2.8007812 C 3.0963125 2.7717813 3.1309687 2.75 3.1679688 2.75 L 12.332031 2.75 C 12.369031 2.75 12.403688 2.7717813 12.429688 2.8007812 C 12.477688 2.8527813 12.5 2.925 12.5 3 L 12.5 4 C 12.5 4.414 12.836 4.75 13.25 4.75 C 13.664 4.75 14 4.414 14 4 L 14 3 C 14 2.544 13.829203 2.1071562 13.533203 1.7851562 C 13.215203 1.4381563 12.782031 1.25 12.332031 1.25 L 3.1679688 1.25 z M 8.75 5.25 C 8.558 5.25 8.3667031 5.3242031 8.2207031 5.4707031 L 6.2207031 7.4707031 C 5.9277031 7.7637031 5.9277031 8.2362969 6.2207031 8.5292969 L 8.2207031 10.529297 C 8.5127031 10.822297 8.9872969 10.822297 9.2792969 10.529297 C 9.5722969 10.237297 9.5722969 9.7627031 9.2792969 9.4707031 L 8.5585938 8.75 L 13.75 8.75 C 14.164 8.75 14.5 8.414 14.5 8 C 14.5 7.586 14.164 7.25 13.75 7.25 L 8.5585938 7.25 L 9.2792969 6.5292969 C 9.5722969 6.2372969 9.5722969 5.7627031 9.2792969 5.4707031 C 9.1332969 5.3242031 8.942 5.25 8.75 5.25 z"></path>
                    </svg>
                    Bulk Scheduling
                </div>,
                key: '0',
            },
            {
                label: <Link target="_blank" rel="noopener noreferrer" to={{pathname: "/socialautomation/analytics"}} className="flex gap-2 items-center" >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="15" height="15"
                        viewBox="0 0 24 24">
                        <path fill="#303C42" d="M14,11.5564575V3c0-1.1030273-0.8969727-2-2-2s-2,0.8969727-2,2v8.5564575 C8.8102417,12.2503662,8,13.5261841,8,15s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2s2-0.8969727,2-2 v-2.5564575C15.1897583,17.7496338,16,16.4738159,16,15S15.1897583,12.2503662,14,11.5564575z"></path><path fill="#303C42" d="M8,7c0-1.4738159-0.8102417-2.7496338-2-3.4435425V3c0-1.1030273-0.8969727-2-2-2S2,1.8969727,2,3 v0.5564575C0.8102417,4.2503662,0,5.5261841,0,7s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2s2-0.8969727,2-2 V10.4435425C7.1897583,9.7496338,8,8.4738159,8,7z"></path><path fill="#303C42" d="M24,9c0-1.4738159-0.8102417-2.7496338-2-3.4435425V3c0-1.1030273-0.8969727-2-2-2s-2,0.8969727-2,2 v2.5564575C16.8102417,6.2503662,16,7.5261841,16,9s0.8102417,2.7496338,2,3.4435425V21c0,1.1030273,0.8969727,2,2,2 s2-0.8969727,2-2v-8.5564575C23.1897583,11.7496338,24,10.4738159,24,9z"></path>
                    </svg>
                    Analytics
                </Link>,
                key: '1',
            },
        ];
    }

    const props = {
        name: 'files',
        multiple: true,
        action: 'http://localhost:3000/media/upload',
        withCredentials: true,
        onChange(info) {
            const { status } = info.file;
            console.log('Selected files:', info.fileList);
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log(info.file.response);
                setImages([...images, { url: info.file.response.data.link }]);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        if (isSuccess && subreddits) {
            setConnectedPages(subreddits.subreddits.map((subreddit, index) => ({
                id: subreddit.subredditid,
                ...subreddit
            })));
            //   set selected tab to be the first of the list if is_visible is true
            // setSelectedPage(subreddits?.subreddits[0]?.subredditid);
            // get subredditid for the first visible page
            let sid = subreddits.subreddits.filter((subreddit) => {
                if (subreddit.is_visible) {
                    return subreddit.subredditid;
                }
            });
            console.log("sid: ", sid);
            setSelectedPage(sid[0].subredditid);
        }
    }, [isSuccess, subreddits]);

    useEffect(() => {
        if (isMediaSuccess && media) {
            setImages([...images, ...media]);
            console.log(media);
        }
    }, [isMediaSuccess, media]);

    const handleTitle = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const callError = (type, msg, desc) => {
        openNotificationWithIcon(type, msg, desc);
    }

    const handleSelectedAccount = (username) => {
        setSelectedSubreddits((prevSelectedDivs) => {
            if (prevSelectedDivs.includes(username)) {
                // If the div is already selected, remove it from the selectedDivs array
                return prevSelectedDivs.filter((id) => id !== username);
            } else {
                // If the div is not selected, add it to the selectedDivs array
                return [...prevSelectedDivs, username];
            }
        });
    };

    const handleImageCheckboxChange = (index, checked) => {
        if (checked) {
            setSelectedKeys([...selectedKeys, index]);
            setSelectAll(true)
        } else {
            // if no checked items left, uncheck select all checkbox
            if (selectedKeys.length === 1) {
                setSelectAll(false);
            }
            setSelectedKeys(selectedKeys.filter((key) => key !== index));
        }

        // setSelectAll(selectedKeys.length != 0);
    };

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        if (checked) {
            setSelectedKeys(images.map((_, index) => index));
        } else {
            setSelectedKeys([]);
        }
    };

    const deleteFiles = () => {
        console.log(selectedKeys);
        const selectedImages = selectedKeys.map((key) => images[key]);
        console.log("selectedImages: ", selectedImages);
        // get array of only urls
        const urls = selectedImages.map((image) => image.url);
        console.log("urls: ", urls);

        // delete from db by sending array of urls
        axios.delete("http://localhost:3000/media/deleteMultipleMedia", {
            data: {
                mediaUrls: urls,
            },
        }).then((res) => {
            console.log(res);
            // delete from state
            setImages(images.filter((image) => !urls.includes(image.url)));
            setSelectedKeys([]);
            setSelectAll(false);
        }).catch((err) => {
            console.log(err);
        });
    };

    const publishPost = () => {
        console.log("Publishing post...");
        console.log("Title: ", title);
        const editorInstance = editorRef.current;
        const text1 = editorInstance.value();
        console.log("Body: ", text1);
        console.log("Selected subreddits: ", selectedSubreddits);
        console.log("Selected date: ", selectedDate);
        console.log("Selected Media: ", selectedMedia);

        if (!title) {
            callError("error", "Error", "Please enter a title");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text1);
        formData.append("subreddits", selectedSubreddits.map(element => "r/" + element).join(","));
        console.log("selectedMedia: ", selectedMedia)

        if (selectedMedia === null) {
            formData.append("media", "");
            formData.append("mediaUrl", "");
            formData.append("mediaType", "");
        } else if (selectedMedia.type === "file") {
            formData.append("media", selectedMedia.media);
            formData.append("mediaUrl", "");
            formData.append("mediaType", selectedMedia.mimeType);
        } else {
            formData.append("media", "");
            formData.append("mediaUrl", selectedMedia.media);
            formData.append("mediaType", selectedMedia.mimeType);
        }

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        axios.post("http://localhost:3000/automate/reddit/v2/createPost", formData, config).then((res) => {
            console.log("RESPONSE: ", res);
            if (res.status === 200) {
                callError("success", "Success", "Post created successfully");
            }
        }
        ).catch((err) => {
            console.log(err);
        });
    };

    const schedulePost = () => {
        console.log("Scheduling post...");
        console.log("Title: ", title);
        const editorInstance = editorRef.current;
        const text1 = editorInstance.value();
        console.log("Body: ", text1);
        console.log("Selected subreddits: ", selectedSubreddits);
        console.log("Selected date: ", selectedDate.$d);
        console.log("Selected Media: ", selectedMedia);

        if (!title) {
            callError("error", "Error", "Please enter a title");
            return;
        }

        if (!selectedDate) {
            callError("error", "Error", "Please select a date");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text1);
        formData.append("subreddits", selectedSubreddits.map(element => "r/" + element).join(","));
        formData.append("scheduledAt", selectedDate);
        console.log("selectedMedia: ", selectedMedia)

        if (selectedMedia === null) {
            formData.append("media", "");
            formData.append("mediaUrl", "");
            formData.append("mediaType", "");
        } else if (selectedMedia.type === "file") {
            formData.append("media", selectedMedia.media);
            formData.append("mediaUrl", "");
            formData.append("mediaType", selectedMedia.mimeType);
        } else {
            formData.append("media", "");
            formData.append("mediaUrl", selectedMedia.media);
            formData.append("mediaType", selectedMedia.mimeType);
        }

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        axios.post("http://localhost:3000/automate/reddit/v2/schedulePost", formData, config).then((res) => {
            console.log("RESPONSE: ", res);
            if (res.status === 200) {
                callError("success", "Success", "Post scheduled successfully");
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const optionsSubmit = [
        {
            label: <div onClick={() => schedulePost()} className="flex gap-2 items-center">
                <ClockCircleOutlined />
                Schedule
            </div>,
            key: '0',
        },
        {
            label: <div onClick={() => publishPost()} className="flex gap-2 items-center">
                <SendOutlined />
                Publish Now
            </div>,
            key: '1',
        },
    ];

    const handleClick = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    };

    const handleMediaSelect = (media) => {
        setSelectedMedia(media);
    };

    const handleDateChange = (value) => {
        setSelectedDate(value);
    };

    const handleBody = (e) => {
        console.log(e);
        setBody(e);
    };

    const getMdeInstance = (instance) => {
        editorRef.current = instance;
    };

    const acceptText = (text) => {
        const editorInstance = editorRef.current;
        const text1 = editorInstance.value();
        console.log("EDITOR TEXT: ", text1);

        const codemirror = editorRef.current.codemirror;
        const doc = codemirror.getDoc();
        const cursor = doc.getCursor();

        const selection = doc.getSelection();

        if (selection) {
            doc.replaceSelection(text);
        } else {
            doc.replaceRange(text, cursor);
            const startPos = { line: cursor.line, ch: cursor.ch };
            const endPos = { line: cursor.line, ch: cursor.ch + text.length };
            doc.setSelection(startPos, endPos);
        }

        codemirror.focus(); // Ensure the editor has focus after inserting text
    };

    const disabledTime = (current) => {
        if (current && current.isSame(moment(), 'day')) {
            // Disable hours before the current hour and minutes before the current minute plus 30
            return {
                disabledHours: () => Array.from({ length: moment().hour() }).map((_, index) => index),
                // disabledMinutes: () => Array.from({ length: moment().minute() + 10 }).map((_, index) => index),
            };
        }
        return {};
    };

    return (
        <div className="min-h-screen flex flex-col flex-grow bg-[#E9EBEE]">
            {contextHolder}
            {/* Navbar with dynamic tabs */}
            <motion.div whileInView={{ animation: "fadeIn" }} >
                <NavBar isSticky={false} />
            </motion.div>

            <Modal
                title="Compose a Post"
                style={{
                    top: 20,
                    marginBottom: 50,
                    backgroundColor: "#FFFFFF",
                    borderRadius: '4px',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: "0px 5px 10px rgba(0, 1, 1, 0.5)",
                }}
                open={composeOpen}
                maskClosable={false}
                width={'50%'}
                className="modalStyle"
                onOk={() => setComposeOpen(false)}
                onCancel={() => setComposeOpen(false)}
                footer={
                    <div className="h-12 border-1 bg-gray-100 flex border-t-[1px] items-center justify-between w-full pl-2 pr-2">
                        <DatePicker
                            showTime
                            suffixIcon={<ClockCircleOutlined />}
                            style={{ border: "none", minWidth: 120, maxWidth: '32%', fontSize: 20, fontWeight: 'bolder', backgroundColor: "transparent" }}
                            value={selectedDate}
                            onChange={handleDateChange}
                            placeholder="Select Date and Time"
                            allowClear={true}
                            className="custom-class"
                            disabledDate={(current) => current && current <= moment().startOf('day')}
                            disabledTime={disabledTime}
                        />
                        <Dropdown.Button
                            className="rounded-lg w-fit"
                            type="primary"
                            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                            icon={<CaretDownOutlined />}
                            overlay={
                                <Menu>
                                    {optionsSubmit.map((option) => (
                                        <Menu.Item key={option.key}>{option.label}</Menu.Item>
                                    ))}
                                </Menu>
                            }
                        >
                            Save Draft
                        </Dropdown.Button>
                    </div>
                }
            >
                <div className="h-full flex">
                    <motion.div
                        className="border-1 rounded-r-md flex justify-center overflow-hidden pl-2"
                        initial={{ width: 75 }}
                        animate={{ width: isExpanded ? 300 : 75 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onClick={handleClick}
                        onMouseLeave={handleMouseLeave}
                    >
                        {
                            isExpanded ? (
                                <div className="flex flex-col gap-2 pt-3 pl-1">
                                    {
                                        connectedPages.map((page, id) => (
                                            (page.is_visible) ? (
                                                <div key={id} onClick={() => handleSelectedAccount(page.subreddit)} className={`flex border-[1px] rounded-lg p-2 gap-1 justify-between group hover:border-orange-300 cursor-pointer ${(selectedSubreddits.includes(page.subreddit)) ? "border-orange-500" : ""} `}>
                                                    <Avatar size={25} icon={(page.icon == '') ? <img src="https://b.thumbs.redditmedia.com/iTldIIlQVSoH6SPlH9iiPZZVzFWubJU7cOM__uqSOqU.png" /> : <img src={page?.icon?.split('?')[0]} />} />
                                                    <p className="text-xs font-light mr-2">{page.subreddit}</p>
                                                    <RedditCircleFilled className={`text-gray-500 group-hover:text-orange-300 ${(selectedSubreddits.includes(page.subreddit)) ? "border-orange-500 text-orange-500" : ""}`} style={{ fontSize: 25 }} />
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        ))
                                    }
                                </div>
                            )
                                : (
                                    <div className="grid grid-cols-2 pl-1 h-full transition-all ease-linear">
                                        <div className="col-span-1 pt-6 gap-2 flex flex-col">
                                            {
                                                connectedPages.map((page, id) => (
                                                    (page.is_visible) ? (
                                                        <div key={id} className="" data-tip={page.subreddit}>
                                                            <RedditCircleFilled
                                                                style={{
                                                                    fontSize: 35,
                                                                    color: selectedSubreddits.includes(page.subreddit) ? "#FF4500" : "grey",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )
                                                ))
                                            }
                                        </div>
                                        <div className="col-span-1 flex flex-col justify-end items-end gap-5 mb-auto mt-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                transform="rotate(90 0 0)"
                                                width="15" height="15"
                                                viewBox="0 0 50 50">
                                                <path d="M 24.8125 9 C 24.734375 9.023438 24.664063 9.054688 24.59375 9.09375 L 2.59375 19.09375 C 2.234375 19.253906 2.003906 19.609375 2 20 L 2 26 C 2.003906 26.335938 2.175781 26.648438 2.457031 26.832031 C 2.742188 27.015625 3.097656 27.042969 3.40625 26.90625 L 25 17.09375 L 46.59375 26.90625 C 46.902344 27.042969 47.257813 27.015625 47.542969 26.832031 C 47.824219 26.648438 47.996094 26.335938 48 26 L 48 20 C 47.996094 19.609375 47.765625 19.253906 47.40625 19.09375 L 25.40625 9.09375 C 25.222656 9.003906 25.015625 8.96875 24.8125 9 Z M 25 11.09375 L 46 20.625 L 46 24.46875 L 25.40625 15.09375 C 25.148438 14.980469 24.851563 14.980469 24.59375 15.09375 L 4 24.46875 L 4 20.625 Z M 24.8125 23 C 24.734375 23.023438 24.664063 23.054688 24.59375 23.09375 L 2.59375 33.09375 C 2.234375 33.253906 2.003906 33.609375 2 34 L 2 40 C 2.003906 40.335938 2.175781 40.648438 2.457031 40.832031 C 2.742188 41.015625 3.097656 41.042969 3.40625 40.90625 L 25 31.09375 L 46.59375 40.90625 C 46.902344 41.042969 47.257813 41.015625 47.542969 40.832031 C 47.824219 40.648438 47.996094 40.335938 48 40 L 48 34 C 47.996094 33.609375 47.765625 33.253906 47.40625 33.09375 L 25.40625 23.09375 C 25.222656 23.003906 25.015625 22.96875 24.8125 23 Z M 25 25.09375 L 46 34.625 L 46 38.46875 L 25.40625 29.09375 C 25.148438 28.980469 24.851563 28.980469 24.59375 29.09375 L 4 38.46875 L 4 34.625 Z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                )
                        }
                    </motion.div>
                    <div className="flex flex-col gap-2 w-full border-1 p-3">
                        <Input required placeholder="Title" showCount maxLength={300} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <EditorMDE editorRef={editorRef} getMdeInstance={getMdeInstance} postText={postText} setPostText={setPostText} />
                        <div className="h-full">
                            {/* Selected Option -Image / Video, -GIF, -File, -AI */}
                            {/* {renderOptions(selectedTab)} */}
                            <RenderOptions images={images} onSelectGif={handleMediaSelect} onImageSelect={handleMediaSelect} onSelectMedia={handleMediaSelect} editorRef={editorRef} selectedTab={selectedTab} addText={(e) => acceptText(e)} />
                        </div>

                    </div>
                    <div className="flex flex-col gap-3 w-12 border-1 pt-6">
                        <div className="tooltip tooltip-left" data-tip="Images/Videos">
                            <FileImageOutlined onClick={() => setSelectedTab('0')} style={{ fontSize: 25 }} className={`${selectedTab == '0' ? "text-orange-500" : "text-gray-400"} hover:text-orange-400`} />
                        </div>
                        <div className="tooltip tooltip-left" data-tip="Import from Media">
                            <FileTextOutlined onClick={() => setSelectedTab('1')} style={{ fontSize: 25 }} className={`${selectedTab == '1' ? "text-orange-500" : "text-gray-400"} hover:text-orange-400`} />
                        </div>
                        <div className="tooltip tooltip-left" data-tip="Add Gif">
                            <FileGifOutlined onClick={() => setSelectedTab('2')} style={{ fontSize: 25 }} className={`${selectedTab == '2' ? "text-orange-500" : "text-gray-400"} hover:text-orange-400`} />
                        </div>
                        <div className="tooltip tooltip-left" data-tip="AI Text Generator" onClick={() => setSelectedTab('3')}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="50" height="50"
                                className="group cursor-pointer"
                                viewBox="30,0,256,500">
                                <g fill="#9CA3AF" className={`${selectedTab == '3' ? "fill-[#8669ff]" : "text-gray-400"} group-hover:fill-[#8669ff]`} fill-rule="evenodd" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(10.66667,10.66667)"><path d="M5,1.25c-2.071,0 -3.75,1.679 -3.75,3.75v14c0,2.071 1.679,3.75 3.75,3.75h14c2.071,0 3.75,-1.679 3.75,-3.75v-14c0,-2.071 -1.679,-3.75 -3.75,-3.75zM5,2.75h14c1.243,0 2.25,1.007 2.25,2.25v14c0,1.243 -1.007,2.25 -2.25,2.25h-14c-1.243,0 -2.25,-1.007 -2.25,-2.25v-14c0,-1.243 1.007,-2.25 2.25,-2.25zM15.97461,6.94727c-0.56685,0 -1.02637,0.45952 -1.02637,1.02637c0,0.56685 0.45952,1.02637 1.02637,1.02637c0.56685,0 1.02637,-0.45952 1.02637,-1.02637c0,-0.56685 -0.45952,-1.02637 -1.02637,-1.02637zM9.5,7.25c-0.333,0 -0.6267,0.21811 -0.7207,0.53711l-2.5,8.5c-0.116,0.397 0.11081,0.81659 0.50781,0.93359c0.397,0.116 0.81659,-0.11081 0.93359,-0.50781l0.57617,-1.96289h3.90625l0.57617,1.96289c0.117,0.397 0.53659,0.62381 0.93359,0.50781c0.397,-0.117 0.62381,-0.53659 0.50781,-0.93359l-2.5,-8.5c-0.094,-0.319 -0.3877,-0.53711 -0.7207,-0.53711zM10.06055,8.75h0.37891l1.32227,4.5h-3.02344zM16,9.75c-0.414,0 -0.75,0.336 -0.75,0.75v6c0,0.414 0.336,0.75 0.75,0.75c0.414,0 0.75,-0.336 0.75,-0.75v-6c0,-0.414 -0.336,-0.75 -0.75,-0.75z"></path></g></g>
                            </svg>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="bg-white h-[70px] shadow-[0px_1px_2px_1px_#000] flex p-2 top-[0px] sticky justify-around z-20">
                <div className="flex flex-col w-1/5 justify-center pl-2 pt-5">
                    {/* Dropdown for feed and calender */}
                    <Select
                        defaultValue="Feed"
                        style={{
                            width: 120,
                            height: 40,
                        }}
                        onChange={handleBody}
                        bordered={false}
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{
                            width: 200,
                            borderRadius: 3,
                            padding: 5,
                            border: "none",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                        }}
                        options={[
                            {
                                value: "feed",
                                label: <div className="flex items-center gap-2 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="15" height="15"
                                        viewBox="0 0 50 50">
                                        <path d="M 5 4 C 3.355469 4 2 5.355469 2 7 L 2 43 C 2 44.644531 3.355469 46 5 46 L 45 46 C 46.644531 46 48 44.644531 48 43 L 48 7 C 48 5.355469 46.644531 4 45 4 Z M 5 6 L 45 6 C 45.554688 6 46 6.445313 46 7 L 46 43 C 46 43.554688 45.554688 44 45 44 L 5 44 C 4.445313 44 4 43.554688 4 43 L 4 7 C 4 6.445313 4.445313 6 5 6 Z M 10.8125 14 C 10.261719 14.050781 9.855469 14.542969 9.90625 15.09375 C 9.957031 15.644531 10.449219 16.050781 11 16 L 39 16 C 39.359375 16.003906 39.695313 15.816406 39.878906 15.503906 C 40.058594 15.191406 40.058594 14.808594 39.878906 14.496094 C 39.695313 14.183594 39.359375 13.996094 39 14 L 11 14 C 10.96875 14 10.9375 14 10.90625 14 C 10.875 14 10.84375 14 10.8125 14 Z M 10.8125 24 C 10.261719 24.050781 9.855469 24.542969 9.90625 25.09375 C 9.957031 25.644531 10.449219 26.050781 11 26 L 39 26 C 39.359375 26.003906 39.695313 25.816406 39.878906 25.503906 C 40.058594 25.191406 40.058594 24.808594 39.878906 24.496094 C 39.695313 24.183594 39.359375 23.996094 39 24 L 11 24 C 10.96875 24 10.9375 24 10.90625 24 C 10.875 24 10.84375 24 10.8125 24 Z M 10.8125 34 C 10.261719 34.050781 9.855469 34.542969 9.90625 35.09375 C 9.957031 35.644531 10.449219 36.050781 11 36 L 39 36 C 39.359375 36.003906 39.695313 35.816406 39.878906 35.503906 C 40.058594 35.191406 40.058594 34.808594 39.878906 34.496094 C 39.695313 34.183594 39.359375 33.996094 39 34 L 11 34 C 10.96875 34 10.9375 34 10.90625 34 C 10.875 34 10.84375 34 10.8125 34 Z"></path>
                                    </svg>
                                    <p>Feed</p>
                                </div>,
                            },
                            {
                                value: 'calender',
                                label: <div className="flex items-center gap-2 h-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="15" height="15"
                                        viewBox="0 0 50 50">
                                        <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                                    </svg>
                                    <p>Calender</p>
                                </div>,
                            },
                        ]}
                    >
                    </Select>
                </div>

                <div className="hidden w-full lg:flex justify-center">
                    {/* Add Pages Button */}
                    {
                        isLoading ? (
                            <div className="flex flex-col justify-between items-center group cursor-pointer ml-2 mr-2">
                                <div className="animate-pulse flex flex-col justify-between items-center group cursor-pointer ml-2 mr-2">
                                    <div className="bg-zinc-300 h-[28px] w-[28px] rounded-full"></div>
                                    <p className="text-xs transition-all font-light text-zinc-400 group-hover:text-gray-600 max-w-[80px] text-ellipsis truncate">Loading</p>
                                    <div className="bg-zinc-300 h-[6px] w-20 top-[64px] absolute rounded-t-sm"></div>
                                </div>
                            </div>
                        ) : (
                            isSuccess ? (
                                connectedPages?.map((page, index) => (
                                    page.is_visible ? (
                                        <div key={page.id} onClick={() => { setSelectedPage(page.id); setSelectedSubreddits([page.subreddit]) }} className="flex flex-col justify-between w-[80px] items-center group cursor-pointer ml-1">
                                            {
                                                // page.platform === 'Reddit' ? (
                                                //     <RedditCircleFilled className={(selectedPage === page.id) ? "text-[#FF4500]" : "text-zinc-300 group-hover:text-gray-500 transition-all"} style={{ fontSize: 28 }} />
                                                // ) : (
                                                //     <LinkedinFilled className={(selectedPage === page.id) ? "text-[#0077b5]" : "text-zinc-300 group-hover:text-gray-500 transition-all"} style={{ fontSize: 28 }} />
                                                // )
                                                <RedditCircleFilled className={(selectedPage === page.id) ? "text-[#FF4500]" : "text-zinc-300 group-hover:text-gray-500 transition-all"} style={{ fontSize: 28 }} />
                                            }
                                            <p className="text-xs transition-all font-light text-zinc-400 group-hover:text-gray-600 max-w-[80px] text-ellipsis truncate">{page.subreddit}</p>
                                            {/* <div className={`${(selectedPage === page.id) ? (page.platform === "Reddit") ? "bg-[#FF4500]" : "bg-[#0077b5]" : ""} h-[6px] w-20 top-[64px] absolute rounded-t-sm`}></div> */}
                                            {console.log("Selected Page: ", selectedPage)}
                                            <div className={`${(selectedPage === page.id) ? "bg-[#FF4500]" : ""} h-[6px] w-20 top-[64px] absolute rounded-t-sm`}></div>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                isError ? (
                                    <></>
                                ) : (
                                    <div className="flex flex-col justify-between items-center group cursor-pointer ml-2 mr-2">
                                        <div className="flex flex-col justify-between items-center group cursor-pointer ml-2 mr-2">
                                            <div className="bg-zinc-300 h-[28px] w-[28px] rounded-full"></div>
                                            <p className="text-xs transition-all font-light text-zinc-400 group-hover:text-gray-600 max-w-[80px] text-ellipsis truncate">No Pages</p>
                                            <div className="bg-zinc-300 h-[6px] w-20 top-[64px] absolute rounded-t-sm"></div>
                                        </div>
                                    </div>
                                )
                            )
                        )
                    }

                    <div onClick={() => setaddPagesOpen(true)} className="flex flex-col justify-between items-center group cursor-pointer ml-2 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            className="stroke-zinc-300 group-hover:stroke-gray-500 transition-all"
                            width="27" height="27"
                            viewBox="0 0 50 50">
                            <path d="M 9 4 C 6.2545455 4 4 6.2545455 4 9 L 4 41 C 4 43.745455 6.2545455 46 9 46 L 41 46 C 43.745455 46 46 43.745455 46 41 L 46 9 C 46 6.2545455 43.745455 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.654545 6 44 7.3454545 44 9 L 44 41 C 44 42.654545 42.654545 44 41 44 L 9 44 C 7.3454545 44 6 42.654545 6 41 L 6 9 C 6 7.3454545 7.3454545 6 9 6 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                        <p className="text-xs transition-all font-light text-zinc-400 group-hover:text-gray-600">ADD PAGES</p>
                    </div>

                </div>

                <div className="flex w-[28%] justify-around pt-5 items-center pr-2">
                    <Dropdown
                        overlayStyle={{
                            width: 160,
                        }}
                        menu={{
                            items: generateItems(subreddits),
                        }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <div className="hover:bg-gray-200 w-7 h-7 rounded-sm flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="15" height="15"
                                viewBox="0 0 50 50">
                                <path d="M 8 20 C 4.6875 20 2 22.6875 2 26 C 2 29.3125 4.6875 32 8 32 C 11.3125 32 14 29.3125 14 26 C 14 22.6875 11.3125 20 8 20 Z M 25 20 C 21.6875 20 19 22.6875 19 26 C 19 29.3125 21.6875 32 25 32 C 28.3125 32 31 29.3125 31 26 C 31 22.6875 28.3125 20 25 20 Z M 42 20 C 38.6875 20 36 22.6875 36 26 C 36 29.3125 38.6875 32 42 32 C 45.3125 32 48 29.3125 48 26 C 48 22.6875 45.3125 20 42 20 Z"></path>
                            </svg>
                        </div>
                    </Dropdown>
                    <div className="cursor-pointer flex gap-1 justify-center h-5" onClick={() => setMediaOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="17" height="17"
                            viewBox="0 -5 50 50">
                            <path d="M 3 5 A 1.0001 1.0001 0 0 0 2 6 L 2 21.822266 A 1.0001 1.0001 0 0 0 2 22.220703 L 2 34 A 1.0001 1.0001 0 0 0 3 35 L 37 35 A 1.0001 1.0001 0 0 0 38 34 L 38 26.175781 A 1.0001 1.0001 0 0 0 38 25.847656 L 38 6 A 1.0001 1.0001 0 0 0 37 5 L 3 5 z M 4 7 L 36 7 L 36 23.585938 L 30.707031 18.292969 A 1.0001 1.0001 0 0 0 29.984375 18 A 1.0001 1.0001 0 0 0 29.292969 18.292969 L 25.03125 22.554688 L 14.736328 11.324219 A 1.0001 1.0001 0 0 0 14.029297 11 A 1.0001 1.0001 0 0 0 13.328125 11.259766 L 4 19.740234 L 4 7 z M 30 10 A 2 2 0 0 0 28 12 A 2 2 0 0 0 30 14 A 2 2 0 0 0 32 12 A 2 2 0 0 0 30 10 z M 40 10 L 40 12 L 41 12 L 41 38 L 9 38 L 9 37 L 7 37 L 7 39 A 1.0001 1.0001 0 0 0 8 40 L 42 40 A 1.0001 1.0001 0 0 0 43 39 L 43 11 A 1.0001 1.0001 0 0 0 42 10 L 40 10 z M 13.935547 13.410156 L 23.617188 23.96875 L 21.292969 26.292969 A 1.0001 1.0001 0 1 0 22.707031 27.707031 L 25.517578 24.896484 A 1.0001 1.0001 0 0 0 25.894531 24.519531 L 30 20.414062 L 36 26.414062 L 36 33 L 4 33 L 4 22.441406 L 13.935547 13.410156 z M 45 15 L 45 17 L 46 17 L 46 43 L 14 43 L 14 42 L 12 42 L 12 44 A 1.0001 1.0001 0 0 0 13 45 L 47 45 A 1.0001 1.0001 0 0 0 48 44 L 48 16 A 1.0001 1.0001 0 0 0 47 15 L 45 15 z"></path>
                        </svg>
                        <p className="text-[14px]">Media</p>
                    </div>
                    <div onClick={() => setComposeOpen(true)} className="animate-pulse cursor-pointer h-9 btn-sm flex justify-center items-center gap-1 btn btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="15" height="15"
                            viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.12,5.12)"><path d="M2,2v34.09766h5v5h5v5h28.38672l2.20703,2.21094c0.09766,0.10156 0.21484,0.17969 0.34766,0.23438l0.15625,0.15625c1.60156,1.60156 4.10156,1.69922 5.80469,0c1.59766,-1.60156 1.39844,-4.19922 0,-5.79687l-0.70312,-0.70312l-0.04297,0.04297l-1.15625,-1.14844v-29.09375h-5v-5h-5v-5zM4,4h31v3h-28v27.09766h-3zM9,9h31v3h-28v27.09766h-3zM14,14h31v25.10938l-12.39453,-12.31641c-0.125,-0.125 -0.27734,-0.21484 -0.44922,-0.26172l-6,-1.59766c-0.09375,-0.02734 -0.19531,-0.03516 -0.29687,-0.03125c-0.30469,0.01172 -0.58984,0.16016 -0.76953,0.41016c-0.17969,0.24609 -0.23437,0.5625 -0.15234,0.85938l1.70313,6c0.04297,0.16406 0.13281,0.3125 0.25,0.4375l11.49609,11.48828h-24.38672zM31.38672,28.39844l15.35547,15.25781l-2.98437,2.98438l-15.26953,-15.26562l-0.03125,-0.11328z"></path></g></g>
                        </svg>
                        <p className="text-[13px] text-slate-50 font-medium">COMPOSE</p>
                    </div>
                </div>
            </div>

            <div className="h-full min-h-[900px]">
                {/* Add Page Modal */}
                {
                    isLoading ? (
                        <></>
                    ) : (
                        isSuccess ? (
                            connectedPages.length > 0 ? (
                                <AddPages profile={subreddits.profile} data={connectedPages} addPagesOpen={addPagesOpen} setaddPagesOpen={setaddPagesOpen} notifyError={callError} />
                            ) : (
                                <AddPages profile={subreddits.profile} data={connectedPages} addPagesOpen={addPagesOpen} setaddPagesOpen={setaddPagesOpen} notifyError={callError} />
                            )
                        ) : (
                            <AddPages data={connectedPages} addPagesOpen={addPagesOpen} setaddPagesOpen={setaddPagesOpen} notifyError={callError} />
                        ))
                }

                <Modal
                    title="Add your media files"
                    style={{
                        top: 40,
                        backgroundColor: "#FFFFFF",
                        borderRadius: '4px',
                        padding: 0,
                        overflow: 'hidden',
                        boxShadow: "0px 5px 10px rgba(0, 1, 1, 0.5)",
                    }}
                    footer={null}
                    open={mediaOpen}
                    width={'50%'}
                    className="modalStyle"
                    onOk={() => setMediaOpen(false)}
                    onCancel={() => setMediaOpen(false)}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <div className="flex flex-col">
                        <div className="p-3">
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag Images/Videos to this area to upload</p>
                            </Dragger>
                        </div>
                        <div className="flex h-20 pl-5">
                            {/* Check box to check / uncheck them all */}
                            <Checkbox checked={selectAll} onChange={handleSelectAllChange}>
                                {selectedKeys.length} Files Selected
                            </Checkbox>
                            <Button danger size="small" onClick={deleteFiles} disabled={(selectedKeys.length === 0)} >Delete Files</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-10 overflow-y-auto p-3">
                            {/* Display the files with lazy loading */}
                            {
                                (isMediaLoading) ? (
                                    <div className="flex justify-center items-center h-full">
                                        <Spin size="large" />
                                    </div>
                                ) : (
                                    (isMediaSuccess) ? (
                                        images?.map((image, index) => (
                                            <LazyLoad key={index} width={200} height={200}>
                                                <ImageCheckbox
                                                    key={index}
                                                    src={image.url}
                                                    checked={selectedKeys.includes(index)}
                                                    onChange={(checked) => handleImageCheckboxChange(index, checked)}
                                                />
                                            </LazyLoad>
                                        )
                                        )) : (
                                        <div className="flex justify-center items-center h-full">
                                            <p className="text-gray-400 text-lg">No Images Found</p>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </Modal>

                <div className="h-full">
                    {
                        (body == 'feed') ? (
                            isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Spin size="large" />
                                </div>
                            ) : (
                                isError ? (
                                    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1a237e] via-indigo-800 to-[#2196f3]">
                                        <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-md">
                                            <h1 className="text-3xl font-bold text-gray-100 mb-4 text-center">No Social Media Connected</h1>
                                            <p className="text-gray-200 text-lg mb-8 text-center">Connect your social media accounts to start sharing your content with the world.</p>
                                        </div>
                                    </div>
                                ) : (
                                    isSuccess ? (
                                        connectedPages?.length === 0 ? (
                                            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1a237e] via-indigo-800 to-[#2196f3]">
                                                <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-md">
                                                    <h1 className="text-3xl font-bold text-gray-100 mb-4 text-center">No Social Media Connected</h1>
                                                    <p className="text-gray-200 text-lg mb-8 text-center">Connect your social media accounts to start sharing your content with the world.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <RedditUI profile={subreddits.profile} data={subreddits.subreddits} selectedPage={selectedPage} />
                                        )
                                    ) : (
                                        <div className="flex justify-center items-center h-full">
                                            <Spin size="large" />
                                        </div>
                                    )
                                )
                            )
                        ) : (
                            <MyCalendar />
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default AutomationDashboard;