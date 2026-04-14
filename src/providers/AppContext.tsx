"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";

type Lang = "en" | "ar";

const AppContext = createContext({
  lang: "en" as Lang,
  toggleLang: () => {},
  dict: en,
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
});

export function AppProviders({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Lang;
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
  }, []);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    playClick();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      setTimeout(playClick, 10);
    }
  };

  return (
    <AppContext.Provider value={{ lang, toggleLang, dict: lang === "ar" ? ar : en, soundEnabled, toggleSound, playClick, playHover }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
