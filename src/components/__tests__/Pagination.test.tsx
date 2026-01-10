import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../blog/Pagination';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Pagination', () => {
    const mockBack = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            back: mockBack,
        });
        // Mock window.history
        Object.defineProperty(window, 'history', {
            value: { length: 2 },
            writable: true,
        });
    });

    it('renders correctly', () => {
        render(<Pagination hasNextPage={true} endCursor="test-cursor" currentPage={1} />);

        expect(screen.getByText('Prev')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('enables Prev button when history allows', () => {
        render(<Pagination hasNextPage={true} endCursor="test-cursor" currentPage={2} />);
        const prevBtn = screen.getByRole('button', { name: /Previous Page/i });
        fireEvent.click(prevBtn);
        expect(mockBack).toHaveBeenCalled();
    });

    it('generates correct Next link', () => {
        render(<Pagination hasNextPage={true} endCursor="abc" currentPage={1} />);
        const nextLink = screen.getByRole('link', { name: /Next Page/i });
        expect(nextLink).toHaveAttribute('href', '/blogs?after=abc&page=2');
    });

    it('disables Next button when hasNextPage is false', () => {
        render(<Pagination hasNextPage={false} endCursor={null} currentPage={1} />);
        const nextBtn = screen.getByRole('button', { name: /Next Page/i }); // It renders as button when disabled logic hits? 
        // Wait, the logic is: hasNextPage && endCursor ? Link : button(disabled)
        // Note: The logic inside Pagination for next button is clear.
        // If !hasNextPage, it renders a disabled button.
        expect(nextBtn).toBeDisabled();
    });
});
