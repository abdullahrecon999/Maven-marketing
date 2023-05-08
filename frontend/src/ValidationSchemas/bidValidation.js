import * as yup from 'yup';
const bidSchema = yup.object().shape({
    discription: yup.string().required("Cover Letter is required0"),
    amount : yup.string().required("Amount is required").matches(/^\d+$/ , "Amount should be a number  "). min(5, "the amount should be atleast 5"),
    answer1 : yup.string().required("please answer the question"),
    answer2 : yup.string().required("please answer the question"),
    answer3 : yup.string().required("please answer the question")
})

export default bidSchema