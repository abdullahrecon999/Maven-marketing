import React from 'react'
const length = 0;
const type = 0;
const Container = () => {

  return (
    <div className='px-4 py-5 space-y-4 border mx-4 my-3'>
      <div>
      <h1 className='font-railway'>Upload your work</h1>
      <p className='text-sm text-gray-600'>Upload files of your work on campaign here, this allows the client to determine the quality of your work</p>

      </div>
      {length !== 0? <div className="max-w-full">
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
              <input type="file" name="file_upload" className="hidden"/>
          </label>
        </div>:
        // display files here
        <div className='flex flex-col space-y-3'>
          <div className='border bg-white p-3 h-[40vh] '>
            <div className='flex justify-between items-center px-3 py-2 border-b-2'>
              <div className='space-x-0'>
                <h1 className='text-sm text-gray-800 font-railway'>File name</h1>
                <h1 className='mt-0 text-xs text-gray-500 italic' >uploaded at date and time</h1>
              </div>
              <a href="ajfkashf" className='text-blue'>view</a>
            </div>

            <div className='flex justify-between items-center px-3 py-2 border-b-2'>
              <div className='space-x-0'>
                <h1 className='text-sm text-gray-800 font-railway'>File name</h1>
                <h1 className='mt-0 text-xs text-gray-500 italic' >uploaded at date and time</h1>
              </div>
              <a href="ajfkashf" className='text-blue'>view</a>
            </div>
          </div >
          <div className='self-end'>
            {type === 'brand'? null:<>
              <label className='btn'>Upload more files</label>
              <input type='file' className="hidden"></input>
            </>}
          </div>


        </div>}
    </div>
  )
}

export default Container