import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import image from "../../images/profile.jpg";
import axios from "axios";
import UpdateIcon from "@mui/icons-material/Update";
import MultipleSelect from "./MultipleSelect";
import jobSearch from "../../images/jobSearch.png";
import AddConnection from "./AddConnection";
import ProfileImage from "./ProfilePic";
import { Formik, Form } from "formik";
import TextField from "./TextFeild";
import { useLocation } from "react-router-dom";
import { Button, Input, Modal, Select, Space, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import isEqual from "lodash/isEqual";
const languages = ["Urdu", "English", "Hindi", "Chinese"];

const countries = ["pakistan", "China", "India"];
const platforms = ["twitter", "instagram"];

const categories = ["Food", "Techs and gadgets", "Travel"];
const CountryOptions = [
	{ label: "United States", value: "United States" },
	{ label: "China", value: "China" },
	{ label: "Japan", value: "Japan" },
	{ label: "Germany", value: "Germany" },
	{ label: "India", value: "India" },
	{ label: "United Kingdom", value: "United Kingdom" },
	{ label: "France", value: "France" },
	{ label: "Italy", value: "Italy" },
	{ label: "Brazil", value: "Brazil" },
	{ label: "Canada", value: "Canada" },
	{ label: "Russia", value: "Russia" },
	{ label: "South Korea", value: "South Korea" },
	{ label: "Australia", value: "Australia" },
	{ label: "Spain", value: "Spain" },
	{ label: "Mexico", value: "Mexico" },
	{ label: "Indonesia", value: "Indonesia" },
	{ label: "Netherlands", value: "Netherlands" },
	{ label: "Saudi Arabia", value: "Saudi Arabia" },
	{ label: "Switzerland", value: "Switzerland" },
	{ label: "Turkey", value: "Turkey" },
	{ label: "Poland", value: "Poland" },
	{ label: "Sweden", value: "Sweden" },
	{ label: "Belgium", value: "Belgium" },
	{ label: "Norway", value: "Norway" },
	{ label: "Austria", value: "Austria" },
	{ label: "United Arab Emirates", value: "United Arab Emirates" },
	{ label: "Iran", value: "Iran" },
	{ label: "Palestine", value: "Palestine" },
	{ label: "Portugal", value: "Portugal" },
	{ label: "South Africa", value: "South Africa" },
	{ label: "Egypt", value: "Egypt" },
	{ label: "Thailand", value: "Thailand" },
	{ label: "Colombia", value: "Colombia" },
	{ label: "Malaysia", value: "Malaysia" },
	{ label: "Singapore", value: "Singapore" },
	{ label: "Bangladesh", value: "Bangladesh" },
	{ label: "Pakistan", value: "Pakistan" },
	{ label: "Iraq", value: "Iraq" },
	{ label: "Philippines", value: "Philippines" },
	{ label: "Nigeria", value: "Nigeria" },
	{ label: "Chile", value: "Chile" },
	{ label: "Romania", value: "Romania" },
	{ label: "Nepal", value: "Nepal" },
	{ label: "Ukraine", value: "Ukraine" },
	{ label: "Greece", value: "Greece" },
	{ label: "Czech Republic", value: "Czech Republic" },
	{ label: "Belarus", value: "Belarus" },
	{ label: "Dominican Republic", value: "Dominican Republic" },
];

const platformOptions = [
	{ label: "instagram", value: "instagram" },
	{ label: "facebook", value: "facebook" },
	{ label: "twitter", value: "twitter" },
	{ label: "Reddit", value: "Reddit" },
];

const Profile = ({ onEdit }) => {
	const [user, setUser] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// const { data, isLoading } = useQuery(["getProfile"], () => {
	// 	console.log("USER: ", user);
	// 	return axios.get(`http://localhost:3000/influencer/profile/${user["_id"]}`);
	// });

	const handleSubmit = async (values) => {
		console.log(values, values);
		onSave();
		return await axios.put(
			`http://localhost:3000/influencer/updateProfile/${user["_id"]}`,
			values,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
	};
	const { mutate, isSuccess, isError } = useMutation(handleSubmit);
	return (
		<>
			<Modal
				title="Edit Profile?"
				open={isModalOpen}
				onOk={handleOk}
				footer={[]}
				onCancel={handleCancel}
			>
				<Formik
					initialValues={{
						country: user?.country,
						language: user?.language,
						description: user?.description,
						photo: user?.photo,
						category: user?.category,
					}}
				>
					{(formik) => (
						<Form>
							<div className=" p-4 h-[60vh] overflow-y-auto ">
								<div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
									<div className="flex flex-col items-center gap-1 border-2justify-center col-span-2">
										<ProfileImage
											height="100px"
											width="100px"
											image={user?.photo}
											name="photo"
											setvalue={formik.setFieldValue}
										></ProfileImage>

										<p className="text-xs text-gray-800 font-semibold">
											{user?.name}
										</p>
									</div>

									<div className=" col-span-2 px-2 gap-2">
										<h1 className="text-gray-800 font-semibold ">
											Profile Description
										</h1>
										<Input.TextArea
											maxLength={800}
											value={user?.description}
											showCount
											onChange={(e) => {
												console.log(e.target.value);

												return formik.setFieldValue(
													"description",
													e.target.value
												);
											}}
										></Input.TextArea>
									</div>

									<div className="px-2 gap-2 col-span-1">
										<h1 className="text-gray-800 font-semibold "> Languages</h1>
										<Space
											style={{
												width: "100%",
											}}
											direction="vertical"
										>
											<Select
												mode="multiple"
												style={{
													width: "100%",
												}}
												placeholder="Please select"
												defaultValue={user?.platforms}
												onChange={(value) => {
													formik.setFieldValue("language", value);
													console.log(formik.values);
												}}
												options={platformOptions}
											/>
										</Space>
									</div>
									<div className="px-2 gap-2 col-span-1">
										<h1 className="text-gray-800 font-semibold "> Country</h1>
										<Space
											style={{
												width: "100%",
											}}
											direction="vertical"
										>
											<Select
												mode="multiple"
												style={{
													width: "100%",
												}}
												placeholder="Please select country"
												defaultValue={user?.platforms}
												onChange={(value) => {
													formik.setFieldValue("country", value);
													console.log(formik.values);
												}}
												options={CountryOptions}
											/>
										</Space>
									</div>
									<div className="px-2 gap-2 col-span-2">
										<h1 className="text-gray-800 font-semibold ">Categories</h1>
										<Space
											style={{
												width: "100%",
											}}
											direction="vertical"
										>
											<Select
												mode="multiple"
												style={{
													width: "100%",
												}}
												placeholder="Please select"
												defaultValue={user?.platforms}
												onChange={(value) => {
													formik.setFieldValue("category", value);
													console.log(formik);
												}}
												options={platformOptions}
											/>
										</Space>
									</div>

									<div className="px-2">
										<Button
											onClick={() => {
												const flag = isEqual(
													formik.initialValues,
													formik.values
												);
												console.log(flag);
											}}
											className="bg-blue text-white"
										>
											{" "}
											save
										</Button>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
			<div className="flex-[0.6] bg-white border justify-center px-4 py-9">
				<Button
					onClick={() => {
						// console.log("abcjhfjdhsdjfhjshfjdseh")
						// onEdit()
						showModal();
					}}
					icon={<EditOutlined />}
				></Button>
				<div className=" flex flex-col items-center justify-center space-y-2">
					<div>
						<img
							src={user?.photo}
							alt={image}
							className="w-[150px] h-[150px] rounded-full border-2 border-green shadow-md"
						/>
						<div className="flex flex-col space-y-0 items-center">
							<h1 className="text-black  text-xl">{user?.name}</h1>
							<p className="text-gray-700  text-xs">
								{user?.description?.slice(0, 4) + "......."}
							</p>
						</div>
					</div>
					<div className="flex flex-col space-y-5 w-[100%]">
						<hr></hr>

						<div className="flex flex-col w-[100%] px-2">
							<h1 className="text-gray-800 font-semibold  text-base">About </h1>
							<p className="text-gray-700  text-xs"> {user?.description}</p>
						</div>

						<hr></hr>

            <div className="grid grid-cols-2">
              <div className="px-2 flex flex-col flex-1 space-y-1 ">
                <h1 className="text-gray-800 font-semibold  text-base">
                  Country
                </h1>
                <div>
                  <Tag>{user?.country[0]}</Tag>
                </div>
              </div>
              <div className="px-2 flex flex-col space-y-1">
                <h1 className="text-gray-800 font-semibold  text-base">
                  languages{" "}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {user?.language?.map((item) => {
                    return <Tag>{item}</Tag>;
                  })}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="px-2 flex flex-col space-y-1">
              <h1 className="text-gray-800 font-semibold  text-base">
                Categories{" "}
              </h1>
              <div className="flex flex-wrap">
                {user?.category?.map((item) => {
                  return <Tag>{item}</Tag>;
                })}
              </div>
            </div>
            {/* <div className="px-2 flex flex-col space-y-1">
              <h1 className="text-gray-800 font-semibold  text-base">
                Social Media Accounts{" "}
              </h1>
              <div>
                {user?.socialMediaHandles.map(item => {
					return (
						<div className="badge badge-lg badge-outline">
							{item.platform} @ <div className="font-bold"> {item.handle} </div>
						</div>
					)
				})}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const EditProfile = ({ onSave }) => {
	const { state } = useLocation();
	const { user } = state;

	const handleSubmit = async (values) => {
		console.log(values, values);
		onSave();
		return await axios.put(
			`http://localhost:3000/influencer/updateProfile/${user["_id"]}`,
			values,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
	};
	const { mutate, isLoading, isSuccess, isError, data } =
		useMutation(handleSubmit);

	return (
		<Formik
			initialValues={{
				country: user?.country,
				language: user?.language,
				description: user?.description,
				photo: user?.photo,
				category: user?.category,
			}}
			onSubmit={(values) => mutate(values)}
		>
			{(formik) => (
				<Form>
					<div className="flex-[0.6] bg-gray-50 justify-center px-4 py-9">
						<button type="submit" className="flex space-x-2">
							<h1 className="text-green font-railway text-sm px-2 py-1 border rounded-full hover:bg-gray-200 hover:shadow-md">
								Save <UpdateIcon className="text-xs text-grey"></UpdateIcon>
							</h1>
						</button>

						<div className=" flex flex-col items-center justify-center space-y-2 relative">
							{/* <label className='absolute top-0 right-20 p-1 text-xs text-grey border rounded-full hover:shadow-md' for="image"> <EditIcon></EditIcon></label>
                <input className='hidden' type="file" id="image"></input>
                <img src={image} alt={image} className="w-[150px] h-[150px] rounded-full"/> */}

							<div>
								<ProfileImage
									image={user?.photo}
									name="photo"
									setvalue={formik.setFieldValue}
								></ProfileImage>
							</div>

							<div className="flex flex-col flex-1 space-y-0 items-center">
								<h1 className="text-black font-railway text-xl">
									{user?.name}
								</h1>
								<p className="text-gray-700 font-railway text-xs">
									{user?.description.slice(0, 4) + "......."}
								</p>
							</div>
							<div className="flex flex-col space-y-5 w-[100%]">
								<hr></hr>

								<div className="flex flex-col w-[100%] px-2 ">
									<h1 className="text-blue font-railway text-base">About </h1>

									<div>
										<TextField
											rows={9}
											className="w-full resize-none"
											defaultValue={user?.description}
											name="description"
										></TextField>
									</div>
								</div>

								<div className="flex flex-col space-y-1">
									<div className="px-2 flex flex-col flex-1 space-y-1">
										<h1 className="text-blue font-railway text-base">
											Country
										</h1>
										<MultipleSelect
											label={user?.country[0]}
											name="country"
											names={countries}
											defaultValue={user?.country[0]}
											setvalue={formik.setFieldValue}
										></MultipleSelect>
									</div>
									<div className="px-2 flex flex-col space-y-1">
										<h1 className="text-blue font-railway text-base">
											languages{" "}
										</h1>
										<MultipleSelect
											defaultValue={user?.language[0]}
											name="language"
											names={languages}
											setvalue={formik.setFieldValue}
										></MultipleSelect>
									</div>
								</div>
								<hr></hr>

								<div className="px-2 flex flex-col space-y-1">
									<h1 className="text-blue font-railway text-base">
										Categories{" "}
									</h1>
									<MultipleSelect
										name="category"
										defaultValue={user?.category[0]}
										names={categories}
										setvalue={formik.setFieldValue}
									></MultipleSelect>
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const InitialOtherDetails = () => {
	return (
		<div className="flex-1 bg-white">
			<div className="flex flex-col items-center justify-center border m-9 py-10 px-8 rounded-3xl">
				<img className="w-[50%] h-[50%]" src={jobSearch} alt="asjh"></img>
				<h1 className="text-black text-xl font-railway text-center">
					{" "}
					Oops! Looks like you have no ongoing campaign
				</h1>
				<h2 className="text-grey text-sm font-railway text-center">
					Lets find some work for you. The campaigns that you are currently
					working are displayed here
				</h2>
				<button className="text-center text-blue text-base py-1 border border-blue px-2 mt-2">
					Find Work
				</button>
			</div>
		</div>
	);
};

const EditProfileModal = () => {
	return <></>;
};

const SocialProfile = () => {
	// const { state } = useLocation();
	// const { user } = state;

	const { data: user, isLoading } = useQuery("user", () =>
		(localStorage.getItem("userId"))
	);

	const [open, setOpen] = useState(false);
	const handleEdit = () => {
		setOpen(true);
	};
	const handleSave = () => {
		setOpen(false);
	};
	return (
		<div className="flex mx-auto container my-3 shadow-md">
			{/* {open ? <EditProfile onSave={setOpen} /> :  */}
			<Profile onEdit={handleEdit} />
			<InitialOtherDetails></InitialOtherDetails>

			<div className="flex-[0.75] bg-slate-50 border-l-2 shadow ">
				<AddConnection id={user}></AddConnection>
			</div>
		</div>
	);
};

export default SocialProfile;
