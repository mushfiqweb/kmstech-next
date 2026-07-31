'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../search-algo.module.css';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface Step {
    currentIndex: number;
    low?: number;
    high?: number;
    mid?: number;
    mid1?: number;
    mid2?: number;
    found: boolean;
    description: string;
    visitedIndices: number[];
}

interface ArraySearchVisualizerProps {
    algorithmId: string;
    initialData: number[];
}

export function ArraySearchVisualizer({ algorithmId, initialData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }: ArraySearchVisualizerProps) {
    const [target, setTarget] = useState<number>(55);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(600); // Ms per step
    const [steps, setSteps] = useState<Step[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);

    // Ensure sorted array for algorithms that require sorted input
    const safeData = Array.isArray(initialData) && initialData.length > 0 ? initialData : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const isSortedAlgo = ['binary-search', 'jump-search', 'interpolation-search', 'exponential-search', 'ternary-search'].includes(algorithmId);
    const arrayData = isSortedAlgo ? [...safeData].sort((a, b) => a - b) : safeData;

    // Generate algorithm execution steps
    useEffect(() => {
        const generatedSteps: Step[] = [];
        const arr = arrayData;

        if (algorithmId === 'linear-search') {
            const visited: number[] = [];
            let found = false;
            for (let i = 0; i < arr.length; i++) {
                visited.push(i);
                if (arr[i] === target) {
                    generatedSteps.push({
                        currentIndex: i,
                        found: true,
                        description: `Target ${target} found at index ${i}!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                } else {
                    generatedSteps.push({
                        currentIndex: i,
                        found: false,
                        description: `Checking index ${i} (value ${arr[i]}). Not target.`,
                        visitedIndices: [...visited],
                    });
                }
            }
            if (!found) {
                generatedSteps.push({
                    currentIndex: -1,
                    found: false,
                    description: `Target ${target} not found in array.`,
                    visitedIndices: [...visited],
                });
            }
        } else if (algorithmId === 'binary-search') {
            let low = 0;
            let high = arr.length - 1;
            const visited: number[] = [];
            let found = false;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                visited.push(mid);

                if (arr[mid] === target) {
                    generatedSteps.push({
                        currentIndex: mid,
                        low,
                        high,
                        mid,
                        found: true,
                        description: `Target ${target} found at mid index ${mid}!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                } else if (arr[mid] < target) {
                    generatedSteps.push({
                        currentIndex: mid,
                        low,
                        high,
                        mid,
                        found: false,
                        description: `${arr[mid]} < ${target}. Searching right half [${mid + 1} ... ${high}].`,
                        visitedIndices: [...visited],
                    });
                    low = mid + 1;
                } else {
                    generatedSteps.push({
                        currentIndex: mid,
                        low,
                        high,
                        mid,
                        found: false,
                        description: `${arr[mid]} > ${target}. Searching left half [${low} ... ${mid - 1}].`,
                        visitedIndices: [...visited],
                    });
                    high = mid - 1;
                }
            }
            if (!found) {
                generatedSteps.push({
                    currentIndex: -1,
                    low,
                    high,
                    found: false,
                    description: `Target ${target} not found in binary search range.`,
                    visitedIndices: [...visited],
                });
            }
        } else if (algorithmId === 'jump-search') {
            const n = arr.length;
            const stepSize = Math.floor(Math.sqrt(n));
            let prev = 0;
            let curr = stepSize;
            const visited: number[] = [];
            let found = false;

            while (curr < n && arr[curr] < target) {
                visited.push(curr);
                generatedSteps.push({
                    currentIndex: curr,
                    low: prev,
                    high: curr,
                    found: false,
                    description: `Jumping block: arr[${curr}] = ${arr[curr]} < ${target}. Next block...`,
                    visitedIndices: [...visited],
                });
                prev = curr;
                curr += stepSize;
            }

            for (let i = prev; i <= Math.min(curr, n - 1); i++) {
                visited.push(i);
                if (arr[i] === target) {
                    generatedSteps.push({
                        currentIndex: i,
                        low: prev,
                        high: curr,
                        found: true,
                        description: `Target ${target} found during linear block scan at index ${i}!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                } else {
                    generatedSteps.push({
                        currentIndex: i,
                        low: prev,
                        high: curr,
                        found: false,
                        description: `Linear checking block index ${i} (${arr[i]})...`,
                        visitedIndices: [...visited],
                    });
                }
            }
            if (!found) {
                generatedSteps.push({
                    currentIndex: -1,
                    found: false,
                    description: `Target ${target} not found in array.`,
                    visitedIndices: [...visited],
                });
            }
        } else if (algorithmId === 'interpolation-search') {
            let low = 0;
            let high = arr.length - 1;
            const visited: number[] = [];
            let found = false;

            while (low <= high && target >= arr[low] && target <= arr[high]) {
                if (low === high) {
                    if (arr[low] === target) {
                        generatedSteps.push({
                            currentIndex: low,
                            low,
                            high,
                            found: true,
                            description: `Target ${target} found at index ${low}!`,
                            visitedIndices: [...visited, low],
                        });
                        found = true;
                    }
                    break;
                }

                const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
                visited.push(pos);

                if (arr[pos] === target) {
                    generatedSteps.push({
                        currentIndex: pos,
                        low,
                        high,
                        mid: pos,
                        found: true,
                        description: `Proportional formula estimated pos=${pos} (val=${arr[pos]}). Target found!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                } else if (arr[pos] < target) {
                    generatedSteps.push({
                        currentIndex: pos,
                        low,
                        high,
                        mid: pos,
                        found: false,
                        description: `Formula pos=${pos} (${arr[pos]}) < ${target}. Searching range [${pos + 1} ... ${high}].`,
                        visitedIndices: [...visited],
                    });
                    low = pos + 1;
                } else {
                    generatedSteps.push({
                        currentIndex: pos,
                        low,
                        high,
                        mid: pos,
                        found: false,
                        description: `Formula pos=${pos} (${arr[pos]}) > ${target}. Searching range [${low} ... ${pos - 1}].`,
                        visitedIndices: [...visited],
                    });
                    high = pos - 1;
                }
            }
            if (!found) {
                generatedSteps.push({
                    currentIndex: -1,
                    found: false,
                    description: `Target ${target} not found in array.`,
                    visitedIndices: [...visited],
                });
            }
        } else if (algorithmId === 'exponential-search') {
            const n = arr.length;
            const visited: number[] = [];

            if (arr[0] === target) {
                generatedSteps.push({
                    currentIndex: 0,
                    found: true,
                    description: `Target ${target} found at index 0!`,
                    visitedIndices: [0],
                });
            } else {
                let bound = 1;
                visited.push(0);
                while (bound < n && arr[bound] <= target) {
                    visited.push(bound);
                    generatedSteps.push({
                        currentIndex: bound,
                        low: Math.floor(bound / 2),
                        high: Math.min(bound, n - 1),
                        found: false,
                        description: `Exponential range check: bound=${bound} (val=${arr[bound]}). Doubling bound...`,
                        visitedIndices: [...visited],
                    });
                    bound *= 2;
                }

                const low = Math.floor(bound / 2);
                const high = Math.min(bound, n - 1);

                // Binary search in bounded range
                let l = low;
                let h = high;
                let foundInBinary = false;
                while (l <= h) {
                    const mid = Math.floor((l + h) / 2);
                    visited.push(mid);
                    if (arr[mid] === target) {
                        generatedSteps.push({
                            currentIndex: mid,
                            low: l,
                            high: h,
                            mid,
                            found: true,
                            description: `Bounded Binary Search found target ${target} at index ${mid}!`,
                            visitedIndices: [...visited],
                        });
                        foundInBinary = true;
                        break;
                    } else if (arr[mid] < target) {
                        generatedSteps.push({
                            currentIndex: mid,
                            low: l,
                            high: h,
                            mid,
                            found: false,
                            description: `Bounded Binary Search mid ${arr[mid]} < ${target}. Range [${mid + 1} ... ${h}].`,
                            visitedIndices: [...visited],
                        });
                        l = mid + 1;
                    } else {
                        generatedSteps.push({
                            currentIndex: mid,
                            low: l,
                            high: h,
                            mid,
                            found: false,
                            description: `Bounded Binary Search mid ${arr[mid]} > ${target}. Range [${l} ... ${mid - 1}].`,
                            visitedIndices: [...visited],
                        });
                        h = mid - 1;
                    }
                }
                if (!foundInBinary) {
                    generatedSteps.push({
                        currentIndex: -1,
                        found: false,
                        description: `Target ${target} not found.`,
                        visitedIndices: [...visited],
                    });
                }
            }
        } else if (algorithmId === 'ternary-search') {
            let l = 0;
            let r = arr.length - 1;
            const visited: number[] = [];
            let found = false;

            while (l <= r) {
                const mid1 = l + Math.floor((r - l) / 3);
                const mid2 = r - Math.floor((r - l) / 3);
                visited.push(mid1, mid2);

                if (arr[mid1] === target) {
                    generatedSteps.push({
                        currentIndex: mid1,
                        low: l,
                        high: r,
                        mid1,
                        mid2,
                        found: true,
                        description: `Target ${target} found at mid1 index ${mid1}!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                }
                if (arr[mid2] === target) {
                    generatedSteps.push({
                        currentIndex: mid2,
                        low: l,
                        high: r,
                        mid1,
                        mid2,
                        found: true,
                        description: `Target ${target} found at mid2 index ${mid2}!`,
                        visitedIndices: [...visited],
                    });
                    found = true;
                    break;
                }

                if (target < arr[mid1]) {
                    generatedSteps.push({
                        currentIndex: mid1,
                        low: l,
                        high: r,
                        mid1,
                        mid2,
                        found: false,
                        description: `${target} < ${arr[mid1]}. Target in 1st third [${l} ... ${mid1 - 1}].`,
                        visitedIndices: [...visited],
                    });
                    r = mid1 - 1;
                } else if (target > arr[mid2]) {
                    generatedSteps.push({
                        currentIndex: mid2,
                        low: l,
                        high: r,
                        mid1,
                        mid2,
                        found: false,
                        description: `${target} > ${arr[mid2]}. Target in 3rd third [${mid2 + 1} ... ${r}].`,
                        visitedIndices: [...visited],
                    });
                    l = mid2 + 1;
                } else {
                    generatedSteps.push({
                        currentIndex: Math.floor((mid1 + mid2) / 2),
                        low: l,
                        high: r,
                        mid1,
                        mid2,
                        found: false,
                        description: `${target} between mid1 & mid2. Target in 2nd third [${mid1 + 1} ... ${mid2 - 1}].`,
                        visitedIndices: [...visited],
                    });
                    l = mid1 + 1;
                    r = mid2 - 1;
                }
            }
            if (!found) {
                generatedSteps.push({
                    currentIndex: -1,
                    found: false,
                    description: `Target ${target} not found.`,
                    visitedIndices: [...visited],
                });
            }
        }

        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }, [algorithmId, target, initialData]);

    // Handle auto play loop
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setTimeout(() => {
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex((prev) => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, speed);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentStepIndex, steps.length, speed]);

    // Trigger GSAP micro-animation on node pulse
    const activeStep = steps[currentStepIndex] || {
        currentIndex: -1,
        found: false,
        description: 'Ready to search.',
        visitedIndices: [],
    };

    useEffect(() => {
        if (stageRef.current && activeStep.currentIndex >= 0) {
            const activeNode = stageRef.current.querySelector(`#node-${activeStep.currentIndex}`);
            if (activeNode) {
                gsap.fromTo(
                    activeNode,
                    { scale: 0.9 },
                    { scale: 1.1, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }
                );
            }
        }
    }, [currentStepIndex, activeStep.currentIndex]);

    const handleStepForward = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
    };

    const maxValue = Math.max(...arrayData);

    return (
        <div className={styles.visualizerWidget}>
            <div className={styles.visualizerTitle}>
                Interactive Array Visualizer ({arrayData.length} Elements)
            </div>

            {/* Array Bar Stage */}
            <div className={styles.arrayStage} ref={stageRef}>
                {arrayData.map((val, idx) => {
                    const isCurrent = activeStep.currentIndex === idx;
                    const isLow = activeStep.low === idx;
                    const isHigh = activeStep.high === idx;
                    const isMid = activeStep.mid === idx || activeStep.mid1 === idx || activeStep.mid2 === idx;
                    const isVisited = activeStep.visitedIndices.includes(idx);
                    const isFound = activeStep.found && isCurrent;

                    let bgColor = '#1e293b'; // Default dark
                    let borderColor = 'transparent';

                    if (isFound) {
                        bgColor = '#00ff75';
                        borderColor = '#ffffff';
                    } else if (isCurrent) {
                        bgColor = '#a855f7';
                    } else if (isMid) {
                        bgColor = '#eab308';
                    } else if (isLow) {
                        bgColor = '#3b82f6';
                    } else if (isHigh) {
                        bgColor = '#ef4444';
                    } else if (isVisited) {
                        bgColor = '#334155';
                    }

                    const heightPercent = Math.max(30, (val / maxValue) * 100);

                    return (
                        <div key={idx} id={`node-${idx}`} className={styles.arrayNode}>
                            {/* Pointer Label */}
                            {isFound && <span className={`${styles.nodePointer} ${styles.pointerCurrent}`}>FOUND</span>}
                            {!isFound && isCurrent && <span className={`${styles.nodePointer} ${styles.pointerCurrent}`}>CURR</span>}
                            {!isFound && !isCurrent && isMid && <span className={`${styles.nodePointer} ${styles.pointerMid}`}>MID</span>}
                            {!isFound && !isCurrent && !isMid && isLow && <span className={`${styles.nodePointer} ${styles.pointerLow}`}>LOW</span>}
                            {!isFound && !isCurrent && !isMid && !isLow && isHigh && <span className={`${styles.nodePointer} ${styles.pointerHigh}`}>HIGH</span>}

                            <div
                                className={styles.nodeBar}
                                style={{
                                    height: `${heightPercent}px`,
                                    backgroundColor: bgColor,
                                    borderColor,
                                    color: isFound ? '#000000' : '#ffffff',
                                }}
                            >
                                {val}
                            </div>
                            <span className={styles.nodeIndex}>[{idx}]</span>
                        </div>
                    );
                })}
            </div>

            {/* Status Bar */}
            <div className={styles.statusText}>
                💡 {activeStep.description}
            </div>

            {/* Controls Bar */}
            <div className={styles.controlPanel}>
                <div className={styles.controlButtons}>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={handleStepForward}
                        disabled={isPlaying || currentStepIndex >= steps.length - 1}
                    >
                        <SkipForward size={16} />
                        Next Step
                    </button>
                    <button className={styles.ctrlBtn} onClick={handleReset}>
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Target Value:</span>
                    <input
                        type="number"
                        className={styles.targetInput}
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Speed:</span>
                    <select
                        className={styles.targetInput}
                        style={{ width: '80px' }}
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    >
                        <option value={1000}>0.5x</option>
                        <option value={600}>1.0x</option>
                        <option value={300}>2.0x</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
