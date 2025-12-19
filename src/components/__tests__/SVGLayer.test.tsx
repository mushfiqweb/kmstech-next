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
    expect(container.querySelector('#mouse-light')).toBeInTheDocument();
    expect(container.querySelector('#sword-pattern')).toBeInTheDocument();
  });

  it('initializes GSAP animations for turbulence', () => {
    render(<SVGLayer />);
    expect(gsap.to).toHaveBeenCalled();
  });

  it('handles mouse movement', () => {
    render(<SVGLayer />);
    // Create a mouse event and dispatch it
    const event = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
      bubbles: true,
      cancelable: true,
      view: window
    });
    
    // Dispatch on window
    window.dispatchEvent(event);
    
    expect(gsap.to).toHaveBeenCalled();
  });

  it('handles touch movement', () => {
    render(<SVGLayer />);
    fireEvent.touchMove(window, { touches: [{ clientX: 100, clientY: 100 }] });
    expect(gsap.to).toHaveBeenCalled();
  });

  it('adds and removes event listeners', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<SVGLayer />);
    
    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), expect.objectContaining({ passive: true }));
    
    unmount();
    
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
    
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
