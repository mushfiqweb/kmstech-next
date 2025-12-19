'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

export const TopQuote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const quoteLines = [
    "God, His angels and all those in heavens and on earth,",
    "even ants in their hills and fish in the water,",
    "call down blessings on those who instruct others in beneficial knowledge."
  ];

  const attribution = "~ (Holy Prophet, The Merciful SAW)";

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = lineRefs.current.filter(Boolean);
    const glows = glowRefs.current.filter(Boolean);

    // Initial state for entrance animation
    gsap.set(lines, {
      opacity: 0,
      y: 30,
      willChange: "transform, opacity"
    });

    // Initial state for glow pulse (starts invisible)
    gsap.set(glows, {
      opacity: 0,
      willChange: "opacity"
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Entrance Animation (Moves the whole line container)
    tl.to(lines, {
      duration: 1.5,
      y: 0,
      opacity: 1,
      stagger: 0.4,
    });

    // Subtle floating movement for the container
    gsap.to(containerRef.current, {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      willChange: "transform"
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(lines);
      gsap.killTweensOf(glows);
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  const addToLineRefs = (el: HTMLDivElement | null) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  const addToGlowRefs = (el: HTMLParagraphElement | null) => {
    if (el && !glowRefs.current.includes(el)) {
      glowRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="top-quote-container">
      {quoteLines.map((text, index) => (
        <div key={index} ref={addToLineRefs} className="quote-line-wrapper" style={{ position: 'relative' }}>
          {/* Base Layer - Always visible, low glow */}
          <p className="top-quote-text base-layer">
            {index === 0 && <RiDoubleQuotesL style={{ marginRight: '6px', verticalAlign: 'top' }} />}
            {text}
            {index === quoteLines.length - 1 && <RiDoubleQuotesR style={{ marginLeft: '6px', verticalAlign: 'top' }} />}
          </p>

          {/* Glow Layer - Animates opacity, high glow */}
          <p ref={addToGlowRefs} className="top-quote-text glow-layer" aria-hidden="true">
            {index === 0 && <RiDoubleQuotesL style={{ marginRight: '6px', verticalAlign: 'top' }} />}
            {text}
            {index === quoteLines.length - 1 && <RiDoubleQuotesR style={{ marginLeft: '6px', verticalAlign: 'top' }} />}
          </p>
        </div>
      ))}

      <div ref={addToLineRefs} className="quote-line-wrapper" style={{ position: 'relative', textAlign: 'right', marginTop: '4px' }}>
        <p className="top-quote-text attribution base-layer">{attribution}</p>
        <p ref={addToGlowRefs} className="top-quote-text attribution glow-layer" aria-hidden="true">{attribution}</p>
      </div>
    </div>
  );
};
