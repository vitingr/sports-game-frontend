import React from 'react'
import HeroContent from './HeroContent'

const Hero = () => {
  return (
    <div className='relative flex flex-col items-center h-[115vh] w-full'>
      <video autoPlay muted loop className='rotate-180 absolute top-[-340px] left-0 z-[1] w-full h-full object-cover'>
        <source src='https://media.contentapi.ea.com/content/dam/ea/fc/videos/top-h-large/fc24-hero-lg-motion-pitch-3x2-lg-md.webm' className='object-fit' type='video/webm' />
      </video>
      <HeroContent />
    </div>
  )
}

export default Hero