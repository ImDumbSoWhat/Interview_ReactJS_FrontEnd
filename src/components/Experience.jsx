import React from 'react'
import {WorkHistory} from '../constants'
import reactjs from '../assets/react.png'
import spring from '../assets/spring.png'
import kafka from '../assets/kafka-icon.png'
import java from '../assets/java.png'
import postgres from '../assets/postgres.png'
import rest from '../assets/rest.png'
import grpc from '../assets/grpc-seeklogo.svg'
import mongo from '../assets/mongo-db.png'


const Experience = () => {
  return (
    <>
    <div className='h-screen snap-center pb-4  '>
    <div className='pb-10'>
      <h2 className='text-center text-white text-4xl my-2 lg:my-14'>Skills</h2>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <img className='size-16 lg:size-24' src={java} alt='java'/>
        <img className='size-16 lg:size-24' src={spring} alt='spring'/>
        <img className='size-16 lg:size-24' src={reactjs} alt='reactjs'/>
        <img className='size-16 lg:size-24' src={postgres} alt='postgresql'/>
        <img className='size-16 lg:size-24' src={mongo} alt='mongodb'/>
        <img className='size-16 lg:size-24 rounded-xl' src={rest} alt='rest'/>
        <img className='size-16 lg:size-24 bg-white rounded-xl' src={grpc} alt='spring'/>
        <img className='size-16 lg:size-24' src={kafka} alt='kafka'/>
      </div>
    </div>
    <div >
      <h2 className='mb-2 lg:my-14 text-center text-4xl text-white'>EXPERIENCE</h2>
      <div>
        {WorkHistory.map((experience,index) => (
          <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
            <div className='w-full lg:w-1/4'>
              <p className='mb-2 text-sm text-stone-300 '>{experience.year}</p>
            </div>
            <div className='w-full max-w-xl lg:w-3/4'>
              <h3 className='text-white mb-2 font-semibold'>{experience.role}-{" "}
              <span className='text-sm text-stone-500'>
                {experience.company}
              </span>
              </h3>
              <p className='text-stone-400 mb-4'>{experience.description}</p>
              {experience.technologies.map((tech, index) => (
                <span key={index} className='mr-2 mt-4 rounded bg-stone-900 px-2 py-1 text-sm font-medium text-stone-300'>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
    
  )
}

export default Experience