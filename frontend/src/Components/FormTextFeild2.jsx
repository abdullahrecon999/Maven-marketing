import React from "react";

import { TextField } from "@mui/material";
import { Input } from "antd";
import { useField, ErrorMessage } from "formik";
const FormTextFeild2 = ({ size = "medium", ...props }) => {
  const [feild, meta] = useField(props);

  return (
    <>
      <Input
        required
        {...props}
        {...feild}
        size={size}
        placeholder={props.name}
      ></Input>
      <ErrorMessage
        component="div"
        className="text-sm text-red-600"
        name={feild.name}
      ></ErrorMessage>
    </>
  );
};

export default FormTextFeild2;
