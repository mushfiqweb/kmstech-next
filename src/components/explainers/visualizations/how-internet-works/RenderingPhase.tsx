'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../explainers.module.css';

export function RenderingPhase() {
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Browser Rendering</h3>

            <div className={styles.splitView}>
                {/* Code View */}
                <div className={styles.codePanel}>
                    <div className={styles['text-pink']}>&lt;div <span className={styles['text-blue']}>class</span>=<span className={styles['text-yellow']}>"card"</span>&gt;</div>
                    <div style={{ paddingLeft: '1rem' }} className={styles['text-pink']}>&lt;img <span className={styles['text-blue']}>src</span>=<span className={styles['text-yellow']}>"..."</span> /&gt;</div>
                    <div style={{ paddingLeft: '1rem' }} className={styles['text-pink']}>&lt;h1&gt;<span className={styles['text-white']}>Hello World</span>&lt;/h1&gt;</div>
                    <div style={{ paddingLeft: '1rem' }} className={styles['text-pink']}>&lt;button&gt;<span className={styles['text-white']}>Click Me</span>&lt;/button&gt;</div>
                    <div className={styles['text-pink']}>&lt;/div&gt;</div>
                    <div style={{ marginTop: '1rem' }} className={styles['text-slate']}>// CSS</div>
                    <div className={styles['text-yellow']}>.card <span className={styles['text-white']}>{`{`}</span></div>
                    <div style={{ paddingLeft: '1rem' }} className={styles['text-blue']}>background: <span className={styles['text-white']}>white;</span></div>
                    <div style={{ paddingLeft: '1rem' }} className={styles['text-blue']}>padding: <span className={styles['text-white']}>20px;</span></div>
                    <div className={styles['text-white']}>{`}`}</div>
                </div>

                {/* Arrow */}
                <div className={styles.arrowContainer}>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '2rem' }}
                    >
                        ➔
                    </motion.div>
                </div>

                {/* Rendered View */}
                <div className={styles.previewPanel}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '200px' }}
                    >
                        <div style={{ width: '100%', height: '6rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem', marginBottom: '1rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                        <h1 style={{ color: '#1e293b', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>Hello World</h1>
                        <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '0.875rem', border: 'none' }}>
                            Click Me
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
