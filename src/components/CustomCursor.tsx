"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only mount on devices that strictly support hover (non-touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input, textarea')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isHovered ? 1.5 : 1, 
        opacity: 1,
        backgroundColor: isHovered ? "rgba(249, 115, 22, 0.15)" : "rgba(255, 255, 255, 1)",
        border: isHovered ? "1px solid rgba(249, 115, 22, 0.8)" : "none"
      }}
      className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full z-[99999] mix-blend-screen pointer-events-none items-center justify-center"
    >
      <div className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
    </motion.div>
  );
}
