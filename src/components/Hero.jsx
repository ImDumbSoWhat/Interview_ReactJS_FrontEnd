import React from 'react'
import ProfileImg from '../assets/framedImage.jpg'
import LinkedIn from '../assets/linkedin-dark.svg'
import Github from '../assets/github-dark.svg'
import LeetCode from '../assets/leetcode-icon3.png'
import CV from '../assets/cv.pdf'

const Hero = () => {
  return (
    <>
    <div className='bg-black flex-col space-y-7 '>
    <div className='mb-6 flex'>
        <img src={ProfileImg} alt='profile image'/>
    </div>
    <div className='text-white text-center'>
        <h1 className='font-bold text-3xl'>Niraj <br /> Dhodi</h1>
        <h2 className='text-2xl underline'>Full-Stack Developer</h2>
    </div>
    <span className='flex px-5 space-x-8 justify-center'>
        <a href='https://www.linkedin.com/in/niraj-dhodi-b3b866246' target='_blank'>
            <img className='size-14' src={LinkedIn} alt='linkedin'/>
        </a>
        <a href='https://leetcode.com/u/ImDumbSoWhat' target='_blank'>
            <img className='size-14' src={LeetCode} alt='leetcode'/>
        </a>
        <a href='https://github.com/ImDumbSoWhat' target='_blank'>
            <img className='size-14' src={Github} alt='github'/>
        </a>
    </span>
    <p className='text-gray-300 text-center'>Hello folks, I'm a full-stack developer based in Pune, India.</p>
    <div className='flex flex-col items-center justify-center'>
    <a href={CV} download>
        <button className='bg-blue-600 rounded-md px-5 py-1 font-bold text-white font-serif hover:bg-sky-700'>Resume</button>
    </a>
    </div>
    </div>
    </>
  )
}

export default Hero