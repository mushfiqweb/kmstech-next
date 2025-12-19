import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    // When isOpen is false, the implementation returns a div with "modal-overlay " class but not "active"
    // Wait, let's check the implementation.
    // It returns: <div className={`modal-overlay ${isOpen ? 'active' : ''}`} ...>
    // So it ALWAYS renders the overlay structure.
    // We should check if it has the 'active' class or if it's visible.
    // The CSS likely handles visibility.
    // But structurally it is there.
    // Let's check for the 'active' class on overlay.
    const overlay = container.firstChild;
    expect(overlay).not.toHaveClass('active');
  });

  it('renders correctly when isOpen is true', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const overlay = container.firstChild;
    expect(overlay).toHaveClass('active');
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const { container } = render(<Modal {...defaultProps} />);
    // The overlay is the outer div
    const overlay = container.firstChild;
    fireEvent.click(overlay!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<Modal {...defaultProps} />);
    const content = screen.getByText('Modal Content');
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
