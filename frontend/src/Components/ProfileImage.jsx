import React ,{useState} from 'react'
import image from "../images/profile.jpg"
import { useField, ErrorMessage } from 'formik'
import convertToBase64 from '../utils/FileConverter'
import { storage } from '../utils/fireBase/fireBaseInit';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
const ProfileImage = ({...props}) => {
    const [feild, meta, setFe] = useField(props)
    const [uImage, setImage] = useState(image)
    const imageHandler = async (fileUpload)=> {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(fileUpload)
        const fileRef = ref(storage, `files/${fileUpload.name+ v4()}` )
        
        uploadBytes(fileRef,fileUpload).then(()=>{
            console.log("uploading the files in the db")
            
            getDownloadURL(fileRef).then((url)=>{
                props.setvalue("uImage",url)
                alert("file is uploaded")
                

            })
            
        }).catch((e)=>{
            console.log(e)
        })
        
        
       
    }
  return (
    <div className='space-y-3'>
        
        <div>
            <img 
            
            className=' border rounded-full h-[100px] max-w-[100%] md:max-h-[100%] md:max-w-[100%] object-cover' 
            src={uImage} 
            alt={uImage}/>
        </div>
        {/* <lable htmlFor="uImage" className=" bg-blue  text-whites shadow font-railway px-2 py-1 rounded-lg hover:opacity-95 hover:bg-indigo-500">Upload Image</lable> */}
        <input 
        
        
        {...feild}
        {...props}
        onChange = {(e)=> imageHandler(e.target.files[0])}
        value={undefined}
        id= "uImage" accept='image/*' type="file"></input>
         <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
    </div>
  )
}

export default ProfileImage