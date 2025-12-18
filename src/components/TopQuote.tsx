'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TopQuote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const texts = textRefs.current.filter(Boolean);

    // Initial state (handled by CSS primarily, but enforcing here ensures consistency)
    gsap.set(texts, { 
      opacity: 0, 
      y: 30 
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Entrance Animation
    tl.to(texts, {
      duration: 1.5,
      y: 0,
      opacity: 1,
      stagger: 0.4,
    });

    // 2. Continuous Pulse Animation (The "Glow" breathing effect)
    gsap.to(texts, {
      textShadow: `
        0 0 5px #11ff90ff,
        0 0 10px #21b90dff,
        0 0 20px #ffaa00,
        0 0 30px #ff5500,
        0 0 45px #ff0000
      `,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(texts);
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="top-quote-container">
        <p ref={addToRefs} className="top-quote-text">God, His angels and all those in heavens and on earth,</p>
        <p ref={addToRefs} className="top-quote-text">even ants in their hills and fish in the water,</p>
        <p ref={addToRefs} className="top-quote-text">call down blessings on those who instruct others in beneficial knowledge.</p>
        <p ref={addToRefs} className="top-quote-text attribution" style={{ textAlign: 'right', marginTop: '4px' }}>~ (Holy Prophet, The Merciful SAW)</p>
    </div>
  );
};
