import * as yup from 'yup';

let SignupSchema = yup.object().shape({
    email: yup.string().email("please enter a valid email").required("Email address is required"),
    password : yup.string().required("Password is required"),
    // confirmPass: yup.string().required("Confirm pass is required")
  });

export default SignupSchema
