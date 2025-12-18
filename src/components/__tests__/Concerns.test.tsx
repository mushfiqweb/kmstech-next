import React from 'react';
import { render, screen } from '@testing-library/react';
import { Concerns } from '../Concerns';

describe('Concerns Component', () => {
  it('renders the common questions list', () => {
    render(<Concerns />);
    expect(screen.getByText('Common Questions')).toBeInTheDocument();
    expect(screen.getByText(/How do you ensure security?/i)).toBeInTheDocument();
  });

  it('renders the KMS Marketplace logo with correct link', () => {
    render(<Concerns />);

    const kmsLink = screen.getByLabelText('Visit KMS Marketplace');
    expect(kmsLink).toBeInTheDocument();
    expect(kmsLink).toHaveAttribute('href', 'https://kmsmarketplace.com');
    expect(kmsLink).toHaveAttribute('target', '_blank');
    expect(kmsLink).toHaveAttribute('rel', 'noopener noreferrer');

    const kmsImage = screen.getByAltText('KMS Marketplace Logo');
    expect(kmsImage).toBeInTheDocument();
  });

  it('renders the Beneath Green logo with correct link', () => {
    render(<Concerns />);

    const bgreenLink = screen.getByLabelText('Visit Beneath Green');
    expect(bgreenLink).toBeInTheDocument();
    expect(bgreenLink).toHaveAttribute('href', 'https://beneathgreen.com');
    expect(bgreenLink).toHaveAttribute('target', '_blank');
    expect(bgreenLink).toHaveAttribute('rel', 'noopener noreferrer');

    const bgreenImage = screen.getByAltText('Beneath Green Logo');
    expect(bgreenImage).toBeInTheDocument();
  });
});
