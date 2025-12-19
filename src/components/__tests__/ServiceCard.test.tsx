import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '../ServiceCard';
import { FaLaptopCode } from 'react-icons/fa';

describe('ServiceCard Component', () => {
  const defaultProps = {
    title: 'Test Service',
    description: 'This is a test description.',
    Icon: FaLaptopCode,
  };

  it('renders title and description', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ServiceCard {...defaultProps} />);
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'Test Service');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
