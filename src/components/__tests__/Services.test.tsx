import React from 'react';
import { render, screen } from '@testing-library/react';
import { Services } from '../Services';

describe('Services Component', () => {
  it('renders the Service Offerings section', () => {
    render(<Services />);
    expect(screen.getByText('Service Offerings')).toBeInTheDocument();
  });

  it('renders all 5 service cards', () => {
    render(<Services />);
    expect(screen.getByText('Software Design & Development')).toBeInTheDocument();
    expect(screen.getByText('IT & Business Consultancy')).toBeInTheDocument();
    expect(screen.getByText('Web Application Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
    expect(screen.getByText('UX Engineering & Digital Marketing')).toBeInTheDocument();
  });

  it('renders the Workflow Process section', () => {
    render(<Services />);
    expect(screen.getByText('Workflow Process')).toBeInTheDocument();
  });

  it('renders all 4 workflow steps', () => {
    render(<Services />);
    expect(screen.getByText('Plan & Research')).toBeInTheDocument();
    expect(screen.getByText('Design & Develop')).toBeInTheDocument();
    expect(screen.getByText('Deliver')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders correct step numbers', () => {
    render(<Services />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
  
  it('has accessible roles', () => {
      render(<Services />);
      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(5);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(4);
  });
});
