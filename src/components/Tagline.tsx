'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TaglineProps {
  text: string;
}

export const Tagline = ({ text }: TaglineProps) => {
  const containerRef = useRef<SVGTextElement>(null);
  
  // Split text for animation
  const chars = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    id: `char-${index}`
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const charElements = containerRef.current.querySelectorAll('.tag-char');
    
    // Set initial state
    gsap.set(charElements, { opacity: 0 });

    const tl = gsap.timeline({ delay: 3 }); // Wait for logo to finish
    tl.to(charElements, {
      opacity: 1,
      duration: 0.5,
      stagger: { each: 0.03 },
      ease: "power2.inOut"
    });

    return () => {
        tl.kill();
    };
  }, [text]);

  return (
    <svg id="tagline-svg" viewBox="0 0 800 60" role="img" aria-label={text}>
      <text 
        ref={containerRef}
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle"
      >
        {chars.map((item, i) => (
          <tspan key={i} className="tag-char">{item.char}</tspan>
        ))}
      </text>
    </svg>
  );
};
