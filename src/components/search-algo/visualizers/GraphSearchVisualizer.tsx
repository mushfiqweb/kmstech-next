'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../search-algo.module.css';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

interface Edge {
    from: string;
    to: string;
}

interface GraphStep {
    currentNode: string;
    visited: string[];
    queueOrStack: string[];
    description: string;
    found: boolean;
}

const GRAPH_NODES: GraphNode[] = [
    { id: 'A', label: 'A (Root)', x: 220, y: 40 },
    { id: 'B', label: 'B', x: 120, y: 110 },
    { id: 'C', label: 'C', x: 320, y: 110 },
    { id: 'D', label: 'D', x: 60, y: 180 },
    { id: 'E', label: 'E', x: 180, y: 180 },
    { id: 'F', label: 'F', x: 260, y: 180 },
    { id: 'G', label: 'G', x: 380, y: 180 },
];

const GRAPH_EDGES: Edge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
    { from: 'C', to: 'G' },
];

const ADJACENCY_LIST: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F', 'G'],
    D: ['B'],
    E: ['B'],
    F: ['C'],
    G: ['C'],
};

export function GraphSearchVisualizer({ algorithmId }: { algorithmId: string }) {
    const [targetNode, setTargetNode] = useState<string>('G');
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [steps, setSteps] = useState<GraphStep[]>([]);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isBFS = algorithmId === 'breadth-first-search';

    useEffect(() => {
        const generatedSteps: GraphStep[] = [];

        if (isBFS) {
            // BFS using Queue
            const queue: string[] = ['A'];
            const visited = new Set<string>(['A']);
            let found = false;

            generatedSteps.push({
                currentNode: 'A',
                visited: Array.from(visited),
                queueOrStack: [...queue],
                description: `Starting BFS at root node A. Queue: [A]`,
                found: false,
            });

            while (queue.length > 0) {
                const node = queue.shift()!;
                if (node === targetNode) {
                    generatedSteps.push({
                        currentNode: node,
                        visited: Array.from(visited),
                        queueOrStack: [...queue],
                        description: `Target node ${targetNode} found via BFS!`,
                        found: true,
                    });
                    found = true;
                    break;
                }

                const neighbors = ADJACENCY_LIST[node] || [];
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                        generatedSteps.push({
                            currentNode: neighbor,
                            visited: Array.from(visited),
                            queueOrStack: [...queue],
                            description: `Enqueued neighbor ${neighbor} from node ${node}. Queue: [${queue.join(', ')}]`,
                            found: neighbor === targetNode,
                        });
                    }
                }
            }

            if (!found) {
                generatedSteps.push({
                    currentNode: '',
                    visited: Array.from(visited),
                    queueOrStack: [],
                    description: `Target node ${targetNode} not reachable in graph.`,
                    found: false,
                });
            }
        } else {
            // DFS using Stack
            const stack: string[] = ['A'];
            const visited = new Set<string>();
            let found = false;

            while (stack.length > 0) {
                const node = stack.pop()!;
                if (!visited.has(node)) {
                    visited.add(node);
                    const isTarget = node === targetNode;

                    generatedSteps.push({
                        currentNode: node,
                        visited: Array.from(visited),
                        queueOrStack: [...stack],
                        description: `Popped and visiting node ${node} from DFS Stack. Visited: [${Array.from(visited).join(', ')}]`,
                        found: isTarget,
                    });

                    if (isTarget) {
                        found = true;
                        break;
                    }

                    const neighbors = ADJACENCY_LIST[node] || [];
                    for (let i = neighbors.length - 1; i >= 0; i--) {
                        const neighbor = neighbors[i];
                        if (!visited.has(neighbor)) {
                            stack.push(neighbor);
                        }
                    }
                }
            }

            if (!found) {
                generatedSteps.push({
                    currentNode: '',
                    visited: Array.from(visited),
                    queueOrStack: [],
                    description: `Target node ${targetNode} not reachable in graph.`,
                    found: false,
                });
            }
        }

        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }, [algorithmId, targetNode, isBFS]);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setTimeout(() => {
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex((prev) => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, 800);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentStepIndex, steps.length]);

    const activeStep = steps[currentStepIndex] || {
        currentNode: '',
        visited: [],
        queueOrStack: [],
        description: 'Ready.',
        found: false,
    };

    // Micro pulse effect on active SVG node
    useEffect(() => {
        if (svgRef.current && activeStep.currentNode) {
            const activeCircle = svgRef.current.querySelector(`#graph-node-${activeStep.currentNode}`);
            if (activeCircle) {
                gsap.fromTo(
                    activeCircle,
                    { r: 20 },
                    { r: 26, duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }
                );
            }
        }
    }, [currentStepIndex, activeStep.currentNode]);

    return (
        <div className={styles.visualizerWidget}>
            <div className={styles.visualizerTitle}>
                Graph Canvas ({isBFS ? 'Level-Order Queue BFS' : 'Depth-First Stack DFS'})
            </div>

            {/* SVG Graph Canvas */}
            <div className={styles.graphStage}>
                <svg ref={svgRef} width="440" height="230" viewBox="0 0 440 230">
                    {/* Render Edges */}
                    {GRAPH_EDGES.map((edge, idx) => {
                        const fromNode = GRAPH_NODES.find((n) => n.id === edge.from)!;
                        const toNode = GRAPH_NODES.find((n) => n.id === edge.to)!;
                        const isTraversed = activeStep.visited.includes(edge.from) && activeStep.visited.includes(edge.to);

                        return (
                            <line
                                key={idx}
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke={isTraversed ? '#00ff75' : 'rgba(255, 255, 255, 0.2)'}
                                strokeWidth={isTraversed ? 3 : 1.5}
                                strokeDasharray={isTraversed ? 'none' : '4 4'}
                            />
                        );
                    })}

                    {/* Render Nodes */}
                    {GRAPH_NODES.map((node) => {
                        const isCurrent = activeStep.currentNode === node.id;
                        const isVisited = activeStep.visited.includes(node.id);
                        const isFound = activeStep.found && isCurrent;

                        let fill = '#1e293b';
                        let stroke = 'rgba(255, 255, 255, 0.3)';

                        if (isFound) {
                            fill = '#00ff75';
                            stroke = '#ffffff';
                        } else if (isCurrent) {
                            fill = '#a855f7';
                            stroke = '#ffffff';
                        } else if (isVisited) {
                            fill = '#009444';
                            stroke = '#00ff75';
                        }

                        return (
                            <g key={node.id}>
                                <circle
                                    id={`graph-node-${node.id}`}
                                    cx={node.x}
                                    cy={node.y}
                                    r={22}
                                    fill={fill}
                                    stroke={stroke}
                                    strokeWidth={3}

                                />
                                <text
                                    x={node.x}
                                    y={node.y + 5}
                                    textAnchor="middle"
                                    fill={isFound ? '#000000' : '#ffffff'}
                                    fontSize="14"
                                    fontWeight="bold"
                                    fontFamily="var(--font-geist-mono)"
                                >
                                    {node.id}
                                </text>
                            </g>
                        );
                    })}
                </svg>
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
                        Reset
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Target Node:</span>
                    <select
                        className={styles.targetInput}
                        style={{ width: '60px' }}
                        value={targetNode}
                        onChange={(e) => setTargetNode(e.target.value)}
                    >
                        {GRAPH_NODES.map((n) => (
                            <option key={n.id} value={n.id}>
                                {n.id}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
