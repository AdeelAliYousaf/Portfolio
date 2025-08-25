"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// const Prism = dynamic(() => import("./Backgrounds/Prism/Prism"), { ssr: false });
const Prism = dynamic(() => import("./Backgrounds/Prism/Prism"), { ssr: false });
const Plasma = dynamic(() => import("./Backgrounds/Space/Plasma"), { ssr: false });

export default function BackgroundGradient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      {isMobile ? (
        <Plasma
          color="#ff6b35"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={true}
        />
      ) : (
        <Prism
          height={3.5}
          baseWidth={5.5}
          animationType="rotate"
          glow={1}
          offset={{ x: 0, y: 0 }}
          noise={0.5}
          transparent={true}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          hoverStrength={2}
          inertia={0.05}
          bloom={1}
          suspendWhenOffscreen={false}
          timeScale={0.5}
        />
      )}
    </div>
  );
}
