import React from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'


const App = () => {
  return (
    <>
    <div className='h-screen snap-y scroll-smooth overflow-auto '>
    <Hero />
    <Experience />
    <Projects />
    <Contact />
    </div>
    </>
  )
}

export default App