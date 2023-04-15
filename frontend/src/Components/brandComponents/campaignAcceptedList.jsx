import React from 'react'

const CampaignAcceptedList = ({avatar, name, id, influencerId, brandId, onOpen}) => {
  return (
    <>
        <div class="flow-root border ">
        <ul  class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 px-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"></img> */}
                        <img  class="w-8 h-8 rounded-full" src={avatar} alt="Neil image"></img>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {name}
                        </p>
                        
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button onClick={()=>{
                            onOpen(id)
                        }} className="px-2 py-1 rounded-full text-sm text-white bg-green">Send Contract</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </>
  )
}

export default CampaignAcceptedList