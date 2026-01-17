import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /홈/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /컬렉션/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /체험하기/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /견적 문의/i })).toBeInTheDocument();
  });

  it('links have correct paths', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /홈/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /컬렉션/i })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: /체험하기/i })).toHaveAttribute('href', '/experience');
    expect(screen.getByRole('link', { name: /견적 문의/i })).toHaveAttribute('href', '/#estimator');
  });
});
