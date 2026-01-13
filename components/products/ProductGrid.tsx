import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../constants';

interface ProductGridProps {
  category: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const filteredProducts = category === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === category);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-400">해당 카테고리에 제품이 없습니다.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {filteredProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
