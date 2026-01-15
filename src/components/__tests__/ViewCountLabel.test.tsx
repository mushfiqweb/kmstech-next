
import { render, screen } from '@testing-library/react';
import ViewCountLabel from '../blog/ViewCountLabel';
import * as useViewCounterHook from '../../hooks/useViewCounter';

// Mock the hook
jest.mock('../../hooks/useViewCounter');

describe('ViewCountLabel', () => {
    const mockIncrement = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useViewCounterHook.useViewCounter as jest.Mock).mockReturnValue({
            views: 100,
            increment: mockIncrement,
            isLoading: false,
            isError: null,
        });
    });

    it('renders the view count', () => {
        render(<ViewCountLabel slug="test-slug" initialViews={50} />);
        expect(screen.getByText('100 views')).toBeInTheDocument();
    });

    it('renders initial views if live views are 0', () => {
        (useViewCounterHook.useViewCounter as jest.Mock).mockReturnValue({
            views: 0,
            increment: mockIncrement,
        });
        render(<ViewCountLabel slug="test-slug" initialViews={50} />);
        expect(screen.getByText('50 views')).toBeInTheDocument();
    });

    it('calls increment when increment prop is true', () => {
        render(<ViewCountLabel slug="test-slug" increment={true} />);
        expect(mockIncrement).toHaveBeenCalled();
    });

    it('does not call increment when increment prop is false', () => {
        render(<ViewCountLabel slug="test-slug" increment={false} />);
        expect(mockIncrement).not.toHaveBeenCalled();
    });

    it('does not call increment multiple times (idempotency)', () => {
        const { rerender } = render(<ViewCountLabel slug="test-slug" increment={true} />);
        rerender(<ViewCountLabel slug="test-slug" increment={true} />);
        expect(mockIncrement).toHaveBeenCalledTimes(1);
    });
});
