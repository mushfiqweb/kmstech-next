import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact Component', () => {
  it('renders the company name', () => {
    render(<Contact />);
    expect(screen.getByText('KMS Tech')).toBeInTheDocument();
  });

  it('renders the WhatsApp link with correct href', () => {
    render(<Contact />);
    const whatsappLink = screen.getByLabelText(/Chat on WhatsApp/i);
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/8801711741953');
  });

  it('renders the Phone link with correct href', () => {
    render(<Contact />);
    const phoneLink = screen.getByLabelText(/Call \+880/i);
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+8801911256358');
  });

  it('renders the Email link with correct href', () => {
    render(<Contact />);
    const emailLink = screen.getByLabelText(/Email info@kmstech.co/i);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:info@kmstech.co');
  });

  it('renders the Location link with correct href', () => {
    render(<Contact />);
    const locationLink = screen.getByLabelText(/View location on Google Maps/i);
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveAttribute('href', 'https://maps.app.goo.gl/2L7NCNNJH9XowiMcA');
  });

  it('renders the Trade License information', () => {
    render(<Contact />);
    expect(screen.getByText(/Trade License: TRAD\/DNCC\/131256\/2022/i)).toBeInTheDocument();
  });
});
