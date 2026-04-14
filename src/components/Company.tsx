"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function Company() {
  const containerRef = useRef<HTMLElement>(null);
  const { dict, playHover, playClick } = useApp();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rocketY = useTransform(scrollYProgress, [0, 1], [300, -300]);

  return (
    <section ref={containerRef} className="relative z-20 w-full min-h-screen bg-transparent px-4 py-32 md:px-24 flex items-center overflow-hidden border-t border-white/5">
      <div className="absolute ltr:left-[30%] rtl:right-[30%] top-0 h-[1000px] w-1 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent opacity-50 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <motion.div style={{ y: contentY }} className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block px-5 py-2 border border-orange-500/30 rounded-full bg-orange-500/10 text-orange-400 font-mono text-sm tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
          >
            {dict.company.badge}
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            MS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">Rockets</span>
          </h2>
          
          <h3 className="text-2xl md:text-3xl text-zinc-300 font-light mb-8 leading-tight">
            {dict.company.subtitle}
          </h3>
          
          <p className="text-zinc-400 text-lg leading-relaxed mb-12">
            {dict.company.desc}
          </p>
          
          <a
            href="https://msrockets.com/"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-white/10 text-white font-semibold rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 backdrop-blur-md"
          >
            {dict.company.btn}
            <svg className="w-5 h-5 transform ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <div className="relative h-[500px] w-full flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ y: rocketY }}
            className="relative w-full h-full flex items-center justify-center group"
          >
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/30 to-purple-600/20 rounded-full blur-[100px] mix-blend-screen opacity-50" />
            
            <motion.div 
               initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
               whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, type: "spring", bounce: 0.4 }}
               className="relative z-10 w-80 h-80 border border-white/10 bg-white/[0.01] backdrop-blur-lg rounded-[3rem] transform shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-50" />
              
              <svg className="w-32 h-32 text-orange-400 drop-shadow-[0_0_30px_rgba(249,115,22,1)] transform -translate-y-2 translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              
              <div className="absolute top-10 ltr:right-10 rtl:left-10 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_#f97316]"></div>
              <div className="absolute bottom-16 ltr:left-12 rtl:right-12 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
