'use client';

import React, { useState } from 'react';
import styles from '../search-algo.module.css';
import { Search, RotateCcw } from 'lucide-react';

interface HashBucket {
    index: number;
    key: string;
    value: string;
    hash: number;
    isHighlighted: boolean;
}

export function HashTableVisualizer() {
    const TABLE_SIZE = 7;
    const initialKeys = [
        { key: 'user_101', val: 'Alice Smith' },
        { key: 'user_202', val: 'Bob Johnson' },
        { key: 'user_303', val: 'Charlie Brown' },
        { key: 'user_404', val: 'Diana Prince' },
    ];

    const simpleHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash % TABLE_SIZE;
    };

    const [targetKey, setTargetKey] = useState<string>('user_202');
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>(
        'Enter a key and click Lookup to see O(1) Hash Table hashing and instant index resolution.'
    );

    const buckets: (HashBucket | null)[] = new Array(TABLE_SIZE).fill(null);
    initialKeys.forEach((item) => {
        const idx = simpleHash(item.key);
        buckets[idx] = {
            index: idx,
            key: item.key,
            value: item.val,
            hash: simpleHash(item.key),
            isHighlighted: highlightIndex === idx,
        };
    });

    const handleLookup = () => {
        if (!targetKey) return;
        const idx = simpleHash(targetKey);
        setHighlightIndex(idx);

        const bucket = buckets[idx];
        if (bucket && bucket.key === targetKey) {
            setStatusMessage(
                `⚡ Hash Function computed: hash("${targetKey}") % ${TABLE_SIZE} = Index ${idx}. Found target value: "${bucket.value}" in O(1) time!`
            );
        } else {
            setStatusMessage(
                `❌ Hash Function computed: hash("${targetKey}") % ${TABLE_SIZE} = Index ${idx}. Bucket is empty or key not found.`
            );
        }
    };

    return (
        <div className={styles.visualizerWidget}>
            <div className={styles.visualizerTitle}>Interactive Hash Table O(1) Direct Index Simulator</div>

            {/* Hash Table Bucket Stage */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '12px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '16px',
                    borderRadius: '12px',
                }}
            >
                {buckets.map((b, i) => {
                    const isTarget = highlightIndex === i;
                    return (
                        <div
                            key={i}
                            style={{
                                background: isTarget
                                    ? b
                                        ? 'rgba(0, 255, 117, 0.2)'
                                        : 'rgba(239, 68, 68, 0.2)'
                                    : 'rgba(255,255,255,0.04)',
                                border: isTarget
                                    ? b
                                        ? '2px solid #00ff75'
                                        : '2px solid #ef4444'
                                    : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 'bold' }}>Bucket [{i}]</div>
                            {b ? (
                                <div style={{ marginTop: '6px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#00ff75', fontWeight: 'bold' }}>{b.key}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#ccc' }}>{b.value}</div>
                                </div>
                            ) : (
                                <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '8px' }}>[ Empty ]</div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.statusText}>💡 {statusMessage}</div>

            {/* Controls */}
            <div className={styles.controlPanel}>
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Lookup Key:</span>
                    <input
                        type="text"
                        className={styles.targetInput}
                        value={targetKey}
                        onChange={(e) => setTargetKey(e.target.value)}
                    />
                </div>

                <div className={styles.controlButtons}>
                    <button className={styles.ctrlBtn} onClick={handleLookup}>
                        <Search size={14} />
                        Lookup Key
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => {
                            setHighlightIndex(null);
                            setStatusMessage('Reset Hash Table status.');
                        }}
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
