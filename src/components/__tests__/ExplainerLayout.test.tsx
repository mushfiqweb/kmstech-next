import { render, screen } from '@testing-library/react';
import { ExplainerLayout } from '../explainers/ExplainerLayout';

// Mock BlogHeader and BlogFooter
jest.mock('../blog/BlogHeader', () => ({
    BlogHeader: () => <div data-testid="blog-header">Header</div>
}));
jest.mock('../blog/BlogFooter', () => ({
    BlogFooter: () => <div data-testid="blog-footer">Footer</div>
}));

describe('ExplainerLayout', () => {
    it('renders children within the layout', () => {
        render(
            <ExplainerLayout>
                <div>Child Content</div>
            </ExplainerLayout>
        );

        expect(screen.getByTestId('blog-header')).toBeInTheDocument();
        expect(screen.getByTestId('blog-footer')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });
});
