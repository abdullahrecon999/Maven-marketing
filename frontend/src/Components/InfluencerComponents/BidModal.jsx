import React , {useContext, useState, useEffect}from 'react'
import {Formik, Form} from "formik"
import { TextField } from '@mui/material'
import  {useMutation} from "react-query"
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../utils/authProvider";
import { TailSpin } from 'react-loader-spinner'

import { storage } from '../../utils/fireBase/fireBaseInit';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import { async } from '@firebase/util'

const BidModal = ({data, brand, id, influencer, onClose}) => {
    const  [filename, setFileName] = useState("")
    const {user, setUser} = useContext(AuthContext)
    const [url, setUrl] = useState("")
    const [reference, setRef] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    },[])

    const onFileChange = (file, formik)=>{
        console.log(formik)
        const fileRef = ref(storage, `files/${file.name+ v4()}` )
        setRef(fileRef)

        uploadBytes(fileRef,file).then(()=>{
            console.log("uploading the files in the db")
            
            getDownloadURL(fileRef).then((url)=>{
                alert("file is uploaded")
                console.log("this is the file reference")
                
                setUrl(url)
                setFileName(file.name)
                return url
                
                

            })
            
        }).catch((e)=>{
            console.log(e)
        })
    }

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
            answer3:"",
            file: ""
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
                                    <h1 className='text-xl text-black font-railway'>Cover Letter <span className='text-xl text-red-500'>*</span></h1>
                                    <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your cover letter here" required onChange={(e)=> {
                                        formik.setFieldValue("discription", e.target.value)
                                        console.log(formik.values)
                                    }}></textarea>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Amount <span className='text-xl text-red-500'>*</span></h1>
                                    <input type="number" className='block p-2 text-gray-900 bg-gray-50 border rounded-lg border-gray-300 '  required onChange={(e)=> {
                                        formik.setFieldValue("amount", e.target.value)
                                        console.log(formik.values)
                                    }}></input>
                                </div>
                                <div>
                                    <h1 className='text-xl text-black font-railway'>Questions <span className='text-xl text-red-500'>*</span></h1>
                                    <p className="text-base text-grey">Please answer the following questions. These questions allow Brands to better look at your proposal</p>
                                    <div className='flex flex-col px-3 py-4 border rounded-md shadow-md my-4'>
                                    {data.map((item, i)=>{
                                        return <div>
                                        <h1 className='text-base text-black font-railway mb-3'>{i+1} {item} <span className='text-xl text-red-500'>*</span></h1>
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
                                    <div className=" flex flex-col space-y-3">
                                        <div>
                                        <h1 className="text-xl text-gray-900 font-railway">Attach File</h1>
                                        <p className='text-base text-gray-500'>Attact your work here to show your skills to brand</p>
                                        </div>
                                        <div className='border px-5 py-5'>
                                            {filename !== ""? <h1>{filename}</h1>:null}
                                            <div class="max-w-xl">
                                                <label
                                                    class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                                    <span class="flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <span class="font-medium text-gray-600">
                                                            
                                                            <span class="text-blue-600 underline">browse</span>
                                                        </span>
                                                    </span>
                                                    <input onChange={async (e )=>{
                                                               const url = await onFileChange(e.target.files[0], formik)
                                                               


                                                    }} type="file" name="file_upload" class="hidden"></input>
                                                </label>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                                <button type='submit' disabled={isSuccess}  className={`text-white btn text-xl font-railway text-center px-3 py-2 rounded-full bg-blue hover:bg-indigo-500 ${isSuccess=== true? "hidden":""}`}>
                                  {isLoading?<TailSpin
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={!isSuccess}
                                />: "Submit"} 
                                </button>

                                {isSuccess? <p className='text-red-500'>Bid sumitted successfully</p>:null}
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