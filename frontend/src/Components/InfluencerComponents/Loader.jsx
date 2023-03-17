import React from 'react'
import { LineWave } from 'react-loader-spinner'
const Loader = ({title, subtitle}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-xxl font-railway text-black md:text-3xl'>{title}</h1>
      <p className='text-base text-grey md:text-xl'>{subtitle}</p>
      <div className='flex justify-center'>
      <LineWave
      height="250"
      width="250"
      color="hsl(214,100%,55%)"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
      </div>
      
    </div>
  )
}

export default Loader