import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormTextField from "../Components/FormTextField";
import profileSchema from "../ValidationSchemas/profileSchema";
import Textarea from "../Components/Textarea";
import FormSelect from "../Components/FormSelect";
import ProfileImage from "../Components/ProfileImage";
import axios from "axios";
import { AuthContext } from "../utils/authProvider";
import image from "../images/profile.jpg";
import { useMutation } from "react-query";
import { TailSpin } from "react-loader-spinner";
import { Input, Select, Alert } from "antd";
// need to add multiple array in coutries language and categories
const style = {
  width: { md: 600 },
  "& .MuiInputBase-root": {
    height: { sm: 35, md: 40 },
  },
};
const countries = [
  { label: "Pakistan", value: "Pakistan" },
  { label: "China", value: "China" },
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "England", value: "England" },
  { label: "Russia", value: "Russia" },
];

const languages = [
  { label: "Urdu", value: "Urdu" },
  { label: "English", value: "English" },
  { label: "Chinese", value: "Chinese" },
  { label: "Russian", value: "Russian" },
  { label: "Hindi", value: "Hindi" },
  { label: "Japanese", value: "Japanese" },
];
const platforms = [
  { label: "Instagram", value: "Instagram" },
  { label: "Youtube", value: "Youtube" },
  { label: "Tiktok", value: "Tiktok" },
  { label: "Facebook", value: "Facebook" },
  { label: "Twitter", value: "Twitter" },
  { label: "Linkedin", value: "Linkedin" },
  { label: "Pinterest", value: "Pinterest" },
  { label: "Reddit", values: "Reddit" },
];

const categories = [
  { label: "Influencer Marketing", value: "Influencer Marketing" },
  { label: "Email Marketing", value: "Email Marketing" },
  { label: "Blog Writing", value: "Blog Writing" },
  { label: "Photography", value: "Photography" },
  { label: "Design", value: "Design" },
  { label: "Food", value: "Food" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Technology", value: "Technology" },
  { label: "Fitness", value: "Fitness" },
  { label: "Travel", value: "Travel" },
];
const options = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const Profilecompletion = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const { user, setUser } = React.useContext(AuthContext);

  const verifyProfile = () => {
    // verify profile by post call on server
    console.log("verify profile");
    console.log(url);
    setLoading(true);
    axios
      .post("http://localhost:3000/users/verify", {
        url: url,
      })
      .then((res) => {
        if (res.data === "Real") {
          console.log(res);
          setLoading(false);
          setDone(true);
          setMsg("Profile Verified");
        } else {
          console.log(res);
          setLoading(false);
          setDone(true);
          setMsg("Profile is not Verified");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setDone(true);
        setMsg("Error Occured");
      });
  };

  const logout = async () => {
    // do axios get to backend for logout
    // then redirect to home page
    await axios
      .get("http://localhost:3000/admin/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const addData = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(values.language);
    const val = {
      country: values.country,
      language: values.language,
      description: values.discription,
      platforms: values.platform,
      url: values.url,
      photo: values.uImage,
      profileComplete: 1,
      category: values.category,
    };

    return await axios.post(
      `http://localhost:3000/influencer/completeProfile/${user["_id"]}`,
      val,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };
  const { mutate, isLoading, isSuccess, isError } = useMutation(addData);

  // const handleSubmit= async(values)=>{
  //    const user = JSON.parse(localStorage.getItem("user"))
  //     const val = {

  //         country: values.country,
  //         language: values.language,
  //         description: values.discription,
  //         platform: values.platform,
  //         url: values.url,
  //         photo: values.uImage,
  //         profileComplete: 1
  //     }

  //     const id = user["_id"]
  //     console.log(id);
  //     await axios.post(`http://localhost:3000/influencer/completeProfile/${user["_id"]}`, val, {headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       withCredentials: true,
  //     })

  // }

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-[100%] h-[100%] flex-col">
        <h1 className="font-railway text-3xl text-blue">Please wait</h1>
        <p className="fonet-railway text-base text-grey">
          We are we submitting your profile for verification this may take a
          while
        </p>
      </div>
    );
  // add the error handling here
  if (isError) {
  }

  return (
    <div className="container mx-auto px-12 md:px-28">
      <nav className="container relative px-2 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => {
              navigate(-1);
            }}
            className="text-black font-railway"
          >
            Maven Marketing
          </h1>

          <h1
            onClick={() => {
              logout();
            }}
            className="text-blue font-railway  hover:text-grey hover:-translate-y-0.5"
          >
            Logout
          </h1>
        </div>
      </nav>
      <Formik
        initialValues={{
          name: "",
          country: "",
          language: "",
          discription: "",
          platform: "",
          url: "",
          uImage: "",
          category: "",
        }}
        onSubmit={(values) => mutate(values)}
        validationSchema={profileSchema}
      >
        {(formik) => (
          <Form>
            <section id="profileCompletion" className="container mx-auto">
              <div className="">
                <div className="flex flex-col px-6 py-8 border rounded-xl bg-white  space-y-5">
                  <div className="space-y-3">
                    <div>
                      <h1 className=" text-xl text-gray-800 font-semibold md:text-2xl">
                        Profile Completion
                      </h1>
                      <p className="text-xs md:text-sm text-grey">
                        Complete your profile, to start your journey as a
                        content creator and start earning
                      </p>
                    </div>
                    <div
                      className={
                        isSuccess && !isError ? "flex flex-col mt-2" : "hidden"
                      }
                    >
                      <Alert
                        message="Profile Completed"
                        description="Please wait our system will verfy your profile. Please login later to check if the profile is verified or not"
                        type="success"
                        showIcon
                      />
                    </div>
                    <div className={isError ? "flex flex-col mt-2" : "hidden"}>
                      <Alert
                        message="Something went wrong"
                        description="Check your internet connect or try again later"
                        type="success"
                        showIcon
                      />
                    </div>
                    <div className="border"></div>
                  </div>
                  <div
                    id="personal Information"
                    className="flex flex-col space-y-3 pt-1 "
                  >
                    <h1 className="text-base text-gray-500  md:text-xl">
                      Personal Information
                    </h1>

                    <div className="flex flex-col space-y-3">
                      <h1 className=" text-sm font-medium md:text-base ">
                        Upload your Profile Pic{" "}
                        <span className="text-xl text-red-500">*</span>
                      </h1>
                      <ProfileImage
                        name="uImage"
                        setvalue={formik.setFieldValue}
                      ></ProfileImage>
                      <div className="space-y-3"></div>
                    </div>
                    {/* <div className="flex flex-col space-y-2">
                      <h2 className=" text-sm md:text-base text-gray-800 font-medium ">
                        Full name{" "}
                        <span className="text-xl text-red-500">*</span>
                      </h2>

                      <FormTextField
                        required
                        name="name"
                        label="Enter your full name"
                        placeholder="Enter your full name"
                      ></FormTextField>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                      <div>
                        <h1 className=" text-sm md:text-base text-gray-800 font-medium ">
                          Select Country
                          <span className="text-xl text-red-500">*</span>
                        </h1>
                        <Field name="country">
                          {({ field }) => (
                            <Select
                              {...field}
                              allowClear
                              style={{ width: "100%" }}
                              options={countries}
                              defaultValue=""
                              placeholder="Please select country"
                              onChange={(val) => {
                                const temp = [val];
                                formik.setFieldValue("country", temp);
                                console.log(formik.values);
                              }}
                            ></Select>
                          )}
                        </Field>
                      </div>
                      <div>
                        <h1 className=" text-sm md:text-base text-gray-800 font-medium ">
                          Select Language
                          <span className="text-xl text-red-500">*</span>
                        </h1>
                        <Field name="language">
                          {({ field }) => (
                            <Select
                              options={languages}
                              {...field}
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select language"
                              mode="multiple"
                              defaultValue={[]}
                              onChange={(val) => {
                                formik.setFieldValue("language", val);
                              }}
                            ></Select>
                          )}
                        </Field>
                      </div>

                      {/* <FormSelect
                        data={countries}
                        setvalue={formik.setFieldValue}
                        name="country"
                        label="Country"
                        placeholder="Country"
                      ></FormSelect>
                      <FormSelect
                        data={languages}
                        setvalue={formik.setFieldValue}
                        name="language"
                        label="Language"
                      ></FormSelect> */}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <h1 className=" text-sm md:text-base text-gray-800 font-medium ">
                        Description{" "}
                        <span className="text-xl text-red-500">*</span>
                      </h1>
                      {/* <textarea name='discription' id="message" rows="5" class=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter discription about your self......"></textarea> */}
                      <Field name="discription">
                        {({ field }) => (
                          <Input.TextArea
                            {...field}
                            name="discription"
                          ></Input.TextArea>
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-xs text-red-500"
                        name="discription"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div className="border"></div>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h1 className="text-base   md:text-xl font-bold text-gray-800">
                        Platform Information{" "}
                        <span className="text-xl text-red-500">*</span>
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                      <div>
                        <h1 className=" text-sm md:text-base text-gray-800 font-medium ">
                          Select Platfroms
                          <span className="text-xl text-red-500">*</span>
                        </h1>
                        <Field name="platform">
                          {({ field }) => (
                            <Select
                              {...field}
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select platform"
                              options={platforms}
                              onChange={(val) => {
                                console.log(val);
                                const temp = [val];
                                formik.setFieldValue("platform", temp);
                                console.log(formik.values);
                              }}
                            ></Select>
                          )}
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-xs text-red-500"
                          name="platform"
                        ></ErrorMessage>
                      </div>
                      <div>
                        <h1 className=" text-sm md:text-base text-gray-800 font-medium ">
                          Select categories
                          <span className="text-xl text-red-500">*</span>
                        </h1>
                        <Field name="category">
                          {({ field }) => (
                            <Select
                              {...field}
                              allowClear
                              options={categories}
                              style={{ width: "100%" }}
                              placeholder="Please select category"
                              defaultValue={[]}
                              onChange={(value) => {
                                formik.setFieldValue("category", value);
                              }}
                              mode="multiple"
                            ></Select>
                          )}
                        </Field>
                        <ErrorMessage name="category"></ErrorMessage>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <h2 className=" text-sm md:text-base text-gray-800 font-medium ">
                        Social Media Url{" "}
                        <span className="text-xl text-red-500">*</span>
                      </h2>
                      <FormTextField
                        name="url"
                        label="Enter your social media profile link"
                      ></FormTextField>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={!formik.isValid}
                      className={
                        formik.isValid ? "bg-blue" : "bg-grey text-white"
                      }
                      variant="contained"
                    >
                      Submit
                    </Button>
                    {/* {console.log(formik)} */}
                    {/* needs to be fixed */}
                    {/* <div
                      className={
                        isSuccess && !isError ? "flex flex-col mt-2" : "hidden"
                      }
                    >
                      <Alert
                        message="Profile Completed"
                        description="Please wait our system will verfy your profile. Please login later to check if the profile is verified or not"
                        type="success"
                        showIcon
                      />
                    </div>
                    <div className={isError ? "flex flex-col mt-2" : "hidden"}>
                      <Alert
                        message="Something went wrong"
                        description="Check your internet connect or try again later"
                        type="success"
                        showIcon
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profilecompletion;
