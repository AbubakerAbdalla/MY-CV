"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { dict, lang } = useApp();
  const isAr = lang === "ar";
  
  const data = dict.about;

  return (
    <section ref={containerRef} className="relative z-20 w-full min-h-screen flex items-center bg-transparent px-4 py-32 md:px-24" dir={isAr ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="text-orange-500/70 font-mono tracking-wider bg-orange-500/10 px-3 py-1 rounded-full text-sm font-semibold mb-6 inline-block">
                {data.subtitle}
              </span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white opacity-90 mb-6">
                {data.title}
              </h2>
            </div>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>{data.p1}</p>
              <p>{data.p2}</p>
              <p className="text-zinc-300 font-medium leading-relaxed">{data.p3}</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {data.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-center min-h-[160px] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">{stat.value}</h3>
                  <p className="text-zinc-400 text-sm md:text-base group-hover:text-zinc-200 transition-colors duration-500">
                    {stat.label}
                  </p>
                </div>
                
                {/* Glow effect on hover matching Projects */}
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-r from-white to-orange-500 blur-3xl -z-10 rounded-[3rem] pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
