import React ,{useState} from 'react'
import image from "../../images/profile.jpg"
import { useField, ErrorMessage } from 'formik'
import EditIcon from '@mui/icons-material/Edit';
import convertToBase64 from '../../utils/FileConverter'
const ProfileImage = ({image,...props}) => {
    const [feild, meta, setFe] = useField(props)
    const [uImage, setImage] = useState(image)
    
    const imageHandler = async (e)=> {
        
        // console.log(feild.value)
        
        
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        const image = await convertToBase64(e.target.files[0])
        props.setvalue("uImage",image)
        
    }
  return (
    <div className='space-y-3 relative flex flex-col items-center justify-center'>
        
        <div>
            <img 
            
            className=' border rounded-full h-[150px] w-[150px]  object-cover' 
            src={uImage} 
            alt={uImage}/>
        </div>
        <label className='absolute -top-2 -right-10 p-1 text-xs text-grey border rounded-full hover:shadow-md' for="uImage"> <EditIcon></EditIcon></label>
        
        <input
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