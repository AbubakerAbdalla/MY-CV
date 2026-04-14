"use client";

import { motion } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function Certifications() {
  const { dict, lang, playHover } = useApp();

  return (
    <section className="relative z-20 w-full bg-transparent px-4 py-32 md:px-24">
      {/* Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.h2 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-5xl md:text-8xl font-bold mb-24 tracking-tighter text-center text-white opacity-90"
        >
          {dict.certifications.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.certifications.items.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={playHover}
              className="group relative h-full bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-orange-500/30 transition-colors overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div className="absolute -inset-24 bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors duration-300 text-zinc-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="font-mono text-sm text-zinc-500 group-hover:text-orange-400/80 transition-colors bg-black/20 px-3 py-1 rounded-full">
                  {cert.year}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 leading-snug group-hover:text-orange-300 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-zinc-400 font-medium tracking-wide">
                  {cert.issuer}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
