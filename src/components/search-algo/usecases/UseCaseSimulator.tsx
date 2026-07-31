'use client';

import React from 'react';
import styles from '../search-algo.module.css';
import { Cpu, Terminal, MapPin, Database, GitCommit, Layers, Search, Radio, LineChart } from 'lucide-react';

interface UseCaseSimulatorProps {
    algorithmId: string;
    title: string;
    description: string;
}

export function UseCaseSimulator({ algorithmId, title, description }: UseCaseSimulatorProps) {
    const getIcon = () => {
        switch (algorithmId) {
            case 'linear-search':
                return <Terminal size={20} color="#00ff75" />;
            case 'binary-search':
                return <GitCommit size={20} color="#00ff75" />;
            case 'jump-search':
                return <Database size={20} color="#00ff75" />;
            case 'interpolation-search':
                return <Search size={20} color="#00ff75" />;
            case 'exponential-search':
                return <Radio size={20} color="#00ff75" />;
            case 'ternary-search':
                return <LineChart size={20} color="#00ff75" />;
            case 'breadth-first-search':
                return <Layers size={20} color="#00ff75" />;
            case 'depth-first-search':
                return <Cpu size={20} color="#00ff75" />;
            case 'dijkstra-search':
            case 'astar-search':
                return <MapPin size={20} color="#00ff75" />;
            default:
                return <Terminal size={20} color="#00ff75" />;
        }
    };

    return (
        <div className={styles.useCaseSection}>
            <div className={styles.useCaseTitle}>
                {getIcon()}
                Real-World Industry Use Case: {title}
            </div>
            <div className={styles.useCaseDescription}>
                {description}
            </div>
        </div>
    );
}
