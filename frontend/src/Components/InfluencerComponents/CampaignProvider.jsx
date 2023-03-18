import React , {useState, createContext}from 'react'

export const CampaignContractContext = createContext()

export const CampaignContractProvider =({children})=>{
    const [modalOpen, setModalOpen] = useState(false)
    return(
        <CampaignContractContext.Provider
        value={{
            modalOpen,
            setModalOpen
        }}
        >
            {children}
        </CampaignContractContext.Provider>
    )
}