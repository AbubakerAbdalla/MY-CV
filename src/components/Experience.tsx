"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";
import { Magnetic } from "@/components/ui/Magnetic";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dict, lang, playHover, playClick } = useApp();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-transparent px-4 py-32 md:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white opacity-90"
          >
            {dict.experience.title}
          </motion.h2>
          
          <Magnetic>
            <motion.a 
              href="/cv.pdf"
              download="Abubaker_Abdalla_CV.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative z-50 inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-zinc-300 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] backdrop-blur-md cursor-pointer"
            >
              {dict.experience.cv}
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </Magnetic>
        </div>
        
        <div className="relative space-y-16">
          {/* Animated Line */}
          <div className="hidden md:block absolute ltr:left-[-35px] rtl:right-[-35px] top-2 bottom-[-48px] w-[2px] bg-white/5">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-orange-500 shadow-[0_0_15px_#f97316]" 
            />
          </div>

          {dict.experience.jobs.map((exp, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              key={i}
              className="relative ltr:pl-8 rtl:pr-8 md:px-0 group"
            >
              <div className="hidden md:block absolute ltr:left-[-41px] rtl:right-[-41px] top-2 w-3.5 h-3.5 rounded-full bg-black border-2 border-orange-500 group-hover:bg-orange-500 group-hover:scale-150 transition-all duration-300 z-10" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors">{exp.role}</h3>
                <span className="text-orange-500/70 font-mono tracking-wider mt-2 md:mt-0 bg-orange-500/10 px-3 py-1 rounded-full text-sm font-semibold">{exp.date}</span>
              </div>
              <h4 className="text-xl text-zinc-300 mb-6 font-medium">{exp.company}</h4>
              <ul className="space-y-3 text-zinc-400">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed group-hover:text-zinc-200 transition-colors">
                    <span className="text-orange-500 opacity-50 mt-1">▹</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
