import React from 'react'
import Heading from '../common/Heading'

const FeatureCard = ()=>{
    return(
        <div className='bg-[#0a2266] w-[90%] lg:w-[20vw] px-10 py-8 flex flex-col items-center justify-center gap-3 rounded-xl '>
            <img className='w-40 rounded-full' src={'/logo.jpg'} alt='logo' />
            <h1 className='text-[#0addf0] font-semibold text-xl'>Promote Innovation</h1>
            <p className='text-white'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ipsum minus ut. Minus accusamus maxime et sequi aliquam unde voluptatem.
            </p>
        </div>
    )
}
const Featured = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
        <Heading text="Our Aim" />
        <div className='flex flex-row flex-wrap items-center gap-20 justify-center'>
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
        </div>
    </div>
  )
}

export default Featured