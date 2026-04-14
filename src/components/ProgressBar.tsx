"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const { lang } = useApp();
  
  // Use spring to slightly smooth out the bare scroll value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-600 shadow-[0_0_10px_#f97316] z-[99999]"
      style={{ 
        originX: lang === 'ar' ? 1 : 0, 
        scaleX 
      }}
    />
  );
}
