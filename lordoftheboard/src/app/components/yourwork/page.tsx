import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import Card from './card'

const YourWork = () => {
  return (
    <div>
      <section className=" px-4 m-10 lg:px-16 py-8">
          <motion.h2 
            className="text-3xl font-bold text-zinc-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            Your Work
            <button></button>
          </motion.h2>
          {/* Add your work section content here */}
        </section>

        <div className='flex flex-col items-center justify-center'>
        
        <img src="/nowork.png" alt="Work in Progress"  />
        <p>Progress is yet to begin</p>

        
        </div>

        <Card />
        
    </div>
  )
}

export default YourWork
