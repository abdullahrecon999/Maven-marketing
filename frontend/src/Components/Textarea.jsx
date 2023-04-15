import React from 'react'
import { useField, ErrorMessage } from 'formik'
const Textarea = ({...props}) => {
    const [feild, meta] = useField(props)
    
  return (
    <>
        <textarea {...props} {...feild} id="message" rows="5" class=" resize-none block p-2.5 w-full text-base  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
        <ErrorMessage name= {feild.name} component="div"  className='text-sm text-red-600'></ErrorMessage>
    </>
  )
}

export default Textarea