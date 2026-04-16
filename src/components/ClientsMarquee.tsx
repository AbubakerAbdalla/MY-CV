"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

function MarqueeTrack({ logos, variant, title }: { logos: string[], variant: number, title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6" dir="ltr">
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-80 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-80 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

      <div className="z-20 text-center mb-2">
        <span className="text-sm md:text-base font-bold bg-zinc-900 border border-orange-500/50 text-orange-400 px-6 py-2 rounded-full shadow-lg">
          {title}
        </span>
      </div>

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
          {totalLogos.map((logo, idx) => {
            
            // ============================================
            // VARIANT 1: Soft Backlight
            // ============================================
            if (variant === 1) {
              return (
                <div key={idx} className="group relative flex-shrink-0 w-40 h-40 md:w-60 md:h-60 flex items-center justify-center p-8 md:p-12 border border-white/5 bg-white/[0.015] backdrop-blur-md rounded-[2.5rem] transition-all duration-700 hover:bg-white/[0.04] hover:border-white/20 hover:scale-105 hover:-translate-y-2 pointer-events-none md:pointer-events-auto">
                  {/* The Backlight specifically behind the image */}
                  <div className="absolute inset-0 m-auto w-24 h-24 md:w-32 md:h-32 bg-white/25 blur-[35px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* General Card Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-orange-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-[2.5rem] pointer-events-none"></div>
                  
                  <img
                    src={`/projects/clients/${logo}`}
                    alt="Logo"
                    className="relative w-full h-full object-contain filter grayscale-[100%] opacity-50 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 z-10 drop-shadow-sm group-hover:drop-shadow-xl pointer-events-none"
                    draggable="false"
                  />
                </div>
              );
            }

            // ============================================
            // VARIANT 2: White Silhouettes
            // ============================================
            if (variant === 2) {
              return (
                <div key={idx} className="group relative flex-shrink-0 w-40 h-40 md:w-60 md:h-60 flex items-center justify-center p-8 md:p-12 border border-white/5 bg-white/[0.015] backdrop-blur-md rounded-[2.5rem] transition-all duration-700 hover:bg-white/[0.9] hover:border-white/40 hover:scale-105 hover:-translate-y-2 pointer-events-none md:pointer-events-auto shadow-2xl">
                  {/* Default: pure white image. Hover: Card becomes white, image returns to original color */}
                  <img
                    src={`/projects/clients/${logo}`}
                    alt="Logo"
                    className="w-full h-full object-contain transition-all duration-700 ease-out z-10 brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 pointer-events-none drop-shadow-md group-hover:drop-shadow-none"
                    draggable="false"
                  />
                </div>
              );
            }

            // ============================================
            // VARIANT 3: Light Glass Cards
            // ============================================
            return (
              <div key={idx} className="group relative flex-shrink-0 w-40 h-40 md:w-60 md:h-60 flex items-center justify-center p-8 md:p-12 border border-white/20 bg-white/10 backdrop-blur-xl rounded-[2.5rem] transition-all duration-700 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:-translate-y-2 pointer-events-none md:pointer-events-auto">
                <img
                  src={`/projects/clients/${logo}`}
                  alt="Logo"
                  className="w-full h-full object-contain transition-all duration-700 ease-out z-10 opacity-70 group-hover:opacity-100 pointer-events-none drop-shadow-sm"
                  draggable="false"
                />
              </div>
            );
            
          })}
        </div>
      </div>
    </div>
  );
}

export function ClientsMarquee({ logos }: { logos: string[] }) {
  const { dict } = useApp();
  const containerRef = useRef<HTMLElement>(null);
  const data = dict.clients;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-transparent py-32 overflow-hidden border-t border-white/5">
      {/* Ambient glowing core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-24 mb-16 text-center relative z-10">
        <motion.div style={{ y: textY }}>
          <span className="text-orange-500/70 font-mono tracking-wider bg-orange-500/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            {data.title}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white opacity-90 max-w-3xl mx-auto leading-tight">
            نماذج مقارنة ألوان الشعارات (اختر الأجمل)
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">قم بتمرير الماوس فوق الشعارات لاختبار تباين الألوان في كل حل. الأول يضع إضاءة خلفية، الثاني يوحد اللون للأبيض، والثالث يستخدم كروتاً مضيئة.</p>
        </motion.div>
      </div>

      <MarqueeTrack variant={1} title="1. الإضاءة الخلفية (Soft Backlight)" logos={logos} />
      <MarqueeTrack variant={2} title="2. توحيد اللون (White Silhouettes)" logos={logos} />
      <MarqueeTrack variant={3} title="3. البطاقات المضيئة (Light Glass)" logos={logos} />
    </section>
  );
}
