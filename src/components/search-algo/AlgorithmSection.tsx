'use client';

import React from 'react';
import styles from './search-algo.module.css';
import { SearchAlgorithm } from './algorithmsData';
import { ArraySearchVisualizer } from './visualizers/ArraySearchVisualizer';
import { GraphSearchVisualizer } from './visualizers/GraphSearchVisualizer';
import { PathfindingVisualizer } from './visualizers/PathfindingVisualizer';
import { StringSearchVisualizer } from './visualizers/StringSearchVisualizer';
import { HashTableVisualizer } from './visualizers/HashTableVisualizer';
import { UseCaseSimulator } from './usecases/UseCaseSimulator';

export function AlgorithmSection({ algo }: { algo: SearchAlgorithm }) {
    const renderVisualizer = () => {
        if (algo.category === 'Array') {
            return (
                <ArraySearchVisualizer
                    algorithmId={algo.id}
                    initialData={algo.initialData || [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                />
            );
        } else if (algo.category === 'Graph') {
            return <GraphSearchVisualizer algorithmId={algo.id} />;
        } else if (algo.category === 'Pathfinding') {
            return <PathfindingVisualizer algorithmId={algo.id} />;
        } else if (algo.category === 'String') {
            return <StringSearchVisualizer algorithmId={algo.id} />;
        } else if (algo.category === 'HashTable') {
            return <HashTableVisualizer />;
        }
        return null;
    };

    return (
        <section id={algo.id} className={styles.algorithmCard}>
            <div className={styles.algoHeader}>
                <div className={styles.algoTitleGroup}>
                    <div className={styles.algoName}>
                        {algo.name}
                        <span className={styles.algoCategoryBadge}>{algo.group}</span>
                    </div>
                </div>

                <div className={styles.complexityGrid}>
                    <div className={styles.complexityBadge}>
                        <span className={styles.complexityLabel}>Best Time</span>
                        <span className={styles.complexityValue}>{algo.timeBest}</span>
                    </div>
                    <div className={styles.complexityBadge}>
                        <span className={styles.complexityLabel}>Worst Time</span>
                        <span className={styles.complexityValue}>{algo.timeWorst}</span>
                    </div>
                    <div className={styles.complexityBadge}>
                        <span className={styles.complexityLabel}>Space</span>
                        <span className={styles.complexityValue}>{algo.spaceComplexity}</span>
                    </div>
                </div>
            </div>

            {/* Concept Brief */}
            <div className={styles.conceptBrief}>
                📖 <strong>Core Concept:</strong> {algo.concept}
            </div>

            {/* Interactive Visualizer Canvas */}
            {renderVisualizer()}

            {/* Real World Use Case Simulation */}
            <UseCaseSimulator
                algorithmId={algo.id}
                title={algo.useCaseTitle}
                description={algo.useCaseDescription}
            />
        </section>
    );
}
