"use client";

import AnimatedHeader from "../components/animatedheading/page";
import { motion } from "framer-motion";
import CreateWorkspace from "../components/whiteboard/createworkspace";
import YourWork from "../components/yourwork/YourWork";
import Footer from "../components/footer/page";
import JoinWorkspace from "../components/whiteboard/joinworkspace";
import { AppSidebar } from "../components/sidemenu/AppSidebar";



const Page=() => {
 

  return (
    <div className=" min-h-screen">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Main Content */}
      <div className="flex-1 relative p-18">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatedHeader />
        </motion.div>
        
        {/* Hero Section */}
        <header className="h-3/4 flex items-center mt-16 px-8 lg:px-16 gap-7">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mr-10">
              {/* Content Section */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to <span className="font-bold text-zinc-900">Lord Of The Board</span>, a dynamic space where creativity and collaboration meet in real-time! Our interactive whiteboard allows users to draw, sketch, and brainstorm together seamlessly, no matter where they are. Whether you&apos;re working on a project, planning ideas, or simply having fun, our platform offers smooth, instant collaboration with multiple participants. Join in and bring your ideas to life, together, in a shared virtual canvas.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">

                <motion.div 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 w-full rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  >
                  <CreateWorkspace  />
                </motion.div>
                <motion.div 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 w-full rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  >
                  <JoinWorkspace/>
                </motion.div>
                  </div>
              </motion.div>

              {/* Video Section */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <video 
                    loop 
                    autoPlay 
                    muted 
                    className="w-full h-auto rounded-2xl transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    <source
                      src="https://v1.pinimg.com/videos/mc/720p/b3/4d/c2/b34dc2e303d5a5462cf5f0fe90b5beea.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
        
        
        <YourWork />
      <Footer/>
      </div>
    </div>
  );
};

export default Page;