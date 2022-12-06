import * as yup from 'yup';

let campaingSchema = yup.object().shape({
    title: yup.string().required("Email address is required"),
    discription : yup.string().min(200, ({min})=> `Description must be atleast ${min} characters`).required("Description is required"),
    platform: yup.string().required("please select a platform"),
    language: yup.string().required("please select a language"),
    country: yup.string().required("please select a country"),
    category: yup.string().required("please select a category"),
  });

export default campaingSchema
