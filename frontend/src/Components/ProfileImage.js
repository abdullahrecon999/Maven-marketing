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
            
            className=' border rounded-full max-h-[80px] max-w-[80px] md:max-h-[130px] md:max-w-[130px] object-fill' 
            src={uImage} 
            alt={uImage}/>
        </div>
    
        <input 
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