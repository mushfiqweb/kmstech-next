'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../explainers.module.css';

export function RoutingPhase() {
    const [packetSent, setPacketSent] = useState(false);

    const routers = [
        { id: 'start', x: 10, y: 50, label: 'You' },
        { id: 'r1', x: 30, y: 20, label: 'ISP' },
        { id: 'r2', x: 50, y: 70, label: 'IXP' },
        { id: 'r3', x: 70, y: 30, label: 'Backbone' },
        { id: 'end', x: 90, y: 50, label: 'Server' },
    ];

    const paths = [
        { start: 'start', end: 'r1' },
        { start: 'r1', end: 'r2' },
        { start: 'r2', end: 'r3' },
        { start: 'r3', end: 'end' },
        // Alternate paths for visual complexity
        { start: 'r1', end: 'r3' },
    ];

    const handleSend = () => {
        setPacketSent(false);
        setTimeout(() => setPacketSent(true), 100);
    };

    return (
        <div className={styles.container}>
            <div className={styles.flexBetween}>
                <h3 className={styles.heading} style={{ marginBottom: 0 }}>Packet Routing (BGP)</h3>
                <button
                    onClick={handleSend}
                    className={`${styles.button} ${styles.routingButton}`}
                >
                    Send Packet
                </button>
            </div>

            <div className={styles.visualAreaLarge} style={{ padding: '1rem', display: 'block' }}>
                {/* Draw Paths */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {paths.map((path, i) => {
                        const startNode = routers.find(r => r.id === path.start)!;
                        const endNode = routers.find(r => r.id === path.end)!;
                        return (
                            <line
                                key={i}
                                x1={`${startNode.x}%`}
                                y1={`${startNode.y}%`}
                                x2={`${endNode.x}%`}
                                y2={`${endNode.y}%`}
                                stroke="#475569"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        );
                    })}
                </svg>

                {/* Draw Nodes */}
                {routers.map((router) => (
                    <div
                        key={router.id}
                        className={styles.routerNode}
                        style={{ left: `${router.x}%`, top: `${router.y}%` }}
                    >
                        <div className={styles.routerCircle}>
                            <div className={styles.routerInner} />
                        </div>
                        <span style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>{router.label}</span>
                    </div>
                ))}

                {/* Draw Packet */}
                {packetSent && (
                    <motion.div
                        className={styles.packet}
                        initial={{ left: '10%', top: '50%' }}
                        animate={{
                            left: ['10%', '30%', '50%', '70%', '90%'],
                            top: ['50%', '20%', '70%', '30%', '50%']
                        }}
                        transition={{ duration: 2, times: [0, 0.25, 0.5, 0.75, 1], ease: 'linear' }}
                    />
                )}
            </div>
        </div>
    );
}
