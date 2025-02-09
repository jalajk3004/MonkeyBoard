"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedHeader = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollFade = Math.max(0.3, 1 - scrollPosition / 250); // Controls fade-out effect smoothly

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-5xl lg:text-6xl font-extrabold text-center mt-6 tracking-tight 
                 text-zinc-900 dark:text-white transition-all duration-700"
      style={{
        opacity: scrollFade,
        transform: `translateY(-${scrollPosition * 0.1}px)`,
        textShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", // Light shadow for depth
      }}
    >
      Lord of the Board
    </motion.h1>
  );
};

export default AnimatedHeader;
