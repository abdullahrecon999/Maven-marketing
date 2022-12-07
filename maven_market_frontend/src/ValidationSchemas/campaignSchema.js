import * as yup from 'yup';

let campaingSchema = yup.object().shape({
    title: yup.string().required("Email address is required"),
    description : yup.string().min(2, ({min})=> `Description must be atleast ${min} characters`).required("Description is required"),
    platform: yup.string().required("please select a platform"),
    language: yup.string().required("please select a language"),
    country: yup.string().required("please select a country"),
   
  });

export default campaingSchema
