import React , {useContext, useState, useEffect, useRef, useMemo}from 'react'

import {ContractContext} from "../ContractProvider"
import { storage } from '../../../utils/fireBase/fireBaseInit';
import {ref, listAll, uploadBytes, getDownloadURL, getMetadata, deleteObject} from "firebase/storage"
import {v4} from "uuid"
import { async } from '@firebase/util';
const length = true;
const type = 0;
const Container = () => {

  const {contract} = useContext(ContractContext)
  const [checkIfFiles, setCheckIfFiles] = useState(true)
  const [files, setFile] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  
  const checkFiles = async()=>{
    console.log("Contract and comma",contract)
    try{
      const fileRef = ref(storage, contract?.filesRef)
      const list = await listAll(fileRef)
      
      
      

      if(list.items.length !==0){
        setCheckIfFiles(true)
        const temp = [];
        list.items.forEach(async(item)=>{
          console.log(list.items.length)
          try{
            const url = await getDownloadURL(ref(storage, item))
            const metaData = await getMetadata(ref(storage, item))
            console.log(url+"this is the url")
            temp.push({
              name: metaData.name,
              ref :item,
              date : metaData.timeCreated,
              url: url
            })
          }catch(e){
            console.log("there was some eroorrrr opsiii")
          }
        })
        setUploadedFiles(temp)
        return temp
      }else{
        setCheckIfFiles(false)
      }
           
    }catch(e){
      console.log(e)
    }
  }

  const handleDelete = (referenceUrl, name)=>{
    if(window.confirm("Are you sure to delete file name")){
      console.log("cnfrm")
      deleteObject(ref(storage, "gs://mavenmarketing-93029.appspot.com/ODgyXzE2Nzk1MDQyMDcxNDZfNDk/brand (1).jpg")).then(async()=>{
        alert("file removed")
        const temp = uploadedFiles.filter((item)=>{
          return item.name !==name
        })
        setUploadedFiles(temp)

       
      }).catch((err)=>{
        console.log("there was an error")
        alert('error')
      })
    }else{
      console.log("not cnfrm")
    }
  }
  
  useEffect(()=>{
    console.log("inside useEffect")
    checkFiles()
    console.log("after useEffect")
  },[contract])

  const upload = async(files)=>{
    
    
    const fileRef = ref(storage, contract?.filesRef+"/"+files.name)
   
    uploadBytes(fileRef,files).then((file)=>{
      alert(`${files.name} is uploaded`)

    }).catch(e=>{
      console.log(e)
    })

  }
  
  return (
    <div className='px-4 py-5 space-y-4 border mx-4 my-3'>

      
      <div>
      <h1 className='font-railway'>Upload your work</h1>
      <p className='text-sm text-gray-600'>Upload files of your work on campaign here, this allows the client to determine the quality of your work</p>

      </div>
      {false? <div className="max-w-full">
          <label
              className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline">browse</span>
                  </span>
              </span>
              <input onChange={(e)=>{
                setFile(e.target.files)
                upload(e.currentTarget.files[0])
              }} type="file" name="file_upload" className="hidden"/>
          </label>
        </div>:
        // display files here
        <div className='flex flex-col space-y-3'>
          <div className='border bg-white p-3 h-[40vh] '>
        
            {console.log("bakra",uploadedFiles)}
            <div  className='flex justify-between items-center px-3 py-2 border-b-2'>
              <div className='space-x-0'>
                <h1 className='text-sm text-gray-800 font-railway'>File name</h1>
                <h1 className='mt-0 text-xs text-gray-500 italic' >uploaded at date and time</h1>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">Click</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-24 border shadow-md">
                  <li className='text-xs'><a>View</a></li>
                  <li className='text-xs' onClick={()=>{
                    
                    handleDelete("https://firebasestorage.googleapis.com/v0/b/mavenmarketing-93029.appspot.com/o/ODgyXzE2Nzk1MDQyMDcxNDZfNDk%2Fbrand%20(1).jpg?alt=media&token=d95166ee-0c69-42c6-8d0e-3e7e72ca85be", "brand (1).jpg")
                  }}><h1>Delete</h1></li>

                </ul>
              </div>
            </div>
            {uploadedFiles.map((file, i)=>{
              return <div key={i} className='flex justify-between items-center px-3 py-2 border-b-2'>
              <div className='space-x-0'>
                <h1 className='text-sm text-gray-800 font-railway'>{file?.name}</h1>
                <h1 className='mt-0 text-xs text-gray-500 italic' >uploaded at {file?.date}</h1>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">Click</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-24 border shadow-md">
                  <li className='text-xs'><a>View</a></li>
                  <li className='text-xs'><h1>Delete</h1></li>

                </ul>
              </div>
            </div>
            })}
           
            


           
          </div >
          <div className='self-end'>
            {type === 'brand'? null:<>
              <label htmlFor='File' className='btn'>Upload more files</label>
              <input id="File" onChange={(e)=>{
                upload(e.currentTarget.files[0])
              }} type='file' className="hidden"></input>
            </>}
          </div>


        </div>}
    </div>
  )
}

export default Container