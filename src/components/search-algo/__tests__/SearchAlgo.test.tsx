import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SEARCH_ALGORITHMS, ALGORITHM_GROUPS } from '../algorithmsData';
import { SearchAlgoTOC } from '../SearchAlgoTOC';
import { UseCaseSimulator } from '../usecases/UseCaseSimulator';
import { AlgorithmSection } from '../AlgorithmSection';
import { ArraySearchVisualizer } from '../visualizers/ArraySearchVisualizer';
import { GraphSearchVisualizer } from '../visualizers/GraphSearchVisualizer';
import { PathfindingVisualizer } from '../visualizers/PathfindingVisualizer';
import { StringSearchVisualizer } from '../visualizers/StringSearchVisualizer';
import { HashTableVisualizer } from '../visualizers/HashTableVisualizer';
import { SearchAlgoFooter } from '../SearchAlgoFooter';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/all-search-algorithms',
}));

describe('Search Algorithms Masterclass Component Suite', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('renders all 6 ALGORITHM_GROUPS and 13 algorithm definitions in algorithmsData', () => {
        expect(ALGORITHM_GROUPS).toHaveLength(6);
        expect(SEARCH_ALGORITHMS).toHaveLength(13);
    });

    test('renders Table of Contents links grouped by 6 categories and handles click scroll', () => {
        window.scrollTo = jest.fn();
        render(<SearchAlgoTOC />);
        expect(screen.getByText('Algorithm Index')).toBeTruthy();
        expect(screen.getByText('1. Sequential Search')).toBeTruthy();
        expect(screen.getByText('5. String Search Algorithms')).toBeTruthy();
        expect(screen.getByText('6. Specialized & Advanced Search')).toBeTruthy();
        const linearLink = screen.getByText('Linear Search');
        fireEvent.click(linearLink);
    });

    test('renders UseCaseSimulator card with title and description', () => {
        render(
            <UseCaseSimulator
                algorithmId="binary-search"
                title="Git Bisect Regression Hunter"
                description="Pinpointing the exact commit that introduced a bug."
            />
        );
        expect(screen.getByText(/Git Bisect Regression Hunter/i)).toBeTruthy();
        expect(screen.getByText(/Pinpointing the exact commit/i)).toBeTruthy();
    });

    test('renders AlgorithmSection for all 13 algorithms', () => {
        SEARCH_ALGORITHMS.forEach((algo) => {
            const { unmount } = render(<AlgorithmSection algo={algo} />);
            expect(screen.getByText(algo.name)).toBeTruthy();
            unmount();
        });
    });

    test('interactive controls in ArraySearchVisualizer (Linear, Binary, Jump, Interpolation, Exponential, Ternary)', () => {
        const algorithms = [
            'linear-search',
            'binary-search',
            'jump-search',
            'interpolation-search',
            'exponential-search',
            'ternary-search',
        ];

        algorithms.forEach((algoId) => {
            const { unmount } = render(<ArraySearchVisualizer algorithmId={algoId} />);
            
            // Step through all generated steps
            const nextBtn = screen.getByText('Next Step');
            for (let i = 0; i < 15; i++) {
                fireEvent.click(nextBtn);
            }

            // Play & Pause
            const playBtn = screen.getByText('Play');
            fireEvent.click(playBtn);
            act(() => {
                jest.advanceTimersByTime(3000);
            });
            const pauseBtn = screen.getByText('Pause');
            fireEvent.click(pauseBtn);

            // Change target input
            const targetInput = screen.getByDisplayValue(/55|50|60/);
            fireEvent.change(targetInput, { target: { value: '99' } });

            // Change speed dropdown
            const speedSelect = screen.getByDisplayValue('1.0x');
            fireEvent.change(speedSelect, { target: { value: '300' } });

            // Reset
            fireEvent.click(screen.getByText('Reset'));
            unmount();
        });
    });

    test('interactive controls in GraphSearchVisualizer (BFS & DFS)', () => {
        ['breadth-first-search', 'depth-first-search'].forEach((algoId) => {
            const { unmount } = render(<GraphSearchVisualizer algorithmId={algoId} />);

            const nextBtn = screen.getByText('Next Step');
            for (let i = 0; i < 10; i++) {
                fireEvent.click(nextBtn);
            }

            const playBtn = screen.getByText('Play');
            fireEvent.click(playBtn);
            act(() => {
                jest.advanceTimersByTime(3000);
            });

            fireEvent.click(screen.getByText('Reset'));
            unmount();
        });
    });

    test('interactive controls in PathfindingVisualizer (Dijkstra & A*)', () => {
        ['dijkstra-search', 'astar-search'].forEach((algoId) => {
            const { unmount } = render(<PathfindingVisualizer algorithmId={algoId} />);

            const nextBtn = screen.getByText('Next Step');
            for (let i = 0; i < 15; i++) {
                fireEvent.click(nextBtn);
            }

            const playBtn = screen.getByText('Play');
            fireEvent.click(playBtn);
            act(() => {
                jest.advanceTimersByTime(3000);
            });

            fireEvent.click(screen.getByText('Reset Map'));
            unmount();
        });
    });

    test('interactive controls in StringSearchVisualizer (Naive & KMP)', () => {
        ['naive-string-search', 'kmp-string-search'].forEach((algoId) => {
            const { unmount } = render(<StringSearchVisualizer algorithmId={algoId} />);

            const nextBtn = screen.getByText('Next Step');
            for (let i = 0; i < 15; i++) {
                fireEvent.click(nextBtn);
            }

            const playBtn = screen.getByText('Play');
            fireEvent.click(playBtn);
            act(() => {
                jest.advanceTimersByTime(3000);
            });

            const patternInput = screen.getByDisplayValue('ABABCABAB');
            fireEvent.change(patternInput, { target: { value: 'ABA' } });

            fireEvent.click(screen.getByText('Reset'));
            unmount();
        });
    });

    test('interactive controls in HashTableVisualizer', () => {
        const { unmount } = render(<HashTableVisualizer />);

        const lookupBtn = screen.getByText('Lookup Key');
        fireEvent.click(lookupBtn);

        const keyInput = screen.getByDisplayValue('user_202');
        fireEvent.change(keyInput, { target: { value: 'user_101' } });
        fireEvent.click(lookupBtn);

        fireEvent.change(keyInput, { target: { value: 'non_existent_key' } });
        fireEvent.click(lookupBtn);

        fireEvent.click(screen.getByText('Reset'));
        unmount();
    });

    test('renders SearchAlgoFooter and back to top click', () => {
        window.scrollTo = jest.fn();
        const { getByText } = render(<SearchAlgoFooter />);
        expect(getByText(/KMS Tech/i)).toBeTruthy();
        const topBtn = getByText('Back to Top');
        fireEvent.click(topBtn);
        expect(window.scrollTo).toHaveBeenCalled();
    });
});
