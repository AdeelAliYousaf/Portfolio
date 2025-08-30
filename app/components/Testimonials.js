"use client";

import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const TestimonialCard = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[100vw] sm:w-[500px] md:w-[380px] lg:w-[400px] bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center backdrop-blur-md transition-all duration-300 transform scale-95 hover:scale-100 mx-2">
    <Image
      src={testimonial.image || `https://placehold.co/100x100/36454F/ffffff?text=${encodeURIComponent(testimonial.name)}`}
      alt={testimonial.name}
      width={64}
      height={64}
      className="w-16 h-16 rounded-full object-cover border-2 border-white/30 mb-4 shadow-inner"
      unoptimized={testimonial.image?.startsWith('http')}
    />
    <Quote className="w-8 h-8 text-white/50 mb-3" />
  <p className="text-sm sm:text-base text-white/90 font-light italic mb-4">&quot;{testimonial.content}&quot;</p>
    <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
    {testimonial.company && <p className="text-white/60 text-xs">{testimonial.company}</p>}
  </div>
);

const TestimonialSlide = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sheikh Ayaz Mehmood",
      company: "Top In World Leather",
      image: "https://topinworldleather.com/Logo.png",
      content: "Adeel delivered exceptional results that exceeded our expectations. The communication was excellent and they understood our needs perfectly.",
    },
    {
      id: 2,
      name: "Kamil Rauf",
      company: "Veritas Edge Global",
      image: "https://veritasedgeglobal.com/Logo.png",
      content: "Working with Adeel was a game-changer for our business. The attention to detail and creative solutions provided were invaluable.",
    },
  ];

  const extendedSlides = [...testimonials, ...testimonials]; 
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 0.7;

  useEffect(() => {
    let lastPosition = 0;

    const animateScroll = () => {
      if (sliderRef.current) {
        const slideWidth = sliderRef.current.scrollWidth / 2;
        lastPosition -= scrollSpeed;

        if (lastPosition <= -slideWidth) {
          lastPosition = 0;
        }
        
        sliderRef.current.style.transform = `translateX(${lastPosition}px)`;
        animationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="relative w-full px-4 py-16 overflow-hidden text-white">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
        What My Clients Say
      </h2>
      <div className="relative flex items-center justify-center">
        <div className="flex overflow-hidden relative w-full">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none lg:hidden"></div>
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none lg:hidden"></div>
          <div
            ref={sliderRef}
            className="flex items-center will-change-transform"
          >
            {extendedSlides.map((t, idx) => (
              <TestimonialCard key={idx} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlide;
