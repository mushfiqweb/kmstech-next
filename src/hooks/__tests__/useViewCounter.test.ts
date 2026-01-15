
import { renderHook, act } from '@testing-library/react';
import { useViewCounter } from '../useViewCounter';
import useSWR from 'swr';

// Mock dependencies
jest.mock('swr', () => ({
    __esModule: true,
    default: jest.fn(),
}));

global.fetch = jest.fn();

describe('useViewCounter', () => {
    const mockMutate = jest.fn();
    const slug = 'test-post';

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        (useSWR as jest.Mock).mockReturnValue({
            data: { views: 100 },
            error: null,
            mutate: mockMutate,
            isLoading: false,
        });

        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ views: 101 }),
        });
    });

    it('increments views when not viewed before', async () => {
        const { result } = renderHook(() => useViewCounter(slug));

        await act(async () => {
            await result.current.increment();
        });

        // Should call API
        expect(global.fetch).toHaveBeenCalledWith(`/api/view-count/${slug}`, { method: 'POST' });
        // Should update localStorage
        expect(localStorage.getItem(`viewed-${slug}`)).toBe('true');
        // Should call mutate
        expect(mockMutate).toHaveBeenCalled();
    });

    it('does NOT increment views if already viewed (localStorage check)', async () => {
        localStorage.setItem(`viewed-${slug}`, 'true');
        const { result } = renderHook(() => useViewCounter(slug));

        await act(async () => {
            await result.current.increment();
        });

        // Should NOT call API
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('handles API failure by rolling back localStorage', async () => {
        // Suppress expected console error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => useViewCounter(slug));

        await act(async () => {
            await result.current.increment();
        });

        // Should attempt call API
        expect(global.fetch).toHaveBeenCalled();
        // Should remove from localStorage on error
        expect(localStorage.getItem(`viewed-${slug}`)).toBeNull();

        // Check if console.error was called
        expect(consoleSpy).toHaveBeenCalledWith('Failed to increment view count', expect.any(Error));

        consoleSpy.mockRestore();
    });

    it('sets localStorage immediately (Synchronous lock)', async () => {
        const { result } = renderHook(() => useViewCounter(slug));

        let promise: Promise<void>;
        act(() => {
            promise = result.current.increment();
        });

        // Before promise resolves (before await), localStorage should already be set
        expect(localStorage.getItem(`viewed-${slug}`)).toBe('true');

        await act(async () => { await promise! });
    });
});
