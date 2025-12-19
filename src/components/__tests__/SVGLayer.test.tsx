import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SVGLayer } from '../SVGLayer';
import gsap from 'gsap';

describe('SVGLayer Component', () => {
  it('renders the background SVG', () => {
    const { container } = render(<SVGLayer />);
    const svg = container.querySelector('svg#bg-svg-layer');
    expect(svg).toBeInTheDocument();
  });

  it('renders gradients and filters', () => {
    const { container } = render(<SVGLayer />);
    expect(container.querySelector('#grunge-texture')).toBeInTheDocument();
    expect(container.querySelector('#main-gradient')).toBeInTheDocument();

    expect(container.querySelector('#sword-pattern')).toBeInTheDocument();
  });

  it('initializes GSAP animations for turbulence', () => {
    render(<SVGLayer />);
    expect(gsap.to).toHaveBeenCalled();
  });


});
