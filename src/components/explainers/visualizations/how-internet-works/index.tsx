'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DNSPhase } from './DNSPhase';
import { HandshakePhase } from './HandshakePhase';
import { RoutingPhase } from './RoutingPhase';
import { RenderingPhase } from './RenderingPhase';
import styles from '../../explainers.module.css';

export function HowInternetWorksVisualization() {
    const [activeTab, setActiveTab] = useState<'dns' | 'handshake' | 'routing' | 'rendering'>('dns');

    const tabs = [
        { id: 'dns', label: '1. DNS' },
        { id: 'handshake', label: '2. Handshake' },
        { id: 'routing', label: '3. Routing' },
        { id: 'rendering', label: '4. Rendering' },
    ] as const;

    return (
        <div className={styles.orchestrator}>
            {/* Header / Tabs */}
            <div className={styles.tabList}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className={styles.tabIndicator}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className={styles.tabContent}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{ height: '100%' }}
                    >
                        {activeTab === 'dns' && <DNSPhase />}
                        {activeTab === 'handshake' && <HandshakePhase />}
                        {activeTab === 'routing' && <RoutingPhase />}
                        {activeTab === 'rendering' && <RenderingPhase />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
