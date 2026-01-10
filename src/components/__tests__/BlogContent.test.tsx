import { render } from '@testing-library/react';
import BlogContent from '../blog/BlogContent';

describe('BlogContent', () => {
    it('renders HTML content correctly', () => {
        const content = '<h1>Test Title</h1><p>Test Paragraph</p>';
        const { container } = render(<BlogContent content={content} />);

        expect(container.querySelector('h1')).toHaveTextContent('Test Title');
        expect(container.querySelector('p')).toHaveTextContent('Test Paragraph');
    });

    it('sanitizes unsafe scripts', () => {
        const unsafeContent = '<script>alert("xss")</script><p>Safe</p>';
        const { container } = render(<BlogContent content={unsafeContent} />);

        expect(container.querySelector('script')).not.toBeInTheDocument();
        expect(container.querySelector('p')).toHaveTextContent('Safe');
    });
});
