"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppContext";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const { dict, lang, toggleLang, soundEnabled, toggleSound, playHover, playClick } = useApp();

  return (
    <div 
      className="fixed bottom-8 ltr:right-8 rtl:left-8 z-50 flex flex-col items-end gap-4"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col gap-3 ${lang === "ar" ? "items-start" : "items-end"}`}
          >
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              onMouseEnter={playHover}
              className="group flex flex-row items-center gap-3"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg border border-white/10 shadow-lg">
                {dict.floating.lang}
              </span>
              <div className="flex items-center justify-center w-12 h-12 p-3 bg-zinc-800 border border-white/10 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-all font-bold shadow-lg">
                {lang === 'en' ? 'AR' : 'EN'}
              </div>
            </button>

            {/* Sound Toggle */}
            <button 
              onClick={toggleSound}
              onMouseEnter={playHover}
              className="group flex flex-row items-center gap-3"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg border border-white/10 shadow-lg">
                {dict.floating.sound}: {soundEnabled ? 'ON' : 'OFF'}
              </span>
              <div className="flex items-center justify-center w-12 h-12 p-3 bg-zinc-800 border border-white/10 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg">
                {soundEnabled ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </div>
            </button>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/971551922642" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex flex-row items-center gap-3"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg border border-white/10 shadow-lg">{dict.floating.wa}</span>
              <div className="flex items-center justify-center p-3 w-12 h-12 bg-zinc-800 border border-white/10 rounded-full text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
            </a>

            {/* Call Button */}
            <a 
              href="tel:+971551922642"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex flex-row items-center gap-3"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg border border-white/10 shadow-lg">{dict.floating.call}</span>
              <div className="flex items-center justify-center p-3 w-12 h-12 bg-zinc-800 border border-white/10 rounded-full text-white hover:bg-sky-500 hover:border-sky-500 transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          playClick();
        }}
        onMouseEnter={playHover}
        className="relative w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all z-50 float-right"
      >
        <motion.div animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}>
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
        </motion.div>
      </button>
    </div>
  );
}
