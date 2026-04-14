"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function Overlay() {
  const { scrollYProgress } = useScroll();
  const { dict } = useApp();

  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, 100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 1], [1, 0, 0]); // Hard lock at 0 later

  const y2 = useTransform(scrollYProgress, [0.1, 0.15, 0.25], [100, 0, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.15, 0.25], [0, 1, 0]);

  // Highlight Last Word helper
  const renderHighlighted = (sentence: string) => {
    const words = sentence.split(" ");
    const lastWord = words.pop()?.replace('.', ''); // extract last word
    return (
      <>
        {words.join(" ")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] leading-tight px-1">{lastWord}.</span>
      </>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center">
      
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute top-[25%] md:top-1/3 w-full text-center"
      >
        <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
          {dict.overlay.name}<span className="text-orange-500">.</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-medium tracking-wide text-zinc-300">
          {dict.overlay.title}
        </p>
      </motion.div>

      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="absolute top-[60%] md:top-1/2 ltr:left-[5%] md:ltr:left-[10%] rtl:right-[5%] md:rtl:right-[10%] max-w-2xl px-4"
      >
        <h2 className="text-3xl md:text-7xl font-bold tracking-tight text-white mix-blend-difference leading-tight">
          {renderHighlighted(dict.overlay.line2)}
        </h2>
      </motion.div>
      
    </div>

  );
}
