'use client';

import React, { useState, useEffect } from 'react';
import styles from '../search-algo.module.css';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface StringSearchVisualizerProps {
    algorithmId: string;
}

interface Step {
    textIndex: number;
    patternIndex: number;
    matchCount: number;
    isMatch: boolean | null;
    status: string;
}

export function StringSearchVisualizer({ algorithmId }: StringSearchVisualizerProps) {
    const [text, setText] = useState<string>('ABABDABACDABABCABAB');
    const [pattern, setPattern] = useState<string>('ABABCABAB');
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(600);

    useEffect(() => {
        generateSteps(text, pattern, algorithmId);
    }, [text, pattern, algorithmId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStepIndex < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStepIndex((prev) => prev + 1);
            }, speed);
        } else if (currentStepIndex >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStepIndex, steps.length, speed]);

    const generateSteps = (t: string, p: string, algo: string) => {
        const generatedSteps: Step[] = [];
        if (!t || !p || p.length > t.length) return;

        if (algo === 'naive-string-search') {
            for (let i = 0; i <= t.length - p.length; i++) {
                let j = 0;
                while (j < p.length) {
                    const match = t[i + j] === p[j];
                    generatedSteps.push({
                        textIndex: i + j,
                        patternIndex: j,
                        matchCount: j,
                        isMatch: match,
                        status: match
                            ? `Comparing text['${t[i + j]}'] with pattern['${p[j]}']: Match!`
                            : `Mismatch at text['${t[i + j]}'] vs pattern['${p[j]}']. Shift pattern to right.`,
                    });
                    if (!match) break;
                    j++;
                }
                if (j === p.length) {
                    generatedSteps.push({
                        textIndex: i,
                        patternIndex: j - 1,
                        matchCount: j,
                        isMatch: true,
                        status: `🎉 Full pattern match found starting at text index ${i}!`,
                    });
                }
            }
        } else {
            // KMP Search logic
            const lps: number[] = new Array(p.length).fill(0);
            let len = 0;
            let i = 1;
            while (i < p.length) {
                if (p[i] === p[len]) {
                    len++;
                    lps[i] = len;
                    i++;
                } else {
                    if (len !== 0) {
                        len = lps[len - 1];
                    } else {
                        lps[i] = 0;
                        i++;
                    }
                }
            }

            let ti = 0;
            let pi = 0;
            while (ti < t.length) {
                const match = t[ti] === p[pi];
                generatedSteps.push({
                    textIndex: ti,
                    patternIndex: pi,
                    matchCount: pi,
                    isMatch: match,
                    status: match
                        ? `KMP Compare text[${ti}] ('${t[ti]}') == pattern[${pi}] ('${p[pi]}')`
                        : `KMP Mismatch at text[${ti}]. Use LPS table to skip unnecessary checks.`,
                });

                if (match) {
                    ti++;
                    pi++;
                }
                if (pi === p.length) {
                    generatedSteps.push({
                        textIndex: ti - pi,
                        patternIndex: pi - 1,
                        matchCount: pi,
                        isMatch: true,
                        status: `🎉 KMP Found Pattern match at index ${ti - pi}!`,
                    });
                    pi = lps[pi - 1];
                } else if (ti < t.length && t[ti] !== p[pi]) {
                    if (pi !== 0) {
                        pi = lps[pi - 1];
                    } else {
                        ti++;
                    }
                }
            }
        }

        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    const currentStep = steps[currentStepIndex] || {
        textIndex: 0,
        patternIndex: 0,
        matchCount: 0,
        isMatch: null,
        status: 'Ready',
    };

    return (
        <div className={styles.visualizerWidget}>
            <div className={styles.visualizerTitle}>
                String Search Simulator ({algorithmId === 'kmp-string-search' ? 'KMP Algorithm' : 'Naive Algorithm'})
            </div>

            {/* String Render Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#00ff75', width: '70px', fontWeight: 'bold' }}>TEXT:</span>
                    {text.split('').map((char, idx) => {
                        const isCurrent = idx === currentStep.textIndex;
                        return (
                            <div
                                key={idx}
                                style={{
                                    width: '28px',
                                    height: '34px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    background: isCurrent
                                        ? currentStep.isMatch
                                            ? '#00ff75'
                                            : '#ef4444'
                                        : 'rgba(255,255,255,0.08)',
                                    color: isCurrent ? '#000' : '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    border: isCurrent ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {char}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#3b82f6', width: '70px', fontWeight: 'bold' }}>PATTERN:</span>
                    {pattern.split('').map((char, idx) => {
                        const isCurrentPattern = idx === currentStep.patternIndex;
                        return (
                            <div
                                key={idx}
                                style={{
                                    width: '28px',
                                    height: '34px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    background: isCurrentPattern ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {char}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.statusText}>💡 {currentStep.status}</div>

            {/* Controls */}
            <div className={styles.controlPanel}>
                <div className={styles.controlButtons}>
                    <button className={styles.ctrlBtn} onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                    >
                        <SkipForward size={14} />
                        Next Step
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => {
                            setCurrentStepIndex(0);
                            setIsPlaying(false);
                        }}
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Pattern:</span>
                    <input
                        type="text"
                        className={styles.targetInput}
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value.toUpperCase())}
                    />
                </div>
            </div>
        </div>
    );
}
