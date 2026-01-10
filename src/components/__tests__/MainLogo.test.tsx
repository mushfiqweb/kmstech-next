/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MainLogo } from '../MainLogo';
import gsap from 'gsap';

describe('MainLogo Component', () => {
  beforeAll(() => {
    // Mock getTotalLength for SVG elements
    const mockGetTotalLength = jest.fn(() => 100);

    // Attempt to mock on various prototypes
    if (typeof SVGElement !== 'undefined') {
      (SVGElement.prototype as any).getTotalLength = mockGetTotalLength;
    } else if (typeof window !== 'undefined' && window.SVGElement) {
      (window.SVGElement.prototype as any).getTotalLength = mockGetTotalLength;
    }

    // Also try SVGPathElement/SVGPolygonElement explicitly if they exist
    if (typeof SVGPathElement !== 'undefined') {
      SVGPathElement.prototype.getTotalLength = mockGetTotalLength;
    } else if (typeof window !== 'undefined' && window.SVGPathElement) {
      window.SVGPathElement.prototype.getTotalLength = mockGetTotalLength;
    }

    if (typeof SVGPolygonElement !== 'undefined') {
      SVGPolygonElement.prototype.getTotalLength = mockGetTotalLength;
    } else if (typeof window !== 'undefined' && window.SVGPolygonElement) {
      window.SVGPolygonElement.prototype.getTotalLength = mockGetTotalLength;
    }
  });

  it('renders the logo SVG', () => {
    const { container } = render(<MainLogo />);
    const svg = container.querySelector('svg#Layer_2');
    expect(svg).toBeInTheDocument();
  });

  it('initializes GSAP animations', () => {
    render(<MainLogo />);
    // Check if timeline was created
    expect(gsap.timeline).toHaveBeenCalled();
    // Check if elements were animated
    // MainLogo uses tl.to, not gsap.to directly, but it uses gsap.set
    expect(gsap.set).toHaveBeenCalled();
  });

  it('restarts animation on click', () => {
    // We need to capture the timeline mock instance
    const timelineInstance = {
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      fromTo: jest.fn().mockReturnThis(),
      kill: jest.fn(),
      restart: jest.fn(),
    };
    (gsap.timeline as jest.Mock).mockReturnValue(timelineInstance);

    render(<MainLogo />);

    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
      fireEvent.click(logoContainer);
      expect(timelineInstance.restart).toHaveBeenCalled();
    } else {
      fail('Logo container not found');
    }
  });
});
