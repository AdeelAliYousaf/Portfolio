"use client";
import { Home, GraduationCap, BadgeCheck, FolderKanban, Handshake, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Function to play navigation voice
const playNavigationVoice = (voicePath) => {
  if (voicePath) {
    try {
      const audio = new Audio(voicePath);
      audio.volume = 0.7; // Adjust volume as needed
      audio.play().catch((error) => {
        console.warn('Voice playback failed:', error);
      });
    } catch (error) {
      console.warn('Voice audio creation failed:', error);
    }
  }
};

const menuItems = [
  { name: "Home", icon: Home, href: "/", voice: null }, // No voice file for home
  { name: "Education", icon: GraduationCap, href: "/education", voice: "/Voices/EducationVoice.mp3" },
  { name: "Certifications", icon: BadgeCheck, href: "/certification", voice: "/Voices/CertificationVoice.mp3" },
  { name: "Download CV", icon: Download, href: "/AdeelAliYousafResume2025.pdf", download: true, voice: "/ThankYou.mp3" }, // Keep existing Thank You
  { name: "Projects", icon: FolderKanban, href: "/project", voice: "/Voices/ProjectsVoice.mp3" },
  { name: "Services", icon: Handshake, href: "/service", voice: "/Voices/SolutionVoice.mp3" },
  { name: "Contact me", icon: Mail, href: "/contact", voice: "/Voices/ContactVoice.mp3" },
];

export function BottomMenu() {
  const pathname = usePathname();
  const active = menuItems.findIndex((item) => item.href === pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const flameAudioRef = useRef(null);

  // Handle menu open/close with audio
  const handleMenuToggle = (open) => {
    setIsMenuOpen(open);
  };

  // Ensure audio stops when menu closes by any means
  useEffect(() => {
  }, [isMenuOpen]);
  
  return (
    <div className="fixed bottom-4 left-0 right-0 max-h-[4.4rem] px-2 rounded-t-2xl shadow-2xl z-50 md:hidden w-full max-w-full flex justify-center">
      <AnimatePresence mode="wait">
        {!isMenuOpen ? (
          <motion.button
            key="menu-button"
            onClick={() => handleMenuToggle(true)}
            initial={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] liquid-glass-bottom"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <Menu size={20} className="text-white/80" />
            <span className="text-white/80 text-sm font-medium">Navigations</span>
          </motion.button>
        ) : (
          <motion.div
            key="menu-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative"
          >
            <ul
              className="flex items-center justify-center py-1 px-2 rounded-full border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative liquid-glass-bottom overflow-visible"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(60px) saturate(180%)', WebkitBackdropFilter: 'blur(60px) saturate(180%)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)' }}>
              {menuItems.map((menu, i) => (
                <motion.li 
                  key={i} 
                  className="w-12 flex items-center justify-center relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                >
                  {active === i && (
                    <motion.span
                      layoutId="bottommenu-active-bg"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full z-0 liquid-glass-pill"
                      style={{
                        background: 'linear-gradient(135deg, rgba(100,150,255,0.4), rgba(80,120,255,0.3))',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), 0 4px 12px rgba(100,150,255,0.4)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  {menu.download ? (
                    <button
                      className="w-full h-14 flex items-center justify-center z-10"
                      onClick={() => {
                        playNavigationVoice(menu.voice);
                        const link = document.createElement('a');
                        link.href = menu.href;
                        link.download = '';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      aria-label={menu.name}
                      type="button"
                    >
                      <motion.span
                        className={`text-xl cursor-pointer duration-300 flex items-center justify-center rounded-full ${active === i ? "text-white" : "text-white/50"}`}
                        style={{ width: 36, height: 36 }}
                        animate={active === i ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <menu.icon size={20} />
                        <span className="sr-only">Download CV</span>
                      </motion.span>
                    </button>
                  ) : (
                    <Link 
                      href={menu.href} 
                      className="w-full h-14 flex items-center justify-center z-10"
                      onClick={() => playNavigationVoice(menu.voice)}
                    >
                      <motion.span
                        className={`text-xl cursor-pointer duration-300 flex items-center justify-center rounded-full ${active === i ? "text-white" : "text-white/50"}`}
                        style={{ width: 36, height: 36 }}
                        animate={active === i ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <menu.icon size={20} />
                      </motion.span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SidebarMenu() {
  const pathname = usePathname();
  const active = menuItems.findIndex((item) => item.href === pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const flameAudioRef = useRef(null);

  // Initialize audio

  // Handle menu open/close with audio
  const handleMenuToggle = (open) => {
    setIsMenuOpen(open);
  };

  
  return (
    <div className="hidden md:fixed md:left-6 md:top-6 md:bottom-6 md:flex md:flex-col md:items-center md:justify-center z-50">
      {/* Menu Button - Shows when menu is closed */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={() => handleMenuToggle(true)}
              className="flex flex-col items-center gap-1 p-4 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] liquid-glass-sidebar"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              <Menu size={20} className="text-white/80" />
              <span className="text-white/80 text-xs font-medium">Menu</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Menu - Shows when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside 
            initial={{ height: 80, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-3xl py-30 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-2 w-20 overflow-hidden liquid-glass-sidebar relative" 
            style={{background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(60px) saturate(180%)', WebkitBackdropFilter: 'blur(60px) saturate(180%)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)'}}>
            
            <ul className="flex flex-col items-center justify-center grow w-full h-full relative gap-12 py-4">
              {menuItems.map((menu, i) => (
                <motion.li 
                  key={menu.name} 
                  className="w-full flex items-center justify-center relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  {active === i && (
                    <motion.span
                      layoutId="sidebar-active-bg"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full z-0 liquid-glass-pill"
                      style={{
                        background: 'linear-gradient(135deg, rgba(100,150,255,0.4), rgba(80,120,255,0.3))',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), 0 4px 12px rgba(100,150,255,0.4)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  {menu.download ? (
                    <button
                      className="w-12 h-12 flex items-center justify-center z-10"
                      onClick={() => {
                        playNavigationVoice(menu.voice);
                        const link = document.createElement('a');
                        link.href = menu.href;
                        link.download = '';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      aria-label={menu.name}
                      type="button"
                    >
                      <motion.span
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${active === i ? "text-white" : "text-gray-500"}`}
                        animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        {menu.icon && <menu.icon size={24} />}
                        <span className="sr-only">Download CV</span>
                      </motion.span>
                    </button>
                  ) : (
                    <Link 
                      href={menu.href} 
                      className="w-12 h-12 flex items-center justify-center z-10"
                      onClick={() => playNavigationVoice(menu.voice)}
                    >
                      <motion.span
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${active === i ? "text-white" : "text-gray-500"}`}
                        animate={active === i ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        {menu.icon && <menu.icon size={24} />}
                      </motion.span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function LiquidGlassStyles() {
  return (
    <style jsx global>{`
      .liquid-glass-bottom, .liquid-glass-sidebar {
        position: relative;
        overflow: hidden;
      }
      
      .liquid-glass-bottom::before,
      .liquid-glass-sidebar::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        background: conic-gradient(from 0deg at 50% 50%, 
          rgba(255,255,255,0.4) 0deg, 
          rgba(255,255,255,0.1) 90deg, 
          rgba(255,255,255,0.6) 180deg, 
          rgba(255,255,255,0.05) 270deg, 
          rgba(255,255,255,0.4) 360deg);
        border-radius: inherit;
        z-index: -1;
        animation: liquidRotate 6s linear infinite, liquidPulse 3s ease-in-out infinite alternate;
      }
      
      .liquid-glass-bottom::after,
      .liquid-glass-sidebar::after {
        content: '';
        position: absolute;
        inset: 0;
        background: 
          radial-gradient(ellipse 200% 100% at 30% 10%, rgba(255,255,255,0.3) 0%, transparent 40%),
          radial-gradient(ellipse 150% 80% at 70% 90%, rgba(255,255,255,0.2) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, rgba(255,255,255,0.08) 100%);
        border-radius: inherit;
        pointer-events: none;
        animation: liquidWave 4s ease-in-out infinite, liquidFlow 8s ease-in-out infinite;
      }
      
      @keyframes liquidRotate {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      @keyframes liquidPulse {
        0% { opacity: 0.6; }
        100% { opacity: 0.9; }
      }
      
      @keyframes liquidWave {
        0%, 100% { 
          background: 
            radial-gradient(ellipse 200% 100% at 30% 10%, rgba(255,255,255,0.3) 0%, transparent 40%),
            radial-gradient(ellipse 150% 80% at 70% 90%, rgba(255,255,255,0.2) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, rgba(255,255,255,0.08) 100%);
        }
        25% { 
          background: 
            radial-gradient(ellipse 180% 120% at 60% 20%, rgba(255,255,255,0.35) 0%, transparent 45%),
            radial-gradient(ellipse 130% 90% at 40% 80%, rgba(255,255,255,0.25) 0%, transparent 55%),
            linear-gradient(45deg, rgba(255,255,255,0.12) 0%, transparent 25%, rgba(255,255,255,0.06) 100%);
        }
        50% { 
          background: 
            radial-gradient(ellipse 220% 90% at 80% 30%, rgba(255,255,255,0.28) 0%, transparent 50%),
            radial-gradient(ellipse 160% 70% at 20% 70%, rgba(255,255,255,0.18) 0%, transparent 45%),
            linear-gradient(225deg, rgba(255,255,255,0.08) 0%, transparent 35%, rgba(255,255,255,0.1) 100%);
        }
        75% { 
          background: 
            radial-gradient(ellipse 170% 110% at 20% 40%, rgba(255,255,255,0.32) 0%, transparent 42%),
            radial-gradient(ellipse 140% 85% at 80% 60%, rgba(255,255,255,0.22) 0%, transparent 48%),
            linear-gradient(315deg, rgba(255,255,255,0.11) 0%, transparent 28%, rgba(255,255,255,0.07) 100%);
        }
      }
      
      @keyframes liquidFlow {
        0%, 100% { transform: translateX(0) translateY(0) scale(1); }
        25% { transform: translateX(2px) translateY(-1px) scale(1.02); }
        50% { transform: translateX(-1px) translateY(1px) scale(0.98); }
        75% { transform: translateX(-2px) translateY(-1px) scale(1.01); }
      }
      
      .liquid-glass-pill {
        backdrop-filter: blur(30px) saturate(180%) brightness(110%);
        -webkit-backdrop-filter: blur(30px) saturate(180%) brightness(110%);
        position: relative;
        overflow: hidden;
      }
      
      .liquid-glass-pill::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, 
          rgba(255,255,255,0.3) 0%, 
          transparent 30%, 
          rgba(255,255,255,0.2) 70%, 
          transparent 100%);
        border-radius: inherit;
        animation: liquidPillShine 2s ease-in-out infinite;
      }
      
      @keyframes liquidPillShine {
        0%, 100% { 
          background: linear-gradient(45deg, 
            rgba(255,255,255,0.3) 0%, 
            transparent 30%, 
            rgba(255,255,255,0.2) 70%, 
            transparent 100%);
          transform: translateX(-20px);
        }
        50% { 
          background: linear-gradient(135deg, 
            rgba(255,255,255,0.4) 0%, 
            transparent 25%, 
            rgba(255,255,255,0.3) 65%, 
            transparent 100%);
          transform: translateX(20px);
        }
      }
    `}</style>
  );
}

// Export the styles component for use in layout
export { LiquidGlassStyles };