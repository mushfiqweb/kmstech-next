import React from 'react';
import { render, screen } from '@testing-library/react';
import { WorkflowStep } from '../WorkflowStep';
import { FaCode } from 'react-icons/fa';

describe('WorkflowStep Component', () => {
  const defaultProps = {
    stepNumber: 1,
    title: 'Plan',
    Icon: FaCode,
  };

  it('renders step number and title', () => {
    render(<WorkflowStep {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    const { container } = render(<WorkflowStep {...defaultProps} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<WorkflowStep {...defaultProps} />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveAttribute('aria-label', 'Step 1: Plan');
  });
});
