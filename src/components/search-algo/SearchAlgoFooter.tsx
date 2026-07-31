'use client';

import React, { useState, useEffect } from 'react';
import styles from './search-algo.module.css';
import { ArrowUp } from 'lucide-react';

export function SearchAlgoFooter() {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.stickyFooter}>
            <div className={styles.footerInner}>
                <div className={styles.footerExpandedContent}>
                    <div className={styles.footerBrandText}>
                        <span style={{ fontSize: '0.65rem', color: '#aaa', fontFamily: 'var(--font-geist-mono)' }}>
                            &copy; KMS Tech {currentYear} • Trade License: TRAD/DNCC/131256/2022 • {currentTime}
                        </span>
                    </div>

                    <div>
                        <button className={styles.backToTopBtn} onClick={scrollToTop}>
                            <ArrowUp size={10} />
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
