import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "react-query"
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { Button, Form, Input, Select } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Modal, Upload, Row, Col, notification } from 'antd';
import { v4 } from "uuid"
import { storage } from '../../utils/fireBase/fireBaseInit';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import axios from "axios";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

export const BrandProfile = (props) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description:
        desc,
    });
  };
	const [form] = Form.useForm();
	const { state } = useLocation();
	const { user } = state;
	const [mode, setMode] = useState("view");

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 2,
				}}
			>
				Upload
			</div>
		</div>
	);

	const exchange = async (code) => {
		return await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				"grant_type": "authorization_code",
				"code": code,
				"redirect_uri": "http://localhost:5173/brand/linkedin/",
				"client_id": "77oyqfmbrr2780",
				"client_secret": "7VhpJoOGUOjz6TdS"
			},
			body: JSON.stringify({
				code: code
			})
		})
			.then((response) => {
				if (!response.ok) throw new Error(response);
				else return response.json();
			})
	}

	// const { linkedInLogin } = useLinkedIn({
	// 	clientId: '77oyqfmbrr2780',
	// 	scope: 'r_liteprofile r_emailaddress w_member_social',
	// 	redirectUri: `http://localhost:5173/brand/linkedin/`,
	// 	onSuccess: (code) => {
	// 		console.log(code);
	// 		// exchange for access token
	// 		exchange(code)
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	const linkedInLogin = async () => {
		const res = await axios.get("http://localhost:3000/automate/linkedin/me");
		//const res = await axios.get("http://127.0.0.1:3000/users/user", { withCredentials: true, headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}});
    // const data = await res.json();
		//const res = fetch("http://127.0.0.1:3000/users/user", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "same-origin", credentials: "include" })
		console.log(res);
	}

	const redditLogin = async () => {
		const res = await axios.get("http://localhost:3000/automate/reddit/me");
		console.log(res);
	}

	const sendText = async () => {
		const res = await axios.post("http://localhost:3000/automate/linkedin/posts", {
			"text": "Hello World"
		} );
		console.log(res);
	}

	const changeMode = () => {
		if (mode === "view") {
			setMode("edit");
		}
		else {
			setMode("view");
			form.submit();
		}
	};

	const onFinish = async (values) => {
		console.log('Success:', values);
		const res = await fetch("http://localhost:3000/brand/update-profile/"+user._id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const data = await res.json();
		
		if (data.status === "success") {
			// message.success("Campaign saved successfully");
			openNotificationWithIcon('success', 'Campaign saved successfully', 'Campaign saved successfully');
		} else {
			// message.error("Error saving campaign");
			openNotificationWithIcon('error', 'Error saving campaign', 'Error saving campaign');
		}
	};

	const props1 = {
		name: 'file',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				console.log("info file: ", info);
				return info.file.xhr;
			} else if (status === 'error') {
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
		async customRequest({ file, onSuccess }) {
			const storage = firebase.storage();
			const metadata = {
				contentType: 'image/jpeg'
			}
			const storageRef = await storage.ref();
			const imageName = generateHashName(); //a unique name for the image
			const imgFile = storageRef.child(`files/${imageName}`);
			try {
				const image = await imgFile.put(file, metadata);
				onSuccess(null, image);
			} catch (e) {
				onError(e);
			}
		}
	};

	const customRequest = async ({ file, onSuccess }) => {
		const storageRef = ref(storage, `files/${file.name + v4()}`)
		const snapshot = await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(snapshot.ref);
		console.log('File available at', downloadURL);
		onSuccess(null, downloadURL);
	};

	// const { id } = useParams();

	// const fetchProfile = async () => {
	// 	return await fetch("http://localhost:3000/influencer/influencer/" + id, {
	// 		method: "GET",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		}
	// 	})
	// 		.then((response) => {
	// 			if (!response.ok) throw new Error(response);
	// 			else return response.json();
	// 		})
	// };

	// const { data: influencer, isLoading, isError, isSuccess } = useQuery("influencer", fetchProfile);

	return (
		<>
			<div className="grid grid-cols-4">
			{contextHolder}
				{
					mode === "view" ? (
						<div className="col-span-1 h-full flex-col p-4">
							<button className="btn btn-sm btn-accent flex gap-1" onClick={() => changeMode()} >
								<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
									width="16" height="16"
									viewBox="0 0 48 48">
									<path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 30.175781 13.009766 C 28.937679 13.009766 27.699628 13.478108 26.763672 14.414062 L 15.546875 25.628906 C 15.219096 25.95444 14.979947 26.360451 14.853516 26.804688 L 14.853516 26.806641 C 14.853516 26.806641 14.851562 26.808594 14.851562 26.808594 L 13.058594 33.087891 A 1.50015 1.50015 0 0 0 14.912109 34.941406 L 21.195312 33.146484 A 1.50015 1.50015 0 0 0 21.197266 33.146484 C 21.638106 33.019576 22.041753 32.782465 22.367188 32.457031 L 33.587891 21.238281 C 35.459816 19.366356 35.459816 16.285988 33.587891 14.414062 C 32.651935 13.478108 31.413883 13.009766 30.175781 13.009766 z M 30.175781 15.992188 C 30.640179 15.992187 31.104753 16.173112 31.466797 16.535156 C 32.192872 17.261231 32.192872 18.391113 31.466797 19.117188 L 20.296875 30.285156 L 16.683594 31.316406 L 17.714844 27.703125 L 28.884766 16.535156 C 29.24681 16.173112 29.711383 15.992187 30.175781 15.992188 z"></path>
								</svg>
								<p>Edit</p>
							</button>
							<div className="flex flex-col items-center w-full">
								<div className="avatar">
									<div className="w-28 rounded-full">
										<img src={user.photo} />
									</div>
								</div>
								<p className="text-2xl font-bold">{user.name}</p>
								<p className="text-sm text-stone-500">{user.email}</p>
								<div className="divider" />
								<div className="flex-col items-start w-full min-h-[250px]">
									<h1 className="text-lg font-bold mb-1">About</h1>
									<p className="text-stone-500">{user?.description}</p>
								</div>
								<div className="divider" />
								<div className="flex-col items-start w-full">
									<h1 className="text-lg font-bold mb-1">Location</h1>
									{
										user?.country?.map((location, index) => {
											return (
												<p key={index} className="text-stone-500">{location}</p>
											)
										})
									}
								</div>
								<div className="divider" />
								<div className="flex-col items-start w-full min-h-[250px]">
									<h1 className="text-lg font-bold mb-1">Categories</h1>
									{
										user?.category?.map((category, index) => {
											return (
												<p key={index} className="text-stone-500">{category}</p>
											)
										})
									}
								</div>
							</div>
						</div>
					) : (
						<div className="col-span-1 h-full flex-col p-4">
							<button className="btn btn-sm btn-success flex gap-1" onClick={() => changeMode()} >
								<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
									width="16" height="16"
									viewBox="0 0 48 48">
									<path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 30.175781 13.009766 C 28.937679 13.009766 27.699628 13.478108 26.763672 14.414062 L 15.546875 25.628906 C 15.219096 25.95444 14.979947 26.360451 14.853516 26.804688 L 14.853516 26.806641 C 14.853516 26.806641 14.851562 26.808594 14.851562 26.808594 L 13.058594 33.087891 A 1.50015 1.50015 0 0 0 14.912109 34.941406 L 21.195312 33.146484 A 1.50015 1.50015 0 0 0 21.197266 33.146484 C 21.638106 33.019576 22.041753 32.782465 22.367188 32.457031 L 33.587891 21.238281 C 35.459816 19.366356 35.459816 16.285988 33.587891 14.414062 C 32.651935 13.478108 31.413883 13.009766 30.175781 13.009766 z M 30.175781 15.992188 C 30.640179 15.992187 31.104753 16.173112 31.466797 16.535156 C 32.192872 17.261231 32.192872 18.391113 31.466797 19.117188 L 20.296875 30.285156 L 16.683594 31.316406 L 17.714844 27.703125 L 28.884766 16.535156 C 29.24681 16.173112 29.711383 15.992187 30.175781 15.992188 z"></path>
								</svg>
								<p>Save</p>
							</button>
							<div className="flex flex-col items-center justify-center w-full">
								<Form
									name="basic"
									labelCol={{
										span: 8,
									}}
									style={{
										maxWidth: 800,
									}}
									onFinish={onFinish}
									form={form}
								>
									<p>Profile Photo</p>
									<Form.Item
										name="photo"
										getValueFromEvent={props1.onChange}
									>
										<Upload
											accept="image"
											customRequest={customRequest}
											listType="picture-circle"
											maxCount={1}
											onPreview={handlePreview}
											multiple={false}
										>
											{uploadButton}
										</Upload>
									</Form.Item>
									<p>Description</p>
									<Form.Item
										initialValue={user.description}
										name="description"
										rules={[
											{
												required: true,
												message: 'please enter Campaign description',
											},
										]}
									>
										<Input.TextArea rows={4} showCount minLength={500} maxLength={1000} placeholder="Campaign Description" />
									</Form.Item>

									<p>Categories</p>
									<Form.Item
										name="categories"
										initialValue={user?.category}
										rules={[
											{
												required: true,
												message: 'Please add categories',
											},
										]}
									>
										<Select mode="multiple" allowClear placeholder="Add Categories">
											<Option value="">Job Listing</Option>
											<Option value="influencer">Influencer marketing</Option>
											<Option value="work">Work for hire</Option>
										</Select>
									</Form.Item>
								</Form>
							</div>
							<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
								<img
									alt="example"
									style={{
										width: '100%',
									}}
									src={previewImage}
								/>
							</Modal>
						</div>
					)
				}


				<div className="col-span-3 shadow-xl p-4">


					<div className="divider" />
					<div className="flex mt-3 justify-between">
						<div className="flex-col">
							<div className="flex w-full justify-between pr-4 mb-3">
								<p className="text-lg text-[#212529] font-medium">View Connections</p>
							</div>
							<div className="border w-96 h-96">

							</div>
						</div>

						<div className="flex justify-evenly flex-wrap border w-96 h-96">
							{/* Linnkedin button */}
							<div className="flex flex-col items-center justify-center w-1/2 h-1/2">
								<div onClick={linkedInLogin} className="btn btn-outline btn-wide glass gap-1 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="16" height="16"
										viewBox="0 0 48 48">
										<path fill="#0288d1" d="M8.421 14h.052 0C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5 5.789 5 4 6.945 4 9.5 4 12 5.736 14 8.421 14zM4 17H13V43H4zM44 26.5c0-5.247-4.253-9.5-9.5-9.5-3.053 0-5.762 1.446-7.5 3.684V17h-9v26h9V28h0c0-2.209 1.791-4 4-4s4 1.791 4 4v15h9C44 43 44 27.955 44 26.5z"></path>
									</svg>
									<p className="text-lg text-[#212529] font-medium">LinkedIn</p>
								</div>
								<div onClick={sendText} className="btn btn-outline btn-wide glass gap-1 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="16" height="16"
										viewBox="0 0 48 48">
										<path fill="#0288d1" d="M8.421 14h.052 0C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5 5.789 5 4 6.945 4 9.5 4 12 5.736 14 8.421 14zM4 17H13V43H4zM44 26.5c0-5.247-4.253-9.5-9.5-9.5-3.053 0-5.762 1.446-7.5 3.684V17h-9v26h9V28h0c0-2.209 1.791-4 4-4s4 1.791 4 4v15h9C44 43 44 27.955 44 26.5z"></path>
									</svg>
									<p className="text-lg text-[#212529] font-medium">LinkedIn sendText</p>
								</div>
								<div onClick={redditLogin} className="btn btn-outline btn-wide glass gap-1 flex items-center justify-center">
									<p className="text-lg text-[#212529] font-medium">Reddit</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}