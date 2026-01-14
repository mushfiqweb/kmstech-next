'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../explainers.module.css';

export function HandshakePhase() {
    const [step, setStep] = useState(0);

    const steps = [
        { label: 'Initial State', client: 'Disconnected', server: 'Listening' },
        { label: 'SYN', client: 'SYN Sent', server: 'Listening' },
        { label: 'SYN-ACK', client: 'Wait', server: 'SYN Received, ACK Sent' },
        { label: 'ACK', client: 'Established', server: 'Established' },
    ];

    const handleNext = () => {
        setStep((prev) => (prev + 1) % steps.length);
    };

    return (
        <div className={styles.container}>
            <div className={styles.flexBetween}>
                <h3 className={styles.heading} style={{ marginBottom: 0 }}>TCP 3-Way Handshake</h3>
                <button
                    onClick={handleNext}
                    className={styles.button}
                    style={{ backgroundColor: '#2563eb' }}
                >
                    Next Step ({step + 1}/4)
                </button>
            </div>

            <div className={styles.visualAreaLarge}>
                <div className={styles.handshakeContainer} style={{ width: '100%' }}>
                    {/* Client Node */}
                    <div className={styles.node}>
                        <div className={`${styles.nodeCircle} ${step === 3 ? styles.nodeActive : ''}`}>
                            Client
                        </div>
                        <span className={styles.nodeLabel}>{steps[step].client}</span>
                    </div>

                    {/* Connection Lines */}
                    <div className={styles.connectionArea}>
                        {/* SYN Line */}
                        {step >= 1 && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '100%', opacity: step === 1 ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.packetLine} ${styles.packetLineSyn}`}
                            >
                                <span className={styles.packetLabel} style={{ color: '#60a5fa' }}>SYN</span>
                                <motion.div style={{ position: 'absolute', right: 0, top: '-1.5px', width: 0, height: 0, borderLeft: '8px solid #3b82f6', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                            </motion.div>
                        )}

                        {/* SYN-ACK Line */}
                        {step >= 2 && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '100%', opacity: step === 2 ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.packetLine} ${styles.packetLineSynAck}`}
                                style={{ transformOrigin: 'right', display: 'flex', flexDirection: 'row-reverse' }}
                            >
                                <span className={styles.packetLabel} style={{ color: '#fbbf24' }}>SYN-ACK</span>
                                <motion.div style={{ position: 'absolute', left: 0, top: '-1.5px', width: 0, height: 0, borderRight: '8px solid #f59e0b', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                            </motion.div>
                        )}

                        {/* ACK Line */}
                        {step >= 3 && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '100%', opacity: step === 3 ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.packetLine} ${styles.packetLineAck}`}
                            >
                                <span className={styles.packetLabel} style={{ color: '#34d399' }}>ACK</span>
                                <motion.div style={{ position: 'absolute', right: 0, top: '-1.5px', width: 0, height: 0, borderLeft: '8px solid #10b981', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                            </motion.div>
                        )}
                    </div>

                    {/* Server Node */}
                    <div className={styles.node}>
                        <div className={`${styles.nodeCircle} ${step === 3 ? styles.nodeActive : ''}`}>
                            Server
                        </div>
                        <span className={styles.nodeLabel}>{steps[step].server}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
