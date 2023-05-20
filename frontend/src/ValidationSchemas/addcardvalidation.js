import * as yup from 'yup';

let campaingSchema = yup.object().shape({
    number: yup.string()
    .required("card number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(16, 'please enter the correct card number')
    .max(16, 'please enter the correct card number'),
    exp_month: yup.string().required("expiry month is required").matches(/^[0-9]+$/, "Must be only digits").min(1,"please enter a valid month").max(12, "please enter a valid month"),
    cvc: yup.string()
    .required("CVC is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(3, 'please enter the correct CVC')
    .max(3, 'please enter the correct CVC'),
    exp_year: yup.string().required("expiry year is required").matches(/^[0-9]+$/, "Must be only digits").min(4,"please enter a valid year").max(4, "please enter a valid year"),

   
  });

export default campaingSchema
