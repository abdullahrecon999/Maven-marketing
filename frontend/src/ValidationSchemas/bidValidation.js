import * as yup from 'yup';
const bidSchema = yup.object().shape({
    discription: yup.string().required("Cover Letter is required"),
    amount : yup.string().required("Amount is required").matches(/^\d+$/ , "Amount should be a number  "),
    answer1 : yup.string(),
    answer2 : yup.string(),
    answer3 : yup.string()
})

export default bidSchema