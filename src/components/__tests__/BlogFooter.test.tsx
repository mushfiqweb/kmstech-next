import { render, screen } from '@testing-library/react';
import { BlogFooter } from '../blog/BlogFooter';

describe('BlogFooter', () => {
    it('renders copyright info', () => {
        render(<BlogFooter />);
        expect(screen.getByText(/KMS Tech. All rights reserved./i)).toBeInTheDocument();
    });
});
