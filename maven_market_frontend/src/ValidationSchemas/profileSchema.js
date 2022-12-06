import { YouTube } from '@mui/icons-material';
import * as yup from 'yup';
const re = "/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm"
let profileSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    url: yup.string().url("profile url is not valid").required("Profile link is required"),
    discription: yup.string().required("Discription is required"),
    platform: yup.string().required("please select a platform"),
    language: yup.string().required("please select a language"),
    country: yup.string().required("please select a country"),
    email: yup.string().email("please enter a valid email").required("Email address is required"),
    password : yup.string().min(8, ({min})=> `password must be atleast ${min} characters`).required("Password is required"),
    category: yup.string().required("please select a category"),
    contact : yup.string().required("please enter a contact number"),
  });

export default profileSchema
