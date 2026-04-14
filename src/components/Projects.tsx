"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { dict, lang, playHover } = useApp();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const headingX = useTransform(
    scrollYProgress, 
    [0, 1], 
    lang === 'ar' ? [100, -100] : [-100, 100]
  );

  return (
    <section ref={containerRef} className="relative z-20 w-full min-h-screen bg-transparent px-4 py-32 md:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.h2 
          style={{ x: isMobile ? 0 : headingX }}
          className="text-6xl md:text-[8rem] whitespace-nowrap font-bold mb-24 tracking-tighter text-white/5 uppercase select-none ltr:text-left rtl:text-right"
        >
          {dict.projects.title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative -mt-32">
          {dict.projects.items.map((p, i) => (
            <motion.div 
              onMouseEnter={() => {
                playHover();
                setActiveProject(i);
              }}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => setActiveProject(activeProject === i ? null : i)}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
              key={i}
              className={`group relative h-96 rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md p-10 flex flex-col justify-end transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2 ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-[1]"></div>
              
              {p.image && (
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${activeProject === i ? 'opacity-60' : 'opacity-40 group-hover:opacity-60'}`}
                />
              )}
              
              <div className={`relative z-10 transition-transform duration-500 ${activeProject === i ? 'translate-y-0' : 'translate-y-6 group-hover:translate-y-0'}`}>
                <p className="text-orange-400 font-mono text-sm mb-3 opacity-80">{p.tech}</p>
                <h3 className="text-4xl font-bold text-white mb-4">{p.title}</h3>
                <p className={`text-zinc-400 transition-opacity duration-500 delay-100 ${activeProject === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {p.desc}
                </p>
              </div>
              
              <div className={`absolute -inset-1 transition-opacity duration-700 bg-gradient-to-r from-white to-orange-500 blur-3xl -z-10 rounded-[3rem] pointer-events-none ${activeProject === i ? 'opacity-20' : 'opacity-0 group-hover:opacity-20'}`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
}
