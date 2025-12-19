import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn(); // Mock alert
  });

  it('renders the contact form', () => {
    render(<Contact onClose={mockOnClose} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('has required attributes on inputs', () => {
    render(<Contact onClose={mockOnClose} />);
    expect(screen.getByLabelText(/Name/i)).toBeRequired();
    expect(screen.getByLabelText(/Email/i)).toBeRequired();
    expect(screen.getByLabelText(/Message/i)).toBeRequired();
  });

  it('calls onClose when form is submitted', () => {
    render(<Contact onClose={mockOnClose} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });
    
    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /Send/i }));
    
    expect(window.alert).toHaveBeenCalledWith('Message sent!');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
