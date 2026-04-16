"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function ClientsMarquee({ logos }: { logos: string[] }) {
  const { dict, lang } = useApp();
  const isAr = lang === "ar";
  const containerRef = useRef<HTMLElement>(null);
  const data = dict.clients;

  // Quadruple the array to ensure flawless infinite loop scrolling on ultrawide monitors
  const totalLogos = [...logos, ...logos, ...logos, ...logos];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-transparent py-32 overflow-hidden border-t border-white/5">
      {/* Ambient glowing core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-24 mb-20 text-center relative z-10">
        <motion.div style={{ y: textY }}>
          <span className="text-orange-500/70 font-mono tracking-wider bg-orange-500/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            {data.title}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white opacity-90 max-w-3xl mx-auto leading-tight">
            {data.subtitle}
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full flex items-center justify-center py-10" dir="ltr">
        {/* Cinematic edge fading gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-80 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-80 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex overflow-visible w-full mask-image-gradient">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35 + logos.length * 2, // dynamic duration so it's not too fast
              repeat: Infinity,
            }}
            className="flex flex-row gap-10 md:gap-16 items-center px-8 w-max"
          >
            {totalLogos.map((logo, idx) => (
              <div 
                key={idx} 
                className="group relative flex-shrink-0 w-44 h-44 md:w-64 md:h-64 flex items-center justify-center p-8 md:p-12 border border-white/5 bg-white/[0.015] backdrop-blur-md rounded-[2.5rem] transition-all duration-700 hover:bg-white/[0.04] hover:border-white/20 hover:scale-105 hover:-translate-y-2 cursor-pointer"
              >
                {/* Internal Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-orange-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-[2.5rem] pointer-events-none"></div>
                
                <img
                  src={`/projects/clients/${logo}`}
                  alt={`Client Logo ${idx}`}
                  className="w-full h-full object-contain filter grayscale-[100%] opacity-40 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 z-10 drop-shadow-sm group-hover:drop-shadow-2xl"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
