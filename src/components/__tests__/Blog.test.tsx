import React from 'react';
import { render, screen } from '@testing-library/react';
import { Blog } from '../Blog';

describe('Blog Component', () => {
  it('renders the Recent Articles heading', () => {
    render(<Blog />);
    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
  });

  it('renders 5 blog articles', () => {
    render(<Blog />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(5);
  });

  it('renders correct article titles', () => {
    render(<Blog />);
    expect(screen.getByText('Introducing KMS Tech: A New Era of Innovation')).toBeInTheDocument();
    expect(screen.getByText('The Power of Progressive Web Apps (PWA)')).toBeInTheDocument();
    expect(screen.getByText('Mastering Performance and Accessibility')).toBeInTheDocument();
    expect(screen.getByText('Navigating the Landscape of Cybersecurity')).toBeInTheDocument();
    expect(screen.getByText('Optimizing Business Logic with Microservices')).toBeInTheDocument();
  });

  it('renders article descriptions', () => {
    render(<Blog />);
    expect(screen.getByText(/We are thrilled to announce the launch of KMS Tech/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover how PWAs can transform your user experience/i)).toBeInTheDocument();
  });

  it('renders article dates', () => {
    render(<Blog />);
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('February 2, 2024')).toBeInTheDocument();
    expect(screen.getByText('May 20, 2024')).toBeInTheDocument();
  });
});
