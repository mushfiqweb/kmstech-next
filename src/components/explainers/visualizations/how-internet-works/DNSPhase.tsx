'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../explainers.module.css';

export function DNSPhase() {
    const [url, setUrl] = useState('');
    const [ip, setIp] = useState<string | null>(null);
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        if (!url) return;
        setSearching(true);
        setIp(null);

        // Simulate DNS lookup
        setTimeout(() => {
            setIp(`142.250.182.${Math.floor(Math.random() * 255)}`);
            setSearching(false);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>DNS Resolution Simulator</h3>
            <p className={styles.subHeading}>Type a domain name to see how it resolves into an API address.</p>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="google.com"
                    className={styles.input}
                />
                <button
                    onClick={handleSearch}
                    disabled={searching}
                    className={styles.button}
                >
                    {searching ? 'Resolving...' : 'Lookup'}
                </button>
            </div>

            <div className={styles.visualArea}>
                {!searching && !ip && <span style={{ color: '#64748b' }}>Waiting for input...</span>}

                {searching && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className={styles.spinner}
                        />
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{ position: 'absolute', marginTop: '5rem', color: '#34d399', fontSize: '0.875rem' }}
                        >
                            Querying Recursive Resolver...
                        </motion.div>
                    </div>
                )}

                {ip && !searching && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={styles.resolvedText}
                    >
                        <div className={styles.resolvedLabel}>Resolved IP Address</div>
                        <div className={styles.resolvedValue}>{ip}</div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
