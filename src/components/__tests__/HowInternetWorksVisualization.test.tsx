import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HowInternetWorksVisualization } from '../explainers/visualizations/how-internet-works';

// Mock sub-components
jest.mock('../explainers/visualizations/how-internet-works/DNSPhase', () => ({ DNSPhase: () => <div>DNSPhase</div> }));
jest.mock('../explainers/visualizations/how-internet-works/HandshakePhase', () => ({ HandshakePhase: () => <div>HandshakePhase</div> }));
jest.mock('../explainers/visualizations/how-internet-works/RoutingPhase', () => ({ RoutingPhase: () => <div>RoutingPhase</div> }));
jest.mock('../explainers/visualizations/how-internet-works/RenderingPhase', () => ({ RenderingPhase: () => <div>RenderingPhase</div> }));

describe('HowInternetWorksVisualization', () => {
    it('renders tabs and default content', () => {
        render(<HowInternetWorksVisualization />);
        expect(screen.getByText('1. DNS')).toBeInTheDocument();
        expect(screen.getByText('DNSPhase')).toBeInTheDocument();
    });

    it('switches tabs correctly', async () => {
        render(<HowInternetWorksVisualization />);

        const handshakeTab = screen.getByText('2. Handshake');
        fireEvent.click(handshakeTab);

        await waitFor(() => {
            expect(screen.getByText('HandshakePhase')).toBeInTheDocument();
        });

        expect(screen.queryByText('DNSPhase')).not.toBeInTheDocument();
    });
});
