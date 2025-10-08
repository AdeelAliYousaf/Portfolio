"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
// const Prism = dynamic(() => import("./Backgrounds/Prism/Prism"), { ssr: false });
import Plasma from "./Backgrounds/Plasma/Plasma";
const Space = dynamic(() => import("./Backgrounds/Space/Plasma"), { ssr: false });

export default function BackgroundGradient() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = (e) => {
    console.warn("Video failed to load:", e);
    setVideoLoaded(false);
  };

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      {isMobile ? (
        <div className="relative w-full h-full overflow-hidden">
          {/* Fallback gradient - shows while video loads or if video fails */}
          <div className={`absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-900/60 to-yellow-800/70 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
          
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              filter: 'brightness(0.7) contrast(1.2) saturate(1.1)',
            }}
          >
            <source src="/flame.mp4" type="video/mp4" />
          </video>
          
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ) : (
        // <Prism
        //   height={3.5}
        //   baseWidth={5.5}
        //   animationType="rotate"
        //   glow={1}
        //   offset={{ x: 0, y: 0 }}
        //   noise={0.5}
        //   transparent={true}
        //   scale={3.6}
        //   hueShift={0}
        //   colorFrequency={1}
        //   hoverStrength={2}
        //   inertia={0.05}
        //   bloom={1}
        //   suspendWhenOffscreen={false}
        //   timeScale={0.5}
        // />
        <Plasma
          color="#6DE3EE"
          speed={0.6}
          direction="forward"
          scale={2.1}
          opacity={0.5}
          mouseInteractive={false}
        />
      )}
    </div>
  );
}
