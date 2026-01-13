import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlannerProduct } from '../../types';
import { PLANNER_CATEGORIES } from '../../constants';

interface ProductDockProps {
  products: PlannerProduct[];
  onAddProduct: (productId: string) => void;
}

export default function ProductDock({ products, onAddProduct }: ProductDockProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, productId: string) => {
    e.dataTransfer.setData('productId', productId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-soft-lg p-4 md:p-6"
    >
      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin">
        {PLANNER_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-white shadow-md'
                : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            draggable
            onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, product.id)}
            onClick={() => onAddProduct(product.id)}
            className="flex-shrink-0 w-28 md:w-32 p-3 bg-cream-50 rounded-xl border-2 border-transparent hover:border-gold-400 cursor-grab active:cursor-grabbing transition-all group"
          >
            {/* Product Image */}
            <div className="w-full aspect-square mb-2 flex items-center justify-center bg-white rounded-lg p-2">
              <img
                src={product.image}
                alt={product.nameKo}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Product Info */}
            <div className="text-center">
              <p className="text-xs md:text-sm font-medium text-charcoal-600 truncate">
                {product.nameKo}
              </p>
              <p className="text-xs text-gold-500 font-medium mt-0.5">
                ₩{formatPrice(product.price)}
              </p>
            </div>

            {/* Drag Hint */}
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-charcoal-600/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              드래그
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instruction */}
      <p className="text-xs text-charcoal-600/50 text-center mt-4">
        제품을 클릭하거나 캔버스로 드래그하여 배치하세요
      </p>
    </motion.div>
  );
}
