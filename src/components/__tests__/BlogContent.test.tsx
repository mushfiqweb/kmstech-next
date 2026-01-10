import { render, screen } from '@testing-library/react';
import BlogContent from '../blog/BlogContent';

// Mock ReactMarkdown to actually render children properly for testing
jest.mock('react-markdown', () => ({ children }: { children: any }) => <div data-testid="markdown-root">{children}</div>);
jest.mock('remark-gfm', () => () => { });
jest.mock('rehype-raw', () => () => { });
jest.mock('sanitize-html', () => {
    const mockFn = jest.fn((str) => str);
    (mockFn as any).defaults = {
        allowedTags: [],
        allowedAttributes: {}
    };
    return mockFn;
});
// Mock CodeBlock since it's used inside BlogContent
jest.mock('../blog/CodeBlock', () => ({ value }: { value: string }) => <pre>{value}</pre>);

describe('BlogContent', () => {
    it('renders HTML content correctly', () => {
        const content = '<h1>Test Title</h1><p>Test Paragraph</p>';
        const { container } = render(<BlogContent content={content} />);

        expect(container.querySelector('h1')).toHaveTextContent('Test Title');
        expect(container.querySelector('p')).toHaveTextContent('Test Paragraph');
    });

    it('sanitizes unsafe scripts', () => {
        const unsafeContent = '<script>alert("xss")</script><p>Safe</p>';
        const sanitizeHtml = require('sanitize-html');
        render(<BlogContent content={unsafeContent} />);

        expect(sanitizeHtml).toHaveBeenCalled();
        expect(sanitizeHtml).toHaveBeenCalledWith(unsafeContent, expect.any(Object));
    });

    it('renders Markdown content when provided', () => {
        const markdown = '# Hello World\nSome code';
        render(<BlogContent content="" markdown={markdown} />);

        expect(screen.getByTestId('markdown-root')).toHaveTextContent('Hello World');
    });
});
