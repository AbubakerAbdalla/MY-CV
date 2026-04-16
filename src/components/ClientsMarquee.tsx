"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function ClientsMarquee({ logos }: { logos: string[] }) {
  const { dict } = useApp();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const data = dict.clients;

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Quadruple the array to ensure flawless infinite loop scrolling
  const totalLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    let animationId: number;
    const track = trackRef.current;
    
    const scroll = () => {
      if (track && !isHovered && !isDragging) {
        track.scrollLeft += 1;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (startX - x) * 1.5; 
    trackRef.current.scrollLeft = scrollLeft + walk;
  };

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

      <div className="relative w-full flex items-center justify-center py-6" dir="ltr">
        {/* Cinematic edge fading gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-80 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-80 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track with Drag Support */}
        <div 
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`flex overflow-x-auto w-full py-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
          style={{ scrollBehavior: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          <div className="flex flex-row gap-8 md:gap-16 items-center px-8 md:px-16 w-max">
            {totalLogos.map((logo, idx) => (
              <div 
                key={idx} 
                className="group relative flex-shrink-0 w-40 h-40 md:w-60 md:h-60 flex items-center justify-center p-8 md:p-12 border border-white/5 bg-white/[0.015] backdrop-blur-md rounded-[2.5rem] transition-all duration-700 hover:bg-white/[0.9] hover:border-white/40 hover:scale-105 hover:-translate-y-2 pointer-events-none md:pointer-events-auto shadow-2xl"
              >
                {/* Default: pure white silhouette image. Hover: Card becomes white glass, image returns to original color */}
                <img
                  src={`/projects/clients/${logo}`}
                  alt={`Client Logo ${idx}`}
                  className="w-full h-full object-contain transition-all duration-700 ease-out z-10 brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 pointer-events-none drop-shadow-md group-hover:drop-shadow-none"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
