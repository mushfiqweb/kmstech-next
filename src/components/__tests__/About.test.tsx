import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About Component', () => {
  it('renders the Brief Insight section', () => {
    render(<About />);
    expect(screen.getByText('Brief Insight')).toBeInTheDocument();
    // Match a substring that doesn't span across strong tags or complex whitespace
    expect(screen.getByText(/is like a blessing to us/i)).toBeInTheDocument();
  });

  it('renders the Background Story section', () => {
    render(<About />);
    expect(screen.getByText('Background Story')).toBeInTheDocument();
    expect(screen.getByText(/A number of like-minded youngsters/i)).toBeInTheDocument();
  });

  it('renders the Our Principles section with Mission and Vision', () => {
    render(<About />);
    expect(screen.getByText('Our Principles')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
  });

  it('renders the mission list items', () => {
    render(<About />);
    const missionItems = screen.getAllByRole('listitem');
    // We have two lists (Mission and Vision), so we just check total or specific content
    expect(screen.getByText('Secure, reliable & optimized IT solutions')).toBeInTheDocument();
  });
});
