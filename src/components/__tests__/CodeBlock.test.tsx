import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeBlock from '../blog/CodeBlock';

// Mock react-syntax-highlighter because it uses async loading or complex DOM
jest.mock('react-syntax-highlighter', () => ({
    PrismAsyncLight: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

describe('CodeBlock', () => {
    const code = 'const a = 1;';

    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockImplementation(() => Promise.resolve()),
            },
        });
    });

    it('renders code correctly', () => {
        render(<CodeBlock language="javascript" value={code} />);
        expect(screen.getByText('javascript')).toBeInTheDocument();
        expect(screen.getByText(code)).toBeInTheDocument();
    });

    it('copies code to clipboard', async () => {
        render(<CodeBlock language="javascript" value={code} />);
        const copyBtn = screen.getByLabelText('Copy to clipboard');

        fireEvent.click(copyBtn);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);

        await waitFor(() => {
            expect(screen.getByText('Copied')).toBeInTheDocument();
        });
    });
    it('shows expand button for long code', () => {
        const longCode = Array(25).fill('line').join('\n');
        render(<CodeBlock language="javascript" value={longCode} />);

        const expandBtn = screen.getByText('Show More');
        expect(expandBtn).toBeInTheDocument();

        // Initial state is collapsed
        // (We can check if container has collapsed class, but that is implementation detail. 
        //  The button presence confirms logic trigger.)
    });

    it('toggles expansion on click', () => {
        const longCode = Array(25).fill('line').join('\n');
        render(<CodeBlock language="javascript" value={longCode} />);

        const expandBtn = screen.getByText('Show More');
        fireEvent.click(expandBtn);

        expect(screen.getByText('Show Less')).toBeInTheDocument();
        expect(screen.queryByText('Show More')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Show Less'));
        expect(screen.getByText('Show More')).toBeInTheDocument();
    });

    it('resets copy button after 2 seconds', async () => {
        jest.useFakeTimers();
        render(<CodeBlock language="javascript" value={code} />);

        const copyBtn = screen.getByLabelText('Copy to clipboard');
        fireEvent.click(copyBtn);

        await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());

        // Fast-forward time
        jest.advanceTimersByTime(2000);

        await waitFor(() => expect(screen.getByText('Copy')).toBeInTheDocument());
        jest.useRealTimers();
    });

    it('handles copy error gracefully', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('Failed'));

        render(<CodeBlock language="javascript" value={code} />);
        const copyBtn = screen.getByLabelText('Copy to clipboard');
        fireEvent.click(copyBtn);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to copy code', expect.any(Error));
        });
        consoleSpy.mockRestore();
    });
});
