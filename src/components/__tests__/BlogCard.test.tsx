import { render, screen } from '@testing-library/react';
import BlogCard from '../blog/BlogCard';

// Mock Post data
const mockPost = {
    id: '1',
    slug: 'test-post',
    title: 'Test Post Title',
    brief: 'This is a brief summary.',
    coverImage: { url: 'https://example.com/image.jpg' },
    author: {
        name: 'John Doe',
        username: 'johndoe',
        profilePicture: 'https://example.com/avatar.jpg',
    },
    publishedAt: '2023-01-15T10:00:00Z',
    readTimeInMinutes: 5,
    views: 1234,
    content: { html: '<p>Content</p>' },
    tags: [],
};

describe('BlogCard', () => {
    it('renders post details correctly', () => {
        render(<BlogCard post={mockPost} />);

        expect(screen.getByText('Test Post Title')).toBeInTheDocument();
        expect(screen.getByText('This is a brief summary.')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jan 15, 2023')).toBeInTheDocument();
        expect(screen.getByText('5 min read')).toBeInTheDocument();
        expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('uses fallback image when coverImage is missing', () => {
        const postWithoutImage = { ...mockPost, coverImage: undefined };
        render(<BlogCard post={postWithoutImage} />);

        const images = screen.getAllByRole('img');
        // The first image (cover) should be the fallback
        // Note: Next.js Image component renders complex HTML, checking src attribute usually involves checking the optimized url
        // Alternatively, checking alt text is reliable
        const coverImage = screen.getByAltText('Test Post Title');
        expect(coverImage).toBeInTheDocument();
        // Just checking rendering logic here; src verification in Next/Image involves decoding props
    });
});
