import React from 'react'
import background from '../../public/uploads/background.mp4'
const Hero = () => {
    return (
        <div className='realtive w-full h-3/4 overflow-hidden'>
            <video className='absolute  left-0 w-full h-3/4 object-cover' autoPlay loop muted>
                <source src="/uploads/background.mp4" type='video/mp4'/>
            </video>

            <div className="mt-20 relative flex flex-col items-center justify-center h-3/4 text-white text-center px-4 bg-black/50">
                <h1 className=" text-4xl md:text-6xl font-bold mb-4">Welcome to Home Stay</h1>
                <p className="text-lg md:text-xl mb-6">Your amazing journey starts here</p>
                
            </div>
        </div>
    )
}

export default Hero