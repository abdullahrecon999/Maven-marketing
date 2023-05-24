import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import GoogleSignup from "../Components/GoogleSignup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import FormTextField2 from "../Components/FormTextFeild2";
import { Button } from "@mui/material";
import loginSchema from "../ValidationSchemas/loginSchema";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import { TailSpin } from "react-loader-spinner";
import { Input } from "antd";
import { motion } from "framer-motion";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Schema = Yup.object().shape({
  NewPassword: Yup.string()
    .min(6, ({ min }) => `password must be atleast ${min} characters`)
    .required("This field is required"),
  ConfirmNewPassword: Yup.string()
    .min(6, ({ min }) => `password must be atleast ${min} characters`)
    .when("NewPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("NewPassword")],
        "Both password need to be the same"
      ),
    }),
});

function ChildModal() {
  const [open, setOpen] = React.useState(false);

  const [passErr, setPassErr] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verifyPass = (values) => {
    console.log(values);
    var val = { password: values.NewPassword };
    axios
      .post("http://localhost:3000/admin/resetPassword/" + values.token, val, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("error: ", res.data);
        setPassErr(res.data);
      })
      .catch((err) => {
        setPassErr(err.response.data);
      });
  };

  return (
    <React.Fragment>
      <Button style={{ marginTop: 15 }} onClick={handleOpen}>
        Create New Password
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, top: "50%" }}>
          <Typography
            style={{ marginBottom: 15 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Get Token from Email
          </Typography>

          <Formik
            initialValues={{
              NewPassword: "",
              ConfirmNewPassword: "",
            }}
            validationSchema={Schema}
            onSubmit={(values) => verifyPass(values)}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
              return (
                <form>
                  <div className="flex flex-col space-y-5 ">
                    <div style={{ marginBottom: 15 }}>
                      <FormTextField2
                        name="NewPassword"
                        label="New Password"
                      ></FormTextField2>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                      <FormTextField2
                        name="ConfirmNewPassword"
                        label="Confirm Password"
                      ></FormTextField2>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                      <FormTextField2
                        name="token"
                        label="Token"
                      ></FormTextField2>
                    </div>
                    {/* add button to submit */}
                    <Button style={{ marginTop: 15 }} onClick={handleSubmit}>
                      Reset
                    </Button>
                  </div>
                  <p style={{ marginTop: 20 }}>{passErr}</p>
                </form>
              );
            }}
          </Formik>

          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const BusinessLogin = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [passResetErr, setPassResetErr] = useState(false);
  const [passResetErrMsg, setPassResetErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [restEmail, setRestEmail] = useState("");

  const googleAuth = () => {
    //window.open("http://localhost:3000/users/auth/google", "_self");

    var new_window = window.open(
      "http://localhost:3000/users/auth/google",
      "sharer",
      "toolbar=0,status=0,width=548,height=325"
    );
    // var timer = setInterval(function() {
    // 	if(new_window.closed) {
    // 			clearInterval(timer);
    // 			// window.open("http://localhost:5173/brandhome", "_self");
    // 			console.log("closed")
    // 	}
    // }, 1000);

    // axios.get("http://localhost:3000/users/auth/google", {
    // 	headers: {
    // 		'Content-Type': 'application/json',
    // 	},
    // 	withCredentials: true
    // })
    // 	.then(res => {
    // 		console.log(res.data.success)
    // 		if (res.data.success === true) {
    // 			localStorage.setItem('user', JSON.stringify(res.data.user))
    // 			navigate("/businesshome")
    // 		}
    // 		else {
    // 			setErr(true)
    // 		}

    // 	})
    // 	.catch(err => {
    // 		setErr(true)
    // 		//seterrMsg(err.response.data.message)
    // 		console.log(err)
    // 	})
  };

  const handleReset = () => {
    console.log(restEmail);
    var val = { email: restEmail };

    axios
      .post("http://localhost:3000/admin/password-reset", val, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("error: ", res.data);
        setPassResetErr(true);
        setPassResetErrMsg(res.data);
      })
      .catch((err) => {
        setPassResetErr(true);
        setPassResetErrMsg(err.response.data);
      });
  };

  const handleSubmit = (values) => {
    // call API for login for influencer
    console.log(values);
    var state = {};
    state = values;
    state.role = "brand";
    setLoading(true);
    axios
      .post("http://localhost:3000/brand/login", state, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success === true) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setLoading(false);
          navigate("/brandhome");
        } else {
          console.log("error: ", res.data);
          setLoading(false);
          setErr(true);
        }
      })
      .catch((err) => {
        setErr(true);
        setLoading(false);
        seterrMsg(err.response.data.message);
        console.log(err.response.data.message);
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
    duration: 1.5, // Adjust the duration here (in seconds)
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={loginSchema}
    >
      {(formik) => (
        <Form>
          <div>
            <Navbar></Navbar>
            <section className="container mx-auto h-[85vh]">
              <div className="px-4 pt-2  mb-6 space-x-8 flex justify-center flex-col-reverse md:flex-row md:pt-1">
                <div className="flex flex-col justify-center  px-10 space-y-6 md:w-[30%] ">
                  <div>
                    <h1 className="text-left sm:text-lg md:text-xl font-railway">
                      <span className="text-blue">Brand</span> Login
                    </h1>
                    <p className="text-sm text-grey">
                      Its good to see you back
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <div className="w-full ">
                      <h1 className="text-gray-800 text-base md:text-xl font-semibold mb-1">
                        Email
                      </h1>
                      <FormTextField2
                        name="email"
                        label="Email"
                      ></FormTextField2>
                    </div>
                    <div>
                      <h1 className="text-gray-800 text-base md:text-xl font-semibold mb-1">
                        Password
                      </h1>
                      <Field name="password">
                        {({ field }) => (
                          <Input.Password
                            {...field}
                            name="password"
                            label="Password"
                            type="password"
                            size="medium"
                            onChange={(e) => {
                              formik.setFieldValue("password", e.target.value);
                            }}
                            placeholder="Password"
                          ></Input.Password>
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-xs text-red-500"
                        component="div"
                        name="password"
                      ></ErrorMessage>
                    </div>
                    <p
                      onClick={handleOpen}
                      className="text-sm text-blue font-railway"
                    >
                      Forgot Password?
                    </p>

                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="flex justify-center pt-1 pr-3">
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
                          <Button
                            type="submit"
                            loading
                            disabled={!formik.isValid}
                            className={
                              formik.isValid ? "bg-blue" : "bg-grey text-white"
                            }
                            variant="contained"
                          >
                            Login
                          </Button>
                        )}
                      </div>
                      <p className="font-railway text-sm text-grey">or</p>
                      <Button
                        variant="outlined"
                        onClick={() => googleAuth()}
                        startIcon={<GoogleIcon />}
                      >
                        Login With Google
                      </Button>
                    </div>
                  </div>
                  {err && (
                    <Alert
                      severity="error"
                      onClose={() => {
                        setErr(false);
                      }}
                    >
                      {errMsg}
                    </Alert>
                  )}
                </div>
                <motion.div
                  className="flex flex-col my-5 items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14 md:items-start"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.h1
                    className="text-3xl text-blue font-semibold font-railway md:text-4xl"
                    variants={textVariants}
                    transition={transition}
                  >
                    Maven <span className="text-gray-600">Marketing</span>
                  </motion.h1>
                  <motion.p
                    className="font-semibold sm:text-base text-gray-600 md:text-xl"
                    variants={textVariants}
                    transition={transition}
                  >
                    Login as a Brand and start your Business.
                  </motion.p>
                </motion.div>
                {/* <div className="flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start ">
                  <h1 className="text-3xl text-blue font-semibold font-railway md:text-4xl">
                    Maven Marketing
                  </h1>
                  <p className="font-semibold sm: text-base md:text-xl">
                    Login as a Brand and start your Business.
                  </p>
                </div> */}
              </div>
            </section>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <Typography
                  style={{ marginBottom: 8 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Reset Password
                </Typography>
                <p style={{ marginBottom: 5 }}>Enter Your Email</p>
                <TextField
                  onChange={(e) => setRestEmail(e.target.value)}
                  name="resetemail"
                  label="Email"
                ></TextField>
                <Button
                  onClick={() => handleReset()}
                  style={{ marginTop: 15, marginBottom: 20 }}
                >
                  Send Reset Password Token
                </Button>
                {passResetErr && (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setPassResetErr(false);
                    }}
                  >
                    {passResetErrMsg}
                  </Alert>
                )}

                <ChildModal />
              </Box>
            </Modal>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BusinessLogin;
