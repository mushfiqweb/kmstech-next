'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cookie, X, Check } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Check if user has already responded
        const consent = localStorage.getItem('kmstech_cookie_consent');
        if (!consent) {
            // Delay banner entrance slightly for eye-catching effect
            const entranceTimer = setTimeout(() => {
                setIsVisible(true);

                // Auto-close banner after 6 seconds
                timerRef.current = setTimeout(() => {
                    handleAutoClose();
                }, 6000);
            }, 1000);

            return () => {
                clearTimeout(entranceTimer);
                if (timerRef.current) clearTimeout(timerRef.current);
            };
        }
    }, []);

    const handleAutoClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('kmstech_cookie_consent', 'dismissed');
        }, 400); // Animation duration
    };

    const handleAccept = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('kmstech_cookie_consent', 'granted');
        }, 400);
    };

    const handleManualClose = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('kmstech_cookie_consent', 'dismissed');
        }, 400);
    };

    if (!isVisible) return null;

    return (
        <div
            role="region"
            aria-label="Cookie Consent Banner"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                maxWidth: '340px',
                width: 'calc(100vw - 32px)',
                background: 'rgba(2, 6, 12, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 148, 68, 0.4)',
                borderRadius: '16px',
                padding: '12px 14px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 148, 68, 0.2)',
                color: '#e0e0e0',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isClosing ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                opacity: isClosing ? 0 : 1,
            }}
        >
            {/* Glowing Accent Icon */}
            <div
                style={{
                    background: 'rgba(0, 148, 68, 0.2)',
                    border: '1px solid rgba(0, 148, 68, 0.4)',
                    borderRadius: '10px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#00ff75',
                }}
            >
                <Cookie size={18} />
            </div>

            {/* Content Text */}
            <div style={{ flex: 1, minWidth: 0, lineHeight: 1.35 }}>
                <span style={{ fontWeight: 700, color: '#ffffff', display: 'block', marginBottom: '2px' }}>
                    Cookie Preferences
                </span>
                <span style={{ color: '#a0a0a0', fontSize: '0.72rem' }}>
                    We use cookies to measure insights &amp; optimize your experience.
                </span>
            </div>

            {/* Actions: Accept & Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <button
                    onClick={handleAccept}
                    aria-label="Accept Cookies"
                    style={{
                        background: 'var(--primary-green, #009444)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        boxShadow: '0 2px 8px rgba(0, 148, 68, 0.4)',
                        transition: 'transform 0.2s ease',
                    }}
                >
                    <Check size={12} /> Got it
                </button>

                <button
                    onClick={handleManualClose}
                    aria-label="Close Cookie Banner"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#a0a0a0',
                        padding: '5px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
