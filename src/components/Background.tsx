"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  
  // Parallax calculations for abstract glowing orbs moving in different directions
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-200, 800]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [180, 0]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Heavy noise overlay for premium texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] z-10" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
      ></div>
      
      {/* Orb 1: Emerald glow */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[-10%] left-[-20%] w-[60vw] h-[60vw] bg-orange-600/10 rounded-[40%_60%_70%_30%] blur-[120px] transition-transform duration-300"
      />
      
      {/* Orb 2: Deep blue glow */}
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[80%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 rounded-[60%_40%_30%_70%] blur-[150px] transition-transform duration-300"
      />

      {/* Orb 3: Teal/White ambient center glow */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-red-400/5 rounded-full blur-[100px] transition-transform duration-300"
      />
    </div>
  );
}
