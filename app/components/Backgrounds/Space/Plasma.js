'use client';

import { useRef, useEffect } from 'react';

const RealisticSpaceScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;

    // Physics constants
    const GRAVITY = 0.05;
    const AIR_RESISTANCE = 0.998;
    const EARTH_SURFACE_Y = height + 200;

    // Utility functions
    function getStarColor() {
      const colors = ['#ffffff', '#ffe9c4', '#d4f1f9', '#fff4ea', '#f8f7ff'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getNebulColor() {
      const colors = ['#4a0e4e', '#1a237e', '#0d47a1', '#004d40', '#1b5e20'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Background stars
    let backgroundStars = [];
    const STAR_COUNT = Math.floor(width * height / 8000);

    function initializeStars() {
      backgroundStars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        backgroundStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          brightness: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: getStarColor()
        });
      }
    }

    // Nebula clouds
    let nebulaClouds = [];
    const NEBULA_COUNT = 8;

    function initializeNebula() {
      nebulaClouds = [];
      for (let i = 0; i < NEBULA_COUNT; i++) {
        nebulaClouds.push({
          x: Math.random() * width * 1.5 - width * 0.25,
          y: Math.random() * height * 1.5 - height * 0.25,
          size: Math.random() * 400 + 200,
          opacity: Math.random() * 0.03 + 0.01,
          color: getNebulColor(),
          drift: {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1
          }
        });
      }
    }

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initializeStars();
      initializeNebula();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Enhanced meteor config
    const METEOR_RATE = 0.008;
    const SPORADIC_RATE = 0.003;
    let meteors = [];

    function getMeteorColor() {
      const colors = [
        '#ffffff', // Iron
        '#ffaa00', // Sodium
        '#00ff88', // Magnesium
        '#ff4444', // Lithium
        '#8844ff', // Calcium
        '#ffff44'  // Mixed
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function spawnMeteor(isRadiant = false) {
      let x, y, velocity;
      
      if (isRadiant) {
        // Radiant meteors (appear to come from a point - like Perseus meteor shower)
        const radiantX = width * 0.2;
        const radiantY = height * 0.1;
        const distance = Math.random() * 400 + 200;
        const angle = Math.random() * Math.PI / 3 + Math.PI / 6;
        
        x = radiantX - Math.cos(angle) * distance;
        y = radiantY - Math.sin(angle) * distance;
        velocity = {
          x: Math.cos(angle) * (Math.random() * 8 + 15),
          y: Math.sin(angle) * (Math.random() * 8 + 15)
        };
      } else {
        // Sporadic meteors (random directions)
        const side = Math.floor(Math.random() * 3);
        switch(side) {
          case 0: // top
            x = Math.random() * width;
            y = -50;
            velocity = {
              x: (Math.random() - 0.5) * 20,
              y: Math.random() * 15 + 10
            };
            break;
          case 1: // left
            x = -50;
            y = Math.random() * height * 0.5;
            velocity = {
              x: Math.random() * 15 + 8,
              y: Math.random() * 10 + 5
            };
            break;
          case 2: // right
            x = width + 50;
            y = Math.random() * height * 0.5;
            velocity = {
              x: -(Math.random() * 15 + 8),
              y: Math.random() * 10 + 5
            };
            break;
        }
      }

      const mass = Math.random() * 0.8 + 0.5;
      const size = mass * 2;
      
      meteors.push({
        x, y, velocity,
        mass,
        size,
        brightness: Math.random() * 0.8 + 0.6,
        color: getMeteorColor(),
        trail: [],
        maxTrailLength: Math.floor(mass * 30 + 20),
        age: 0,
        burning: true,
        burnIntensity: Math.random() * 0.5 + 0.5,
        sparkles: []
      });
    }

    function updateMeteors() {
      meteors.forEach((meteor, index) => {
        // Physics
        meteor.velocity.y += GRAVITY;
        meteor.velocity.x *= AIR_RESISTANCE;
        meteor.velocity.y *= AIR_RESISTANCE;
        
        meteor.x += meteor.velocity.x;
        meteor.y += meteor.velocity.y;
        meteor.age++;

        // Atmospheric heating effect
        const speed = Math.sqrt(meteor.velocity.x ** 2 + meteor.velocity.y ** 2);
        meteor.burnIntensity = Math.min(speed / 20, 1.5);
        
        // Add sparkles for realistic fragmentation
        if (Math.random() < 0.3 && meteor.burning) {
          meteor.sparkles.push({
            x: meteor.x + (Math.random() - 0.5) * 10,
            y: meteor.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: Math.random() * 20 + 10,
            maxLife: Math.random() * 20 + 10
          });
        }

        // Update sparkles
        meteor.sparkles = meteor.sparkles.filter(sparkle => {
          sparkle.x += sparkle.vx;
          sparkle.y += sparkle.vy;
          sparkle.vy += 0.1; // mini gravity
          sparkle.life--;
          return sparkle.life > 0;
        });

        // Trail
        meteor.trail.push({
          x: meteor.x,
          y: meteor.y,
          brightness: meteor.brightness * meteor.burnIntensity
        });
        
        if (meteor.trail.length > meteor.maxTrailLength) {
          meteor.trail.shift();
        }

        // Fade out as it gets lower in atmosphere or moves off screen
        if (meteor.y > height * 0.8) {
          meteor.brightness *= 0.95;
        }
      });

      // Remove dead meteors
      meteors = meteors.filter(meteor => 
        meteor.brightness > 0.01 && 
        meteor.x > -200 && meteor.x < width + 200 &&
        meteor.y > -200 && meteor.y < EARTH_SURFACE_Y
      );
    }

    function drawBackgroundStars() {
      backgroundStars.forEach(star => {
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size * 2;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Cross pattern for brighter stars
        if (star.brightness > 0.7) {
          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
        }
        
        ctx.restore();
      });
    }

    function drawNebula() {
      nebulaClouds.forEach(cloud => {
        cloud.x += cloud.drift.x;
        cloud.y += cloud.drift.y;
        
        // Wrap around screen
        if (cloud.x > width + cloud.size) cloud.x = -cloud.size;
        if (cloud.x < -cloud.size) cloud.x = width + cloud.size;
        if (cloud.y > height + cloud.size) cloud.y = -cloud.size;
        if (cloud.y < -cloud.size) cloud.y = height + cloud.size;
        
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.size
        );
        
        gradient.addColorStop(0, `${cloud.color}${Math.floor(cloud.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${cloud.color}${Math.floor(cloud.opacity * 127).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${cloud.color}00`);
        
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawMeteors() {
      meteors.forEach(meteor => {
        // Draw trail
        if (meteor.trail.length > 1) {
          for (let i = 0; i < meteor.trail.length - 1; i++) {
            const segment1 = meteor.trail[i];
            const segment2 = meteor.trail[i + 1];
            const progress = i / meteor.trail.length;
            const alpha = (1 - progress) * segment1.brightness * 0.8;
            const width = meteor.size * (1 - progress * 0.7);
            
            if (alpha > 0.01) {
              ctx.save();
              ctx.globalAlpha = alpha;
              ctx.strokeStyle = meteor.color;
              ctx.lineWidth = width;
              ctx.shadowColor = meteor.color;
              ctx.shadowBlur = width * 2;
              ctx.lineCap = 'round';
              
              ctx.beginPath();
              ctx.moveTo(segment1.x, segment1.y);
              ctx.lineTo(segment2.x, segment2.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Draw sparkles
        meteor.sparkles.forEach(sparkle => {
          const alpha = sparkle.life / sparkle.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha * 0.8;
          ctx.fillStyle = meteor.color;
          ctx.shadowColor = meteor.color;
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.arc(sparkle.x, sparkle.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw meteor head
        if (meteor.burning && meteor.brightness > 0) {
          ctx.save();
          ctx.globalAlpha = meteor.brightness;
          
          // Outer glow
          const gradient = ctx.createRadialGradient(
            meteor.x, meteor.y, 0,
            meteor.x, meteor.y, meteor.size * 4
          );
          gradient.addColorStop(0, meteor.color);
          gradient.addColorStop(0.3, `${meteor.color}80`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, meteor.size * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = meteor.color;
          ctx.shadowBlur = meteor.size * 2;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, meteor.size * meteor.burnIntensity, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      });
    }

    function animate() {
      // Clear canvas
      ctx.fillStyle = 'rgb(5, 5, 15)'; // Very dark blue-black space
      ctx.fillRect(0, 0, width, height);

      // Draw space elements in order
      drawNebula();
      drawBackgroundStars();
      
      // Spawn meteors
      if (Math.random() < METEOR_RATE) {
        spawnMeteor(true); // Radiant meteor
      }
      if (Math.random() < SPORADIC_RATE) {
        spawnMeteor(false); // Sporadic meteor
      }

      updateMeteors();
      drawMeteors();

      animationId = requestAnimationFrame(animate);
    }

    // Initialize everything
    initializeStars();
    initializeNebula();
    animate();

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 block"
      style={{ 
        pointerEvents: 'none', 
        background: 'rgb(5, 5, 15)',
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};

export default RealisticSpaceScene;