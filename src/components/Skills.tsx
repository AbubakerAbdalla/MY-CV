"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dict, playHover } = useApp();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const categories = [
    {
      title: dict.skills.cat1,
      skills: ["Laravel", "PHP", "Dart", "Python", "JavaScript", "HTML", "CSS", "WordPress", "Filament", "MySQL", "REST APIs"]
    },
    {
      title: dict.skills.cat2,
      skills: ["Flutter", "FlutterFlow", "Figma", "WebFlow", "Canva", "Photoshop", "Capcut"]
    },
    {
      title: dict.skills.cat4,
      skills: ["Docker", "CI/CD", "Linux", "Git", "Cloud", "CPanel"]
    },
    {
      title: dict.skills.cat3,
      skills: ["Project Mgmt", "SEO", "Prompt Engineering", "SQL", "WHMCS"]
    }
  ];

  return (
    <section ref={containerRef} className="relative z-20 w-full min-h-screen bg-transparent px-4 py-32 md:px-24 flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2 
          style={{ y: titleY }}
          className="text-5xl md:text-8xl font-bold mb-20 tracking-tighter text-white opacity-90"
        >
          {dict.skills.title}
        </motion.h2>
        
        <motion.div style={{ y: cardsY }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
              key={i}
              className="group bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-500 rounded-3xl p-8 lg:p-6 backdrop-blur-md relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl lg:text-xl xl:text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {cat.skills.map((skill, j) => (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (j * 0.05) }}
                    key={j} 
                    onMouseEnter={playHover}
                    className="px-4 py-2 rounded-full border border-white/10 bg-black/50 text-sm font-medium text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
