import { render, screen } from '@testing-library/react';
import { BlogHeader } from '../blog/BlogHeader';

describe('BlogHeader', () => {
    it('renders logo link to home', () => {
        render(<BlogHeader />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/');
        const img = screen.getByAltText('KMS Tech');
        expect(img).toBeInTheDocument();
    });
});
