import React from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'


const App = () => {
  return (
    <>
    <div className=' scrollbar-hide h-screen snap-y scroll-smooth overflow-auto absolute inset-0 -z-10  w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
    <Hero />
    <Experience />
    <Projects />
    <Contact />
    </div>
    </>
  )
}

export default App