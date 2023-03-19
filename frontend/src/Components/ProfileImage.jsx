import React ,{useState} from 'react'
import image from "../images/profile.jpg"
import { useField, ErrorMessage } from 'formik'
import convertToBase64 from '../utils/FileConverter'
const ProfileImage = ({...props}) => {
    const [feild, meta, setFe] = useField(props)
    const [uImage, setImage] = useState(image)
    const imageHandler = async (e)=> {
        
        console.log(feild.value)
        
        
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        const image = await convertToBase64(e.target.files[0])
        props.setvalue("uImage",image)
        console.log(image)
    }
  return (
    <div className='space-y-3'>
        
        <div>
            <img 
            
            className=' border rounded-full h-[100px] max-w-[100%] md:max-h-[100%] md:max-w-[100%] object-cover' 
            src={uImage} 
            alt={uImage}/>
        </div>
        <lable htmlFor="profileImage" className=" bg-blue text-white border shadow font-railway px-2 py-1 rounded-lg hover:opacity-95 hover:bg-indigo-500">Upload Image</lable>
        <input 
        id="profileImage"
        className='hidden'
        {...feild}
        {...props}
        onChange = {(e)=> imageHandler(e)}
        value={undefined}
        id= "uImage" accept='image/*' type="file"></input>
         <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
    </div>
  )
}

export default ProfileImage