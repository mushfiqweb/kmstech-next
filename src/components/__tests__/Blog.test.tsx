import React from 'react';
import { render, screen } from '@testing-library/react';
import { Blog } from '../Blog';

describe('Blog Component', () => {
  it('renders the Recent Articles heading', () => {
    render(<Blog />);
    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
  });

  it('renders a list of articles', () => {
    render(<Blog />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('renders correct article titles', () => {
    render(<Blog />);
    expect(screen.getByText('Introducing KMS Tech')).toBeInTheDocument();
    expect(screen.getByText('PWA Offline Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Performance and Accessibility')).toBeInTheDocument();
  });

  it('renders links with correct styling', () => {
    render(<Blog />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
        expect(link).toHaveStyle({ color: '#00d466' });
    });
  });
});
