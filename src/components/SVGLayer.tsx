'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const SVGLayer = () => {
  const spotlightRef = useRef<SVGRectElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    // Mouse movement logic for spotlight
    const handleMove = (x: number, y: number) => {
      if (spotlightRef.current) {
        const xPercent = (x / window.innerWidth) * 100;
        const yPercent = (y / window.innerHeight) * 100;
        
        gsap.to(spotlightRef.current, {
          attr: { cx: `${xPercent}%`, cy: `${yPercent}%`, fx: `${xPercent}%`, fy: `${yPercent}%` },
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Turbulence animation
    if (turbulenceRef.current) {
      gsap.to(turbulenceRef.current, {
        attr: { baseFrequency: "0.66" },
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <svg id="bg-svg-layer" preserveAspectRatio="none">
      <defs>
        <filter id="grunge-texture">
          <feTurbulence 
            ref={turbulenceRef}
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="4" 
            stitchTiles="stitch"
            result="noise" 
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" in="noise" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
          <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
        </filter>

        <linearGradient id="main-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d4a25" />
          <stop offset="45%" stopColor="#0a0a0a" />
          <stop offset="55%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#6b1010" />
        </linearGradient>

        <radialGradient id="mouse-light" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <pattern id="sword-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g transform="translate(30, 30) rotate(45)">
            <rect x="-2" y="-15" width="4" height="10" fill="rgba(255,255,255,0.15)" />
            <rect x="-8" y="-5" width="16" height="2" fill="rgba(255,255,255,0.15)" />
            <path d="M -3 -3 L 3 -3 L 0 20 Z" fill="rgba(255,255,255,0.15)" />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#main-gradient)" />
      <rect x="0" y="50%" width="100%" height="50%" fill="url(#sword-pattern)" opacity="0.1" style={{mixBlendMode: 'overlay'}} />
      <rect 
        id="spotlight" 
        ref={spotlightRef}
        width="100%" 
        height="100%" 
        fill="url(#mouse-light)" 
        style={{mixBlendMode: 'screen'}} 
        opacity="1.0" 
      />
      <rect width="100%" height="100%" filter="url(#grunge-texture)" opacity="0.7" style={{mixBlendMode: 'overlay'}} />
    </svg>
  );
};
