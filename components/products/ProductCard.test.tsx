import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductDetail } from '../../types';

const mockProduct: ProductDetail = {
  id: 'test-1',
  name: 'Google Nest Hub',
  description: 'Smart display for your home',
  imageUrl: '/test.jpg',
  category: 'hub' as const,
  price: 99000,
  fullDescription: 'Full description',
  features: ['Feature 1'],
  specs: { size: '7 inch' }
};

describe('ProductCard', () => {
  it('renders product name', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} index={0} />
      </MemoryRouter>
    );
    expect(screen.getByText('Google Nest Hub')).toBeInTheDocument();
  });

  it('displays formatted price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} index={0} />
      </MemoryRouter>
    );
    expect(screen.getByText(/99,000/)).toBeInTheDocument();
  });

  it('shows description text', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} index={0} />
      </MemoryRouter>
    );
    expect(screen.getByText('Smart display for your home')).toBeInTheDocument();
  });
});
