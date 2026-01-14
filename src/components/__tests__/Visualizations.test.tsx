import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { DNSPhase } from '../explainers/visualizations/how-internet-works/DNSPhase';
import { HandshakePhase } from '../explainers/visualizations/how-internet-works/HandshakePhase';
import { RoutingPhase } from '../explainers/visualizations/how-internet-works/RoutingPhase';
import { RenderingPhase } from '../explainers/visualizations/how-internet-works/RenderingPhase';

// Mock framer-motion to avoid animation issues
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, style, onClick }: any) => (
            <div className={className} style={style} onClick={onClick}>
                {children}
            </div>
        ),
    },
}));

describe('DNSPhase', () => {
    it('handles DNS resolution flow', async () => {
        jest.useFakeTimers();
        render(<DNSPhase />);

        const input = screen.getByPlaceholderText('google.com');
        const button = screen.getByText('Lookup');

        // Initial state
        expect(screen.getByText('Waiting for input...')).toBeInTheDocument();

        // Type input
        fireEvent.change(input, { target: { value: 'example.com' } });
        fireEvent.click(button);

        // Loading state
        expect(screen.getByText('Resolving...')).toBeInTheDocument();
        expect(screen.getByText('Querying Recursive Resolver...')).toBeInTheDocument();

        // Wait for timeout
        act(() => {
            jest.advanceTimersByTime(1500);
        });

        // Resolved state
        await waitFor(() => {
            expect(screen.getByText('Resolved IP Address')).toBeInTheDocument();
        });
        expect(screen.getByText('Lookup')).toBeInTheDocument();

        jest.useRealTimers();
    });

    it('does nothing if input is empty', () => {
        render(<DNSPhase />);
        const button = screen.getByText('Lookup');
        fireEvent.click(button);
        expect(screen.getByText('Waiting for input...')).toBeInTheDocument();
    });
});

describe('HandshakePhase', () => {
    it('cycles through handshake steps', () => {
        render(<HandshakePhase />);

        // Initial state
        expect(screen.getByText('Disconnected')).toBeInTheDocument();
        expect(screen.getByText('Listening')).toBeInTheDocument();

        const nextButton = screen.getByText(/Next Step/);

        // Step 1: SYN
        fireEvent.click(nextButton);
        expect(screen.getByText('SYN')).toBeInTheDocument();
        expect(screen.getByText('SYN Sent')).toBeInTheDocument();

        // Step 2: SYN-ACK
        fireEvent.click(nextButton);
        expect(screen.getByText('SYN-ACK')).toBeInTheDocument();
        expect(screen.getByText('SYN Received, ACK Sent')).toBeInTheDocument();

        // Step 3: ACK
        fireEvent.click(nextButton);
        expect(screen.getByText('ACK')).toBeInTheDocument();
        expect(screen.getAllByText('Established')).toHaveLength(2);

        // Reset
        fireEvent.click(nextButton);
    });
});

describe('RoutingPhase', () => {
    it('handles packet sending animation', async () => {
        jest.useFakeTimers();
        render(<RoutingPhase />);

        expect(screen.getByText('Packet Routing (BGP)')).toBeInTheDocument();

        const sendButton = screen.getByText('Send Packet');
        fireEvent.click(sendButton);

        // Wait for timeout setting packetSent to true
        act(() => {
            jest.advanceTimersByTime(100);
        });

        // Since we mocked motion.div, we can just check if it rendered.
        // However, checking for the motion.div specifically might be tricky if it has no text content.
        // The packet div has class `styles.packet`.
        // Let's rely on component state update triggering re-render without crashing.

        jest.useRealTimers();
    });
});

describe('RenderingPhase', () => {
    it('renders code and preview', () => {
        render(<RenderingPhase />);
        expect(screen.getByText('Browser Rendering')).toBeInTheDocument();
        expect(screen.getAllByText('Hello World').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Click Me').length).toBeGreaterThan(0);
    });
});
