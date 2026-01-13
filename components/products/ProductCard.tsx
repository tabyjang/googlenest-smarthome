import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDetail } from '../../types';

interface ProductCardProps {
  product: ProductDetail;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const categoryLabel: Record<string, string> = {
    hub: 'Smart Display',
    audio: 'Smart Speaker',
    security: 'Security',
    control: 'Climate'
  };

  const categoryIcon: Record<string, string> = {
    hub: '📺',
    audio: '🔊',
    security: '📷',
    control: '🌡️'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/products/${product.id}`}
        className="group block bg-white rounded-[2rem] overflow-hidden hover:shadow-luxury-lg transition-all duration-500 border border-cream-300 hover:border-gold-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-cream-100 to-cream-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Product icon placeholder */}
            <div className="w-24 h-24 rounded-full bg-cream-300/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-5xl opacity-80">
                {categoryIcon[product.category]}
              </span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/5 transition-all duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-[10px] tracking-[0.15em] uppercase font-medium text-charcoal-500 border border-cream-200">
              {categoryLabel[product.category]}
            </span>
          </div>

          {/* View button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="px-6 py-3 bg-charcoal-700 text-cream-100 rounded-full text-sm font-medium shadow-luxury transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              자세히 보기
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-display font-medium text-charcoal-700 group-hover:text-charcoal-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-charcoal-400 text-sm font-light mb-5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-cream-200">
            <span className="text-2xl font-display font-light text-charcoal-700">
              ₩{product.price.toLocaleString()}
            </span>
            <span className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center group-hover:bg-gold-100 group-hover:text-gold-600 transition-all">
              <svg className="w-4 h-4 text-charcoal-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
