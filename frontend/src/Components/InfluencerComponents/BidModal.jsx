import React , {useContext}from 'react'
import {Formik, Form} from "formik"
import { TextField } from '@mui/material'
import  {useMutation} from "react-query"
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../utils/authProvider";
import { TailSpin } from 'react-loader-spinner'
const BidModal = ({data, brand, id, influencer, onClose}) => {
    
    const {user} = useContext(AuthContext)
    console.log(user)
    const handleSubmit = async (values)=>{
        const val = {
            sender: user["_id"],
            to: brand,
            campaignId: id,
            ...values
        }
        console.log(val)
        return await axios.post(`http://localhost:3000/influencer/bidCampaign/${id}`, val, {headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
        
        
    }
    const{mutate, isLoading, isSuccess, isError, data:status} = useMutation(handleSubmit)

    const handleClose = ()=>{
        onClose()
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30 '>
        <Formik
        initialValues={{ 
            discription: "",
            amount: "",
            answer1: "",
            answer2: "",
            answer3:""
        }}

        onSubmit={(values)=> {

            mutate(values)
        }}
        >
            {(formik)=>(
                <Form>
                    {console.log(formik.values)}
                    <div className='flex bg-white flex-col items-center justify-center border py-8 h-[80vh] ' >
                        <button type="button" onClick={()=> handleClose()} className="place-self-end px-5 pt-3"> <CloseIcon></CloseIcon></button>
                        <div className='w-[70%] h-full  bg-white p-4 border rounded-xl overflow-y-auto '>
                            <div className="space-y-2">
                                {isSuccess? <p className='text-red'>Proposal submitted successfully</p>:null}
                                {isError && <p className='text-red-800'>{console.log(status)}</p>}
                                <h1 className='text-2xl text-black font-railway mb-1'>Enter Proposal Details</h1>
                                <hr></hr>
                                <div className='space-y-1'>
                                    <h1 className='text-xl text-black font-railway'>Cover Letter</h1>
                                    <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your cover letter here" required onChange={(e)=> {
                                        formik.setFieldValue("discription", e.target.value)
                                        console.log(formik.values)
                                    }}></textarea>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Amount</h1>
                                    <input type="number" className='block p-2 text-gray-900 bg-gray-50 border rounded-lg border-gray-300 '  required onChange={(e)=> {
                                        formik.setFieldValue("amount", e.target.value)
                                        console.log(formik.values)
                                    }}></input>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Questions</h1>
                                    <p className="text-base text-grey">Please answer the following questions. These questions allow Brands to better look at your proposal</p>
                                    <div className='flex flex-col px-3 py-4 border rounded-md shadow-md my-4'>
                                    {data.map((item, i)=>{
                                        return <div>
                                        <h1 className='text-base text-black font-railway mb-3'>{i+1} {item}</h1>
                                        <textarea className='block mb-4 p-2 w-full text-gray-900 bg-gray-50 border rounded-lg border-gray-300 '  required onChange={(e)=> {
                                        formik.setFieldValue(`answer${i+1}`, e.target.value)
                                        console.log(formik.values)
                                    }}></textarea>
                                </div>
                                    })}
                                        {/* <div>
                                            <h1 className='text-base text-black font-railway'>2. {data[1]}</h1>
                                            <TextField sx={{width: "100%"}} variant="standard"  required onChange={(e)=> {
                                            formik.setFieldValue("answer2", e.target.value)
                                            console.log(formik.values)
                                        }}></TextField>
                                        </div>
                                        <div>
                                            <h1 className='text-base text-black font-railway'>3. {data[2]}</h1>
                                            <TextField sx={{width: "100%"}} variant="standard"  required onChange={(e)=> {
                                            formik.setFieldValue("answer3", e.target.value)
                                            console.log(formik.values)
                                        }}></TextField>
                                        </div> */}
                                    </div>
                                </div>
                                <button type='submit' disabled={isSuccess}  className={`text-white text-xl font-railway text-center px-3 py-2 rounded-full bg-blue hover:bg-indigo-500 ${isSuccess=== true? "hidden":""}`}>
                                  {isLoading?<TailSpin
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />: "Submit"} 
                                </button>
                        </div>
                        </div>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  )
}

export default BidModal