import * as yup from 'yup';

let gigSchema = yup.object().shape({
    title: yup.string().required("Email address is required"),
    description : yup.string().min(300, ({min})=> `Description must be atleast ${min} characters`).required("Description is required"),
    platform: yup.string().required("please select a platform"),
    bannerImage: yup.string().required("please add a banner image")
  });

export default gigSchema
