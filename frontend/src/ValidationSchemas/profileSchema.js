import { YouTube } from '@mui/icons-material';
import * as yup from 'yup';
const re = "/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm"
let profileSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    url: yup.string().required("Profile link is required"),
    discription: yup.string().required("Discription is required"),
    platform: yup.array().required("please select a platform"),
    language: yup.array().required("please select a language"),
    country: yup.array().required("please select a country"),
    });

export default profileSchema
