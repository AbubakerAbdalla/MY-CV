"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center cursor-wait"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 to-black pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-8 drop-shadow-[0_0_25px_rgba(249,115,22,0.6)] uppercase">
              MS Rockets
            </h1>
            <div className="text-white/50 font-mono text-xl tracking-widest">
              {progress > 100 ? 100 : progress}%
            </div>
            <div className="w-64 h-[1px] bg-white/10 mt-6 mx-auto relative overflow-hidden rounded-full">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="absolute top-0 left-0 bottom-0 bg-orange-500 shadow-[0_0_15px_#f97316]"
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
