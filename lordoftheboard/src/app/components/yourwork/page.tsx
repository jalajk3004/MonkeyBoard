import { motion } from 'framer-motion'
import React from 'react'

const YourWork = () => {
  return (
    <div>
      <section className="min-h-screen px-8 lg:px-16 py-16">
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
    </div>
  )
}

export default YourWork
