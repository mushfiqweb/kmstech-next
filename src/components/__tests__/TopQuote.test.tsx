import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopQuote } from '../TopQuote';
import gsap from 'gsap';

describe('TopQuote Component', () => {
  it('renders all quote lines', () => {
    render(<TopQuote />);
    expect(screen.getAllByText(/God, His angels/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/even ants in their hills/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/call down blessings/i)[0]).toBeInTheDocument();
  });

  it('renders the attribution', () => {
    render(<TopQuote />);
    expect(screen.getAllByText(/Holy Prophet/i)[0]).toBeInTheDocument();
  });

  it('initializes GSAP animations', () => {
    render(<TopQuote />);
    expect(gsap.set).toHaveBeenCalled();
    expect(gsap.timeline).toHaveBeenCalled();
  });
  
  it('renders quote icons', () => {
      // Since we use react-icons, they render as SVGs. 
      // We can't easily find them by text, but we can check if SVGs are present.
      // Or if we mocked them (we didn't mock react-icons, so they render).
      const { container } = render(<TopQuote />);
      // We expect multiple SVGs (2 per line * 3 lines = 6, plus maybe others)
      // Actually we have 2 layers (base + glow), so icons are duplicated.
      // 3 lines * 2 layers * 2 icons = 12 icons.
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
  });
});
