import React from 'react'
import ProfileImg from '../assets/leonardoAi.jpg'
import LinkedIn from '../assets/linkedin-dark.svg'
import Github from '../assets/github-dark.svg'
import LeetCode from '../assets/leetcode-icon3.png'
import CV from '../assets/cv.pdf'

const Hero = () => {
  return (
    <>
    <section className='md:grid md:grid-cols-2 md:gap-3 bg-gradient-to-r from-black via-gray-800 to-gray-600 flex-col space-y-7 h-screen snap-center px-6 min-w-96'>
    <div className='mb-6 flex justify-center md:place-items-center'>
        <img className='size-64 md:size-96 md:place-content-center rounded-3xl' src={ProfileImg} alt='profile image'/>
    </div>
    <div className='text-center md:place-content-center'>
        <h1 className='font-bold text-3xl md:text-6xl text-white mb-6'>Niraj <br /> Dhodi</h1>
        <h2 className='text-2xl md:text-4xl underline text-white mb-6'>Full-Stack Developer</h2>
    
    <span className='flex px-5 space-x-8 justify-center mb-6'>
        <a href='https://www.linkedin.com/in/niraj-dhodi-b3b866246' target='_blank'>
            <img className='size-14 md:size-16' src={LinkedIn} alt='linkedin'/>
        </a>
        <a href='https://leetcode.com/u/ImDumbSoWhat' target='_blank'>
            <img className='size-14 md:size-16' src={LeetCode} alt='leetcode'/>
        </a>
        <a href='https://github.com/ImDumbSoWhat' target='_blank'>
            <img className='size-14 md:size-16' src={Github} alt='github'/>
        </a>
    </span>
    <p className='text-white text-center md:font-bold max-w-70 mb-6'>Hello folks, I'm a full-stack developer based in Pune, India.</p>
    <div className='flex flex-col items-center justify-center'>
    <a href={CV} download>
        <button className='text-xl md:text-2xl bg-blue-600 rounded-md px-5 md:px-7 py-1 md:py-3 font-bold text-white font-serif hover:bg-sky-700'>Resume</button>
    </a>
    </div>
    </div>
    </section>
    </>
  )
}

export default Hero