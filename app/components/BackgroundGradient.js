"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
// const Prism = dynamic(() => import("./Backgrounds/Prism/Prism"), { ssr: false });
import Plasma from "./Backgrounds/Plasma/Plasma";
const Space = dynamic(() => import("./Backgrounds/Space/Plasma"), { ssr: false });

export default function BackgroundGradient({ enableVideo = true }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isIOSDevice);
    };
    
    checkMobile();
    checkIOS();
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

  // Enhanced iOS video handling
  useEffect(() => {
    if (!isMobile || !enableVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // Force iOS video properties
    const setupVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      if (isIOS) {
        video.autoplay = false;
        video.controls = false;
        video.setAttribute('preload', 'metadata');
      }
    };

    setupVideo();

    const forcePlay = async () => {
      try {
        setupVideo(); // Re-setup before every play attempt
        
        // Multiple play strategies for iOS
        if (isIOS) {
          // Strategy 1: Direct play
          await video.play();
        } else {
          // For Android, simple play
          await video.play();
        }
        
        setUserInteracted(true);
        console.log('Video playing successfully');
      } catch (error) {
        console.warn('Video play attempt failed:', error.message);
        
        // Strategy 2: Try loading and playing again (iOS fallback)
        if (isIOS && !userInteracted) {
          try {
            video.load();
            await new Promise(resolve => setTimeout(resolve, 100));
            await video.play();
            setUserInteracted(true);
            console.log('Video playing after reload');
          } catch (retryError) {
            console.warn('Video retry failed:', retryError.message);
          }
        }
      }
    };

    // Auto-play when enableVideo becomes true (intro button was clicked)
    const tryAutoPlay = async () => {
      if (enableVideo) {
        console.log('Intro completed, attempting video autoplay');
        await forcePlay();
      }
    };

    // Immediate attempt when effect runs
    tryAutoPlay();

    if (isIOS) {
      // For iOS: Multiple interaction events - allow attempts when intro button is pressed
      const iosPlayHandler = async (event) => {
        if (event.isTrusted && enableVideo) {
          await forcePlay();
        }
      };

      // Listen to multiple event types for iOS
      const events = ['touchstart', 'touchend', 'click', 'tap'];
      events.forEach(eventType => {
        document.addEventListener(eventType, iosPlayHandler, { 
          passive: true, 
          once: false // Allow multiple attempts
        });
      });

      // Also try when video metadata is loaded and intro is complete
      const onLoadedMetadata = async () => {
        if (enableVideo) {
          await forcePlay();
        }
      };
      video.addEventListener('loadedmetadata', onLoadedMetadata);

      return () => {
        events.forEach(eventType => {
          document.removeEventListener(eventType, iosPlayHandler);
        });
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    } else {
      // For Android: Play when ready
      const androidPlayHandler = () => forcePlay();
      video.addEventListener('canplay', androidPlayHandler);
      
      // Try playing immediately
      if (video.readyState >= 2) {
        forcePlay();
      }

      return () => {
        video.removeEventListener('canplay', androidPlayHandler);
      };
    }
  }, [isMobile, enableVideo, isIOS]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      {isMobile ? (
        <div className="relative w-full h-full overflow-hidden">
          {/* Fallback gradient - shows while video loads or if video fails */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded && enableVideo ? 'opacity-0' : 'opacity-100'}`}></div>
          
          {enableVideo && (
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded && (userInteracted || !isIOS) ? 'opacity-100' : 'opacity-0'}`}
              style={{
                filter: 'brightness(0.7) contrast(1.2) saturate(1.1)',
              }}
            >
              <source src="/flame.mp4" type="video/mp4" />
            </video>
          )}
          


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
