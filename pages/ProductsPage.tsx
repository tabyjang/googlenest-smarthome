import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/products/ProductGrid';
import { PRODUCT_CATEGORIES } from '../constants';

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Google Nest 제품
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            스마트홈의 시작, Google Nest와 함께 더 편리한 일상을 경험하세요
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ProductGrid category={activeCategory} />
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
