import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Formik, Form } from 'formik';
import {Button} from '@mui/material';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    changepassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  });

const PasswordReset = () => {
 
    return (
        <Formik
      initialValues={{
        password: "",
        changepassword: ""
      }}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div style={{}}>
                <label for="passowrd">Password</label>
                <input
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                />
                <span class="error" style={{ color: "red" }}>
                {errors.password}
                </span>

                <label for="passowrd">Confirm Password</label>
                <input
                type="password"
                name="changepassword"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.changepassword}
                />
                <span class="error" style={{ color: "red" }}>
                {errors.changepassword}
                </span>
            </div>
          </form>
        );
      }}
    </Formik>
    )
}

export default PasswordReset;