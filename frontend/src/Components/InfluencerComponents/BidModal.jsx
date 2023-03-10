import React , {useContext}from 'react'
import {Formik, Form} from "formik"
import { TextField } from '@mui/material'
import  {useMutation} from "@tanstack/react-query"
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../utils/authProvider";
const BidModal = ({data, brand, id, influencer, onClose}) => {
    
    const {user} = useContext(AuthContext)
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
    const{mutate, isLoading, isSuccess, isError} = useMutation(handleSubmit)

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
                    <div className='flex bg-white flex-col items-center justify-center border py-4' >
                        <button type="button" onClick={()=> handleClose()} className="place-self-end px-5 pt-3"> <CloseIcon></CloseIcon></button>
                        <div className='w-[70%] h-[80%] bg-white p-4 border rounded-xl'>
                            <div className="space-y-2">
                                <h1 className='text-2xl text-black font-railway mb-1'>Enter Proposal Details</h1>
                                <hr></hr>
                                <div className='space-y-1'>
                                    <h1 className='text-xl text-black font-railway'>Cover Letter</h1>
                                    <TextField multiline maxRows={5} sx={{width: "100%"}} variant="standard" required onChange={(e)=> {
                                        formik.setFieldValue("discription", e.target.value)
                                        console.log(formik.values)
                                    }}></TextField>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Amount</h1>
                                    <TextField type="number" sx={{width: "100%"}} variant="standard"  required onChange={(e)=> {
                                        formik.setFieldValue("amount", e.target.value)
                                        console.log(formik.values)
                                    }}></TextField>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Questions</h1>
                                    <p className="text-base text-grey">Please answer the following questions. These questions allow Brands to better look at your proposal</p>
                                    <div>
                                        <h1 className='text-base text-black font-railway'>1. {data[0]}</h1>
                                        <TextField sx={{width: "100%"}} variant="standard"  required onChange={(e)=> {
                                        formik.setFieldValue("answer1", e.target.value)
                                        console.log(formik.values)
                                    }}></TextField>
                                    </div>
                                    <div>
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
                                    </div>
                                </div>
                                <button type='submit' className='text-white text-xl font-railway text-center px-3 py-2 rounded-full bg-blue hover:bg-indigo-500'> Submit Proposal</button>
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