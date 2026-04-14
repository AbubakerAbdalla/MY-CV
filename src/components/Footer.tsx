"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/providers/AppContext";

export function Footer() {
  const { dict } = useApp();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    update();
    const tick = setInterval(update, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-black/50 backdrop-blur-md text-zinc-500 text-xs md:text-sm py-6 px-4 md:px-24 flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]"></span>
        <p className="font-mono tracking-widest">{dict.footer.loc}</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-2 text-center">
        <p className="opacity-70">&copy; {new Date().getFullYear()} Abubaker Abdalla. Made with <span className="text-red-500">❤️</span></p>
      </div>

      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
        <span className="opacity-50">{dict.footer.time}</span>
        <span className="text-orange-400 font-mono font-medium drop-shadow-sm min-w-[80px] ltr:text-right rtl:text-left">{time || "--:--:--"}</span>
      </div>
    </footer>
  );
}
