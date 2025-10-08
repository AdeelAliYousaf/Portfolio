
"use client";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "@fontsource/montserrat/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/inter/400.css";
import Lanyard from "./components/Components/Lanyard/Lanyard";

export default function Home() {
  const roles = [
    "Full Stack Software Engineer",
    "Machine Learning Engineer",
    "Computer Scientist",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      1800
    );
    return () => clearTimeout(t);
  }, [roleIndex, roles.length]);

  const titles = [
    "Software Engineer",
    "Machine Learning Engineer",
    "Computer Scientist",
  ];

  // --- Intro logic: only skip on client-side navigation, not reload ---
  const [introStep, setIntroStep] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("skipIntro")) {
      return titles.length + 3;
    }
    return 0;
  });

  // Clear skipIntro on reload (so intro shows on reload)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("skipIntro");
      });
    }
  }, []);

  useEffect(() => {
    if (introStep < titles.length + 3) {
      let delay = 1200;
      if (introStep === 0) delay = 900;
      if (introStep === 1) delay = 900;
      if (introStep === titles.length) delay = 1200; 
      if (introStep === titles.length + 1) delay = 1500; 
      const timeout = setTimeout(() => {
        setIntroStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (introStep === titles.length + 3) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("skipIntro", "1");
      }
    }
  }, [introStep, titles.length]);

  // Lens flare sweep for logo
  const [flare, setFlare] = useState(false);
  useEffect(() => {
    if (introStep === titles.length + 1) {
      setFlare(true);
      const t = setTimeout(() => setFlare(false), 1200);
      return () => clearTimeout(t);
    }
  }, [introStep, titles.length]);

  return (
    <div className="flex flex-col items-center justify-center text-white font-['Roboto'] relative overflow-hidden">
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* Cinematic letterbox bars */}
      <AnimatePresence>
        {introStep < titles.length + 2 && (
          <>
            {/* Cinematic bars: top and bottom, each covers 50vh, slide out to reveal center */}
            <motion.div
              key="letterbox-top"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: -500, transition: { duration: 1.1, ease: "circInOut" } }}
              transition={{ duration: 1.1, delay: 0.1, ease: "circInOut" }}
              className="fixed top-0 left-0 w-full h-1/2 bg-black z-[60] shadow-lg"
              style={{ height: '50vh' }}
            />
            <motion.div
              key="letterbox-bottom"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: 500, transition: { duration: 1.1, ease: "circInOut" } }}
              transition={{ duration: 1.1, delay: 0.1, ease: "circInOut" }}
              className="fixed bottom-0 left-0 w-full h-1/2 bg-black z-[60] shadow-lg"
              style={{ height: '50vh' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Black intro overlay (z-[70] to ensure above banners) */}
      <AnimatePresence>
        {introStep < titles.length + 2 && (
          <motion.div
            key="intro-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-transparent"
          >
            {/* Titles */}
            {introStep > 0 && introStep <= titles.length && (
              <motion.h2
                key={titles[introStep - 1]}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-black tracking-widest text-blue-200 font-['Montserrat'] text-center drop-shadow-2xl"
              >
                {titles[introStep - 1]}
              </motion.h2>
            )}

            {/* Logo */}
            {introStep === titles.length + 1 && (
              <motion.div
                key="logo-reveal"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center relative"
              >
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  className="w-[36rem] h-[36rem] md:w-[36rem] md:h-[36rem] object-contain drop-shadow-2xl"
                  draggable={false}
                  style={{ userSelect: 'none' }}
                  width={576}
                  height={576}
                  priority
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page content */}
      <AnimatePresence>
        {introStep > titles.length + 1 && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "linear" }}
            className="flex flex-col items-center justify-start w-full pt-8 md:pt-2"
          >
            <header
              className="w-full flex flex-col items-center justify-start font-['Inter']"
              role="banner"
            >
              <div className="flex flex-1 items-start justify-center w-full h-full">
                <div className="w-full max-w-[900px] h-[600px] md:max-w-screen md:h-screen md:overflow-y-hidden flex items-center justify-center">
                  {/* <LanyardModel /> */}
                  <Lanyard position={[0, 0, 20]} gravity={[0, -20, 0]} />
                </div>
              </div>
            </header>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
