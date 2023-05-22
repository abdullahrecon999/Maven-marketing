import React from "react";
import { TextField } from "@mui/material";
import { useField, ErrorMessage } from "formik";
import { Input } from "antd";
const style = {
  width: { md: 600 },
  "& .MuiInputBase-root": {
    height: { sm: 35, md: 40 },
  },
};

const FormTextField = ({ ...props }) => {
  const [feild, meta] = useField(props);

  return (
    <>
      <Input required {...props} {...feild} size="large"></Input>
      <ErrorMessage
        component="div"
        className="text-sm text-red-600"
        name={feild.name}
      ></ErrorMessage>
    </>
  );
};

export default FormTextField;
