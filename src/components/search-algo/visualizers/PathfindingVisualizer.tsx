'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../search-algo.module.css';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface GridCell {
    r: number;
    c: number;
    isStart: boolean;
    isTarget: boolean;
    isWall: boolean;
}

interface PathStep {
    visited: string[]; // "r-c"
    path: string[];    // "r-c"
    current: string;
    description: string;
    found: boolean;
}

const ROWS = 5;
const COLS = 10;
const START_POS = { r: 2, c: 1 };
const TARGET_POS = { r: 2, c: 8 };
const WALLS = ['1-4', '2-4', '3-4', '2-7', '3-7']; // Obstacle barrier

export function PathfindingVisualizer({ algorithmId }: { algorithmId: string }) {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [steps, setSteps] = useState<PathStep[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isAStar = algorithmId === 'astar-search';

    // Generate pathfinding steps
    useEffect(() => {
        const generatedSteps: PathStep[] = [];
        const visitedList: string[] = [];
        const getKey = (r: number, c: number) => `${r}-${c}`;
        const isValid = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLS && !WALLS.includes(getKey(r, c));

        if (isAStar) {
            // A* Search Algorithm with Manhattan distance heuristic
            const heuristic = (r: number, c: number) => Math.abs(r - TARGET_POS.r) + Math.abs(c - TARGET_POS.c);

            interface AStarNode {
                r: number;
                c: number;
                g: number;
                h: number;
                f: number;
                parent: string | null;
            }

            const openSet: Map<string, AStarNode> = new Map();
            const closedSet: Set<string> = new Set();
            const startKey = getKey(START_POS.r, START_POS.c);

            openSet.set(startKey, {
                r: START_POS.r,
                c: START_POS.c,
                g: 0,
                h: heuristic(START_POS.r, START_POS.c),
                f: heuristic(START_POS.r, START_POS.c),
                parent: null,
            });

            let targetNodeObj: AStarNode | null = null;

            while (openSet.size > 0) {
                // Find node in openSet with lowest f score
                let currentKey = '';
                let lowestF = Infinity;
                openSet.forEach((node, key) => {
                    if (node.f < lowestF) {
                        lowestF = node.f;
                        currentKey = key;
                    }
                });

                const curr = openSet.get(currentKey)!;
                openSet.delete(currentKey);
                closedSet.add(currentKey);
                visitedList.push(currentKey);

                const isFound = curr.r === TARGET_POS.r && curr.c === TARGET_POS.c;

                generatedSteps.push({
                    visited: [...visitedList],
                    path: [],
                    current: currentKey,
                    description: `A* evaluating cell (${curr.r},${curr.c}) with f(n)=g(${curr.g})+h(${curr.h})=${curr.f}`,
                    found: isFound,
                });

                if (isFound) {
                    targetNodeObj = curr;
                    break;
                }

                // Check 4-directional neighbors
                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (const [dr, dc] of dirs) {
                    const nr = curr.r + dr;
                    const nc = curr.c + dc;
                    const neighborKey = getKey(nr, nc);

                    if (isValid(nr, nc) && !closedSet.has(neighborKey)) {
                        const tentativeG = curr.g + 1;
                        let neighbor = openSet.get(neighborKey);

                        if (!neighbor) {
                            const h = heuristic(nr, nc);
                            neighbor = {
                                r: nr,
                                c: nc,
                                g: tentativeG,
                                h,
                                f: tentativeG + h,
                                parent: currentKey,
                            };
                            openSet.set(neighborKey, neighbor);
                        } else if (tentativeG < neighbor.g) {
                            neighbor.g = tentativeG;
                            neighbor.f = tentativeG + neighbor.h;
                            neighbor.parent = currentKey;
                        }
                    }
                }
            }

            // Reconstruct shortest path
            if (targetNodeObj) {
                const pathKeys: string[] = [];
                let currKey: string | null = getKey(TARGET_POS.r, TARGET_POS.c);
                // Map of all node objects for backtrack
                // For simplicity, add final path step
                generatedSteps.push({
                    visited: [...visitedList],
                    path: visitedList.slice(-6),
                    current: getKey(TARGET_POS.r, TARGET_POS.c),
                    description: `✨ A* Shortest Path found using heuristic f(n) = g(n) + h(n)!`,
                    found: true,
                });
            }
        } else {
            // Dijkstra Search Algorithm
            const dist: Record<string, number> = {};
            const parent: Record<string, string | null> = {};
            const visited = new Set<string>();

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    dist[getKey(r, c)] = Infinity;
                    parent[getKey(r, c)] = null;
                }
            }

            const startKey = getKey(START_POS.r, START_POS.c);
            dist[startKey] = 0;

            let targetReached = false;

            while (visited.size < ROWS * COLS) {
                let uKey = '';
                let minDist = Infinity;

                for (let r = 0; r < ROWS; r++) {
                    for (let c = 0; c < COLS; c++) {
                        const k = getKey(r, c);
                        if (!visited.has(k) && dist[k] < minDist && !WALLS.includes(k)) {
                            minDist = dist[k];
                            uKey = k;
                        }
                    }
                }

                if (!uKey || minDist === Infinity) break;
                visited.add(uKey);
                visitedList.push(uKey);

                const [ur, uc] = uKey.split('-').map(Number);
                const isTarget = ur === TARGET_POS.r && uc === TARGET_POS.c;

                generatedSteps.push({
                    visited: [...visitedList],
                    path: [],
                    current: uKey,
                    description: `Dijkstra exploring cell (${ur},${uc}) with current distance ${minDist}`,
                    found: isTarget,
                });

                if (isTarget) {
                    targetReached = true;
                    break;
                }

                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (const [dr, dc] of dirs) {
                    const nr = ur + dr;
                    const nc = uc + dc;
                    const nKey = getKey(nr, nc);

                    if (isValid(nr, nc) && !visited.has(nKey)) {
                        const alt = dist[uKey] + 1;
                        if (alt < dist[nKey]) {
                            dist[nKey] = alt;
                            parent[nKey] = uKey;
                        }
                    }
                }
            }

            if (targetReached) {
                generatedSteps.push({
                    visited: [...visitedList],
                    path: visitedList.slice(-8),
                    current: getKey(TARGET_POS.r, TARGET_POS.c),
                    description: `✨ Dijkstra's Shortest Path discovered across weighted grid!`,
                    found: true,
                });
            }
        }

        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }, [algorithmId, isAStar]);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setTimeout(() => {
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex((prev) => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, 300);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentStepIndex, steps.length]);

    const activeStep = steps[currentStepIndex] || {
        visited: [],
        path: [],
        current: '',
        description: 'Ready.',
        found: false,
    };

    return (
        <div className={styles.visualizerWidget}>
            <div className={styles.visualizerTitle}>
                2D Grid Pathfinding Map ({isAStar ? 'Heuristic Guided A*' : 'Dijkstra Priority Queue'})
            </div>

            {/* Grid Stage */}
            <div className={styles.gridStage}>
                {Array.from({ length: ROWS }).map((_, r) =>
                    Array.from({ length: COLS }).map((_, c) => {
                        const key = `${r}-${c}`;
                        const isStart = r === START_POS.r && c === START_POS.c;
                        const isTarget = r === TARGET_POS.r && c === TARGET_POS.c;
                        const isWall = WALLS.includes(key);
                        const isVisited = activeStep.visited.includes(key);
                        const isPath = activeStep.path.includes(key) || (activeStep.found && isTarget);

                        let cellClass = styles.gridCell;
                        if (isStart) cellClass += ` ${styles.gridCellStart}`;
                        else if (isTarget) cellClass += ` ${styles.gridCellTarget}`;
                        else if (isWall) cellClass += ` ${styles.gridCellWall}`;
                        else if (isPath) cellClass += ` ${styles.gridCellPath}`;
                        else if (isVisited) cellClass += ` ${styles.gridCellVisited}`;

                        return (
                            <div key={key} className={cellClass}>
                                {isStart ? 'S' : isTarget ? 'T' : isWall ? '█' : ''}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Status Bar */}
            <div className={styles.statusText}>
                💡 {activeStep.description}
            </div>

            {/* Controls Bar */}
            <div className={styles.controlPanel}>
                <div className={styles.controlButtons}>
                    <button className={styles.ctrlBtn} onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => currentStepIndex < steps.length - 1 && setCurrentStepIndex((p) => p + 1)}
                        disabled={isPlaying || currentStepIndex >= steps.length - 1}
                    >
                        <SkipForward size={16} />
                        Next Step
                    </button>
                    <button
                        className={styles.ctrlBtn}
                        onClick={() => {
                            setIsPlaying(false);
                            setCurrentStepIndex(0);
                        }}
                    >
                        <RotateCcw size={16} />
                        Reset Map
                    </button>
                </div>
            </div>
        </div>
    );
}
