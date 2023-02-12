import React ,{useState} from 'react'
import image from "../images/profile.jpg"
const ProfileImage = () => {
    const [uImage, setImage] = useState(image)
    const imageHandler = (e)=> {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
  return (
    <div className='space-y-3'>
        
        <div>
            <img 
            onChange={imageHandler}
            className=' border rounded-full max-h-[80px] max-w-[80px] md:max-h-[130px] md:max-w-[130px]' 
            src={uImage} 
            alt={uImage}/>
        </div>
    
        <input id= "uImage" accept='image/*' type="file"></input>
    </div>
  )
}

export default ProfileImage