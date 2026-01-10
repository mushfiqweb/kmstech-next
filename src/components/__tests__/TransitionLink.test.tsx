import { render, fireEvent, screen, act } from '@testing-library/react';
import { TransitionLink } from '../TransitionLink';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock GSAP
jest.mock('gsap', () => ({
    to: jest.fn().mockImplementation((target, config) => {
        if (config.onComplete) config.onComplete();
    }),
}));

describe('TransitionLink', () => {
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush,
        });
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<TransitionLink href="/test">Test Link</TransitionLink>);
        const link = screen.getByText('Test Link');
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/test');
    });

    it('triggers transition animation and navigation on click', () => {
        // Mock a main element in the document
        const main = document.createElement('main');
        document.body.appendChild(main);

        render(<TransitionLink href="/target">Go</TransitionLink>);

        const link = screen.getByText('Go');
        fireEvent.click(link);

        // Verify GSAP was called targeting the main element
        expect(gsap.to).toHaveBeenCalledWith(main, expect.objectContaining({
            opacity: 0,
            scale: 0.98,
        }));

        // Verify navigation happened
        expect(mockRouterPush).toHaveBeenCalledWith('/target');

        // Cleanup
        document.body.removeChild(main);
    });

    it('navigates immediately if no main element exists', () => {
        render(<TransitionLink href="/target">Go</TransitionLink>);

        fireEvent.click(screen.getByText('Go'));

        expect(gsap.to).not.toHaveBeenCalled();
        expect(mockRouterPush).toHaveBeenCalledWith('/target');
    });
});
