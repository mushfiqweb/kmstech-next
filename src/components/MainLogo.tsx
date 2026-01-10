/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Tagline } from './Tagline';

export const MainLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<SVGElement[]>([]);

  useEffect(() => {
    const elements = elementsRef.current;
    const container = containerRef.current;

    if (!container) return;

    // Prepare elements for stroke animation
    elements.forEach(el => {
      if (el) {
        const length = (el as SVGPathElement).getTotalLength();
        el.style.strokeDasharray = length.toString();
        el.style.strokeDashoffset = length.toString();
        el.style.fillOpacity = '0';
        el.style.strokeOpacity = '1';
      }
    });

    // Animation Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial will-change to optimize rendering
    gsap.set(container, { willChange: "transform, opacity" });
    gsap.set(elements, { willChange: "stroke-dashoffset, opacity, fill-opacity, stroke-opacity" });

    tl.from(container, {
      duration: 1,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    })
      .to(elements, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: { each: 0.05, from: "start" },
        ease: "power2.inOut"
      }, "-=0.5")
      .to(elements, {
        fillOpacity: 1,
        strokeOpacity: 0,
        duration: 1,
        stagger: 0.02,
        ease: "power2.inOut"
      }, "-=1.5")
      .fromTo(container,
        { scale: 1 },
        { scale: 1.02, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 },
        "-=1.0"
      );

    // Click to replay
    const handleClick = () => tl.restart();
    container.addEventListener('click', handleClick);

    return () => {
      tl.kill();
      container.removeEventListener('click', handleClick);
    };
  }, []);

  const addToRefs = (el: SVGElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="logo-container">

      {/* "Hello World" or Text Glow above logo */}
      <div className="quote-container">
        {/* Placeholder for top text if needed */}
      </div>

      <svg
        id="Layer_2"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        data-name="Layer 2"
        viewBox="0 0 348.35 60.65"
      >
        <defs>
          <style>{`
                    .cls-1 { fill: #f80731; }
                    .cls-2 { fill: #0ace8e; }
                    .cls-3 { fill: #fff; }
                    .cls-4 { fill: #fcc302; }
                `}</style>
        </defs>
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="logo-content">
            <g>
              <polygon ref={addToRefs as any} className="cls-2 anim-element" points="25.31 1.69 .6 27.76 .6 1.69 25.31 1.69" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M0,29.26V1.09h26.71L0,29.26ZM1.2,2.29v23.96L23.91,2.29H1.2Z" />
              <polygon ref={addToRefs as any} className="cls-2 anim-element" points="8.09 37.01 25.94 58.92 .6 58.92 .6 44.82 8.09 37.01" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M27.21,59.52H0v-14.94l8.13-8.47,19.08,23.41ZM1.2,58.32h23.48l-16.63-20.4-6.85,7.14v13.26Z" />
              <polygon ref={addToRefs as any} className="cls-2 anim-element" points="41 3.14 41 58.92 16.55 28.01 41 1.69 41 3.14" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M41.6,60.65L15.76,27.97,41.6.16v60.48ZM17.34,28.04l23.06,29.16V3.22l-23.06,24.82Z" />
              <polygon ref={addToRefs as any} className="cls-1 anim-element" points="90.27 58.92 51.62 58.92 51.62 26.17 67.96 53.02 70.9 57.84 73.78 53.02 90.19 25.45 90.27 58.92" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M90.88,59.52h-39.85V24.03l19.88,32.64,19.88-33.4.09,36.24ZM71.31,58.32h18.36l-.08-30.7-18.28,30.7ZM52.22,58.32h18.27l-3.05-4.99-15.23-25.02v30.01Z" />
              <polygon ref={addToRefs as any} className="cls-1 anim-element" points="50.19 3.14 91.63 3.14 71.08 37.81 50.19 3.14" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M71.08,38.97L49.13,2.54h43.55l-21.6,36.44ZM51.25,3.74l19.82,32.9L90.58,3.74h-39.32Z" />
              <path ref={addToRefs as any} className="cls-4 anim-element" d="M133.29,43.54c0,3.44-3.1,5.98-10.75,5.98-.42,0-.84-.01-1.26-.03h-.01c-.19,0-.45-.03-.75-.06-.17-.01-.38-.03-.59-.04-2.5-.2-4.99-.72-7.35-1.49-.39-.13-.79-.26-1.18-.4-1.75-.61-3.54-1.41-5.22-2.45-.23-.14-.45-.27-.66-.42-1.7-1.14-3.28-2.54-4.55-4.26v-18.82c2.02,18.27,32.33,11.91,32.33,22Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M122.53,50.11c-.41,0-.82-.01-1.24-.03-.21,0-.43-.02-.7-.05h-.14c-.16-.03-.36-.04-.57-.06-2.51-.2-5.03-.71-7.49-1.51l-.24-.08c-.32-.11-.65-.21-.96-.33-1.91-.66-3.71-1.51-5.33-2.51l-.2-.12c-.16-.1-.32-.2-.48-.31-1.9-1.27-3.47-2.75-4.7-4.4l-.12-.16v-19.02l1.2-.07c1.11,10,11.01,12.3,19.74,14.33,6.76,1.57,12.59,2.92,12.59,7.73,0,2.46-1.47,6.58-11.35,6.58ZM101.56,40.16c1.12,1.48,2.56,2.81,4.28,3.96.15.1.29.19.45.28l.2.13c1.54.95,3.26,1.76,5.1,2.4.32.12.63.22.94.32l.24.08c2.37.77,4.8,1.26,7.21,1.46.21.01.42.03.59.04h.15c.22.04.41.06.55.06.47.02.87.03-1.27.03,6.55,0,10.15-1.91,10.15-5.38,0-3.86-5.41-5.11-11.67-6.56-7.33-1.7-16.18-3.76-19.46-10.91v14.1Z" />
              <path ref={addToRefs as any} className="cls-4 anim-element" d="M124.37,2.18c-14.81,0-22.46,6.88-23.41,15.52V2.18h23.41Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M101.55,17.77l-1.2-.07V1.58h24.01v1.2c-13.25,0-21.78,5.6-22.81,14.98ZM101.56,2.78v10.33c1.9-4.4,6-8.4,13.01-10.33h-13.01Z" />
              <path ref={addToRefs as any} className="cls-4 anim-element" d="M113.74,18.52c0-3.44,3.1-5.98,10.75-5.98.42,0,.84.01,1.26.03h.01c.19,0,.45.03.75.06.17.01.38.03.59.04,2.5.2,4.99.72,7.35,1.49.39.13.79.26,1.18.4,1.75.61,3.54,1.41,5.22,2.45.23.14.45.27.66.42,1.7-1.14,3.28-2.54,4.55,4.26v18.82c-2.02-18.27-32.33-11.91-32.33-22Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M145.47,40.58c-1.11-10-11-12.3-19.74-14.33-6.76-1.57-12.59-2.92-12.59-7.73,0-2.46,1.48-6.58,11.35-6.58.41,0,.82.01,1.23.03.21,0,.44.02.7.05l.72.06c2.51.2,5.02.71,7.49,1.51l.24.08c.32.11.65.21.96.33,1.92.67,3.71,1.51,5.33,2.51l.2.13c.16.1.32.2.48.3,1.9,1.27,3.48,2.75,4.7,4.4l.12.16v19.02l-1.2.07ZM124.49,13.15c-6.55,0-10.15,1.91-10.15,5.38,0,3.86,5.41,5.11,11.67,6.56,7.33,1.7,16.18,3.76,19.46,10.91v-14.1c-1.12-1.48-2.56-2.81-4.28-3.96-.15-.1-.29-.19-.44-.28l-.2-.13c-1.54-.95-3.26-1.75-5.1-2.4-.31-.12-.63-.22-.94-.32l-.24-.08c-2.38-.77-4.8-1.26-7.21-1.46-.21-.01-.42-.03-.59-.04h-.15c-.22-.04-.41-.06-.55-.06-.47-.02-.87-.03-1.27-.03Z" />
              <path ref={addToRefs as any} className="cls-4 anim-element" d="M122.66,59.87c14.81,0,22.46-6.88,23.41-15.52v15.52h-23.41Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M146.67,60.47h-24.01v-1.2c13.25,0,21.78-5.6,22.81-14.98l1.2.07v16.12ZM132.46,59.27h13.01v-10.33c-1.9,4.4-6,8.4-13.01,10.33Z" />
            </g>
            <g>
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M162.13,3.4v7.06h46.92V3.4h-46.92ZM181.58,18.02v42.1h8.02V18.02h-8.02Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M250.95,41.24c.08-.72.16-1.7.16-2.36,0-13.2-8.84-22.11-21.23-22.11s-21.56,9.15-21.56,21.87,9.24,21.96,23.1,21.96c7.12,0,13.05-2.44,16.93-6.98l-4.29-5.02c-3.16,3.49-7.37,5.19-12.4,5.19-8.51,0-14.58-5.03-15.55-12.56h19.97v-5.6h-19.97c.8-7.28,6.32-12.31,13.77-12.31s12.96,5.11,13.77,12.31v5.6h7.29Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M280.6,16.78c-4.01,0-7.68.84-10.84,2.37l4.71,5.57h.01c1.82-.74,3.86-1.13,6.04-1.13,4.7,0,8.91,1.94,11.67,6.15l5.92-3.81c-3.41-5.99-9.81-9.15-17.51-9.15ZM292.19,47.64c-2.75,4.21-6.97,6.16-11.67,6.16-8.43,0-14.75-5.83-14.75-15.16,0-3.65,1.01-6.79,2.76-9.23l-4.92-5.81c-3.6,3.81-5.71,9.02-5.71,15.04,0,12.8,9.48,21.96,22.69,21.96,7.7,0,14.1-3.25,17.51-9.24l-5.92-3.73Z" />
              <path ref={addToRefs as any} className="cls-3 anim-element" d="M340.57,60.13h7.78v-9.41h-7.78v9.41ZM330.53,16.78c-6.56,0-11.91,2.34-15.14,6.48V0h-7.78v60.13h7.78v-22.12c0-9.32,5.35-14.26,13.6-14.26,7.37,0,11.59,4.13,11.59,12.56v6.83h7.78v-7.73c0-12.64-7.37-18.63-17.83-18.63Z" />
            </g>
          </g>
        </g>
      </svg>

      <Tagline text="Sacred Intention Leads to Perfection" />
    </div>
  );
};
