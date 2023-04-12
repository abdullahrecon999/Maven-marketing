import React,  {useContext} from 'react'
import User from './User'
import ContractInfo from './ContractInfo'
import Container from "./WorkTrack/Container"
import { ContractContext } from './ContractProvider'
const ContractDetails = () => {
    const {contract} = useContext(ContractContext)
  return (
    <div className='container mx-auto'>
        {console.log(contract)}
        <div className='flex flex-col space-y-2'>
            <h1  className='px-9 text-xl font-railway'></h1>
            <div className='flex flex-col space-y-3 px-5 md:flex-row md:space-y-0'>
                <div className='flex-1 '>

                    {/* Top header */}
                    <div className='flex justify-between mx-3 border shadow-sm rounded-md px-8 py-3'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-sm text-center'>Amount</h1>
                            <h1 className="text-xl font-railway text-center">$ 17000</h1>
                        </div>
                        <label htmlFor="my-drawer-4" className='btn bg-green text-white border-green'> Request payment</label>
                    </div>

                    {/* Work Tracker */}
                    <Container></Container>
                </div>
                <div className='flex-[0.45] flex-col space-y-2'>
                    <User></User>
                    <ContractInfo></ContractInfo>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContractDetails