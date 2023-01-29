import * as yup from 'yup';

let loginSchema = yup.object().shape({
    email: yup.string().email("please enter a valid email").required("Email address is required"),
    password : yup.string().min(6, ({min})=> `password must be atleast ${min} characters`).required("Password is required"),
    
  });

export default loginSchema