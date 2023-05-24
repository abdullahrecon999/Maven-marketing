import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import FormSelect from "../Components/FormSelect";
import { styled } from "@mui/system";
import GoogleSignup from "../Components/GoogleSignup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormTextField2 from "../Components/FormTextFeild2";
import FormSelect2 from "../Components/FormSelect2";
import SignupSchema from "../ValidationSchemas/Signupschema";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Input } from "antd";
import { motion } from "framer-motion";

const SignUpPageInfluencer = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    var val = {
      name: values.username,
      email: values.email,
      password: values.password,
      role: "influencer",
    };
    axios
      .post("http://localhost:3000/influencer/register", val, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          //setUser(res.data.user)

          localStorage.setItem("user", JSON.stringify(res.data.user));
          setErr(true);
          setErrMsg(res.data.message);
          setLoading(false);
        } else {
          setErr(true);
          setErrMsg(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.8, // Adjust the duration here (in seconds)
  };
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPass: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={SignupSchema}
    >
      {(formik) => (
        <Form>
          <div>
            <Navbar></Navbar>
            <section className="container mx-auto h-[85vh]">
              <div className="px-4 pt-8 mb-6 space-x-8 flex justify-center flex-col-reverse md:flex-row ">
                <div className="flex flex-col justify-center  px-10 space-y-6 md:w-[30%] ">
                  <div>
                    <h1 className="text-left sm:text-lg md:text-xl font-railway">
                      Sign Up
                    </h1>
                    <p className="text-sm text-grey">Its quick and easy</p>
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <div>
                      <h1 className="text-gray-800 text-base md:text-base font-semibold mb-1">
                        User Name <span className="text-red-500">*</span>
                      </h1>
                      <FormTextField2
                        name="username"
                        label="Username"
                        size="medium"
                      ></FormTextField2>
                    </div>
                    <div>
                      <h1 className="text-gray-800 text-base md:text-base font-semibold mb-1">
                        Email <span className="text-red-500">*</span>
                      </h1>
                      <FormTextField2
                        name="email"
                        label="Email"
                        size="medium"
                      ></FormTextField2>
                    </div>
                    <div>
                      <h1 className="text-gray-800 text-base md:text-base font-semibold mb-1">
                        Password <span className="text-red-500">*</span>
                      </h1>
                      <Field name="password">
                        {({ field, meta }) => (
                          <>
                            <Input.Password
                              type="password"
                              placeholder="Password"
                              {...field}
                              onChange={(e) =>
                                formik.setFieldValue("password", e.target.value)
                              }
                            ></Input.Password>
                            <ErrorMessage
                              className="text-xs text-red-500"
                              name="password"
                              component="div"
                            ></ErrorMessage>
                          </>
                        )}
                      </Field>
                    </div>
                    <div>
                      <h1 className="text-gray-800 text-base md:text-base font-semibold mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </h1>
                      <Field name="confirmPass">
                        {({ field, meta }) => (
                          <>
                            <Input.Password
                              type="password"
                              placeholder="Confirm Password"
                              {...field}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "confirmPass",
                                  e.target.value
                                )
                              }
                            ></Input.Password>
                            <ErrorMessage
                              className="text-xs text-red-500"
                              name="confirmPass"
                              component="div"
                            ></ErrorMessage>
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="flex justify-center pt-1 pr-3">
                        <Button
                          type="submit"
                          disabled={!formik.isValid}
                          className={
                            formik.isValid ? "bg-blue" : "bg-grey text-white"
                          }
                          variant="contained"
                        >
                          {loading ? (
                            <TailSpin
                              height="20"
                              width="20"
                              color="white"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ) : (
                            "Sign Up"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex flex-col my-5 items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14 md:items-start"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  transition={transition}
                >
                  <motion.h1
                    className="text-3xl text-blue font-semibold font-railway md:text-4xl"
                    variants={textVariants}
                    transition={transition}
                  >
                    Maven <span className="text-gray-600">Marketing</span>
                  </motion.h1>
                  <motion.p
                    className="font-semibold text-gray-600 text-xl"
                    variants={textVariants}
                    transition={transition}
                  >
                    A Platform To Earn Money By Collaborating With Brands And
                    Businesses
                  </motion.p>
                </motion.div>
                {/* <div className="flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start ">
                  <h1 className="text-3xl text-blue font-semibold font-railway md:text-4xl">
                    Maven Marketing
                  </h1>
                  <p className="font-semibold text-xl">
                    A Platform To Earn Money By Collaborating With Brands And
                    Businesses
                  </p>
                </div> */}
              </div>
            </section>
            {err && (
              <Alert
                severity="error"
                onClose={() => {
                  setErr(false);
                }}
              >
                {errMsg}
                {errMsg.includes("verification") && (
                  <Button
                    onClick={() => {
                      navigate("/influencerlogin");
                    }}
                    style={{ marginLeft: 30 }}
                    color="inherit"
                    variant="contained"
                    size="small"
                  >
                    Login Page
                  </Button>
                )}
              </Alert>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpPageInfluencer;
