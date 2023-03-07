import React from 'react'

const CampaignDetailInfluencer = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex flex-col space-y-4'>
          <div className="flex space-x-2 rounded-3xl">
              <div className='flex bg-gradient-to-r from-blue rounded-l-3xl to-green w-[65%] h-[55vh] bg-red-500 place-items-end pl-5 pb-4'>
                  <h1 className='text-white text-4xl font-railway'> Brand Name</h1>
              </div>
            
              <div>
                  image here
              </div>

          </div>
          <div className='flex flex-col space-x-2'>
            <h1 className="text-black text-xl font-railway">Work with Brand Name</h1>
            <div>
              <p className='text-lg text-grey font-railway'>
                discriptopn of the job
              </p>
              <div className='flex flex-col'>
                <h1>Required Category</h1>
                <div>
                  detail box here
                </div>

              </div>
            </div>
          </div>

        </div>

    </div>
  )
}

export default CampaignDetailInfluencer