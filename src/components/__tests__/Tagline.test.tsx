import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tagline } from '../Tagline';
import gsap from 'gsap';

describe('Tagline Component', () => {
  const text = "Test Tagline";

  it('renders the SVG text', () => {
    render(<Tagline text={text} />);
    expect(screen.getByRole('img', { name: text })).toBeInTheDocument();
  });

  it('renders individual characters', () => {
    const { container } = render(<Tagline text={text} />);
    const chars = container.querySelectorAll('.tag-char');
    expect(chars.length).toBe(text.length);
    // Check for a specific character presence (taking first one if multiple)
    expect(screen.getAllByText('T')[0]).toBeInTheDocument();
  });

  it('initializes GSAP animations', () => {
    render(<Tagline text={text} />);
    expect(gsap.set).toHaveBeenCalled();
    expect(gsap.timeline).toHaveBeenCalled();
  });
});
