"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export default function Capabilities() {
  const { lang, dict } = useApp();
  const t = dict;
  const isAr = lang === "ar";
  
  const data = t.capabilities;

  return (
    <section className="relative z-20 w-full bg-transparent px-4 py-32 md:px-24" dir={isAr ? "rtl" : "ltr"}>
      {/* Animated divider matching other sections */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="inline-block mb-6">
                <span className="text-orange-500/70 font-mono tracking-wider bg-orange-500/10 px-3 py-1 rounded-full text-sm font-semibold">
                  {data.sectionTitle}
                </span>
              </div>
              <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white opacity-90 mb-6">
                {data.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {data.subtitle}
              </p>
            </motion.div>
          </div>
          
          <div className="lg:col-span-8 relative">
            {/* Vertical timeline line for desktop */}
            <div className="hidden md:block absolute ltr:left-[17px] rtl:right-[17px] top-6 bottom-4 w-[2px] bg-white/5"></div>
            
            <div className="space-y-16 mt-8 lg:mt-0">
              {data.items.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: idx * 0.1 }}
                  className="relative ltr:pl-12 rtl:pr-12 md:ltr:pl-16 md:rtl:pr-16 group"
                >
                  {/* Timeline Node */}
                  <div className="absolute ltr:left-[11px] rtl:right-[11px] top-2.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-orange-500 group-hover:bg-orange-500 group-hover:scale-150 group-hover:shadow-[0_0_15px_#f97316] transition-all duration-300 z-10" />
                  
                  <h4 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors mb-4 inline-block">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
