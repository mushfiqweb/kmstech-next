import { render, screen } from '@testing-library/react';
import Pagination from '../blog/Pagination';

// Mock next/link? No need if we just check anchor tags, testing-library handles standard elements fine. 
// But Next.js Link renders <a>.

describe('Pagination', () => {
    it('renders correct page numbers for small range', () => {
        // 18 posts, 6 per page = 3 pages
        render(<Pagination totalPosts={18} postsPerPage={6} currentPage={1} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.queryByText('...')).not.toBeInTheDocument();

        // Prev disabled
        const prevText = screen.getByText('Prev');
        // The "Prev" text is inside a span, which is inside the main container span
        // We want to check the container with 'paginationBtn' class
        const prevButtonContainer = prevText.closest('span[aria-disabled="true"]');
        expect(prevButtonContainer).toBeInTheDocument();
        expect(prevButtonContainer).toHaveClass('disabled');

        // Next enabled
        const nextLink = screen.getByRole('link', { name: /Next Page/i });
        expect(nextLink).toHaveAttribute('href', '/blogs?page=2');
    });

    it('renders correct page numbers for large range (middle)', () => {
        // 100 posts, 6 per page = 17 pages. Current 10.
        // Expect: 1 ... 9 10 11 ... 17
        render(<Pagination totalPosts={100} postsPerPage={6} currentPage={10} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('17')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('10')).toHaveClass('active');
        expect(screen.getByText('11')).toBeInTheDocument();

        const dots = screen.getAllByText('...');
        expect(dots).toHaveLength(2); // Two sets of dots
    });

    it('navigates to previous page correctly', () => {
        render(<Pagination totalPosts={18} postsPerPage={6} currentPage={2} />);

        const prevLink = screen.getByRole('link', { name: /Previous Page/i });
        expect(prevLink).toHaveAttribute('href', '/blogs?page=1');
    });

    it('shows reading stats', () => {
        render(<Pagination totalPosts={20} postsPerPage={6} currentPage={1} />);
        // Showing 1-6 of 20 posts
        expect(screen.getByText(/Showing 1-6 of 20 posts/i)).toBeInTheDocument();
    });
});

