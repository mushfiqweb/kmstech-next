import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { OfflineIndicator } from '../OfflineIndicator';

describe('OfflineIndicator', () => {
  let originalOnLine: boolean;

  beforeAll(() => {
    originalOnLine = navigator.onLine;
  });

  afterAll(() => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: originalOnLine,
    });
  });

  it('renders nothing when online', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    const { container } = render(<OfflineIndicator />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders offline message when initially offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    render(<OfflineIndicator />);
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();
  });

  it('shows/hides message on window events', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    const { container } = render(<OfflineIndicator />);
    expect(container).toBeEmptyDOMElement();

    // Trigger offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();

    // Trigger online
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(container).toBeEmptyDOMElement();
  });
});
