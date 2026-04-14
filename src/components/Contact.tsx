"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { dict, playHover, playClick } = useApp();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section ref={containerRef} id="contact" className="relative z-20 w-full min-h-screen bg-transparent flex flex-col justify-center px-4 py-32 md:px-24 pb-48">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
           style={{ y: textY }}
           className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            {dict.contact.title}
          </h2>
          <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <motion.div style={{ scale: cardScale }} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-center justify-center">
          
          <Magnetic className="w-full">
            <motion.a
              href="https://www.linkedin.com/in/abubakerabdalla/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group w-full relative h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-md p-10 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 p-2">
                <svg className="w-14 h-14 text-zinc-500 group-hover:text-[#0077B5] transition-colors duration-500 mb-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: dict.contact.linkedin }}></h3>
              </div>
              
              <div className="relative z-10 flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors duration-300 p-2">
                <span className="font-mono text-sm tracking-widest uppercase">{dict.contact.linkedinSub}</span>
                <svg className="w-8 h-8 transform ltr:group-hover:translate-x-3 rtl:group-hover:-translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 ease-out rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>
          </Magnetic>

          <Magnetic className="w-full">
            <motion.a
              href="mailto:abubaker.wp@gmail.com"
              onMouseEnter={playHover}
              onClick={playClick}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group w-full relative h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-md p-10 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 p-2">
                <svg className="w-14 h-14 text-zinc-500 group-hover:text-orange-400 transition-colors duration-500 mb-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: dict.contact.email }}></h3>
              </div>
              
              <div className="relative z-10 flex items-center justify-between text-zinc-400 group-hover:text-white transition-colors duration-300 p-2">
                <span className="font-mono text-sm tracking-widest uppercase">{dict.contact.emailSub}</span>
                <svg className="w-8 h-8 transform ltr:group-hover:translate-x-3 rtl:group-hover:-translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 ease-out rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>
          </Magnetic>

        </motion.div>
      </div>
    </section>
  );
}
