import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything,anytime,anywhere</h1>
      <p className='max-w-3xl text-gray-600'>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700 transition'>Get started</button>
        <button className='flex items-center gap-2 cursor-pointer hover:underline'>Learn more<img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
