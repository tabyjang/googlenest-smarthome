import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDetail } from '../../types';

interface ProductCardProps {
  product: ProductDetail;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const categoryLabel = {
    hub: '스마트 디스플레이',
    audio: '스마트 스피커',
    security: '보안 카메라',
    control: '온도 조절'
  };

  const categoryColor = {
    hub: 'bg-blue-600/20 text-blue-400',
    audio: 'bg-green-600/20 text-green-400',
    security: 'bg-red-600/20 text-red-400',
    control: 'bg-yellow-600/20 text-yellow-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.id}`}
        className="group block bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-gray-800 transition-all duration-500 border border-gray-700/50 hover:border-gray-600"
      >
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder for 3D preview or product image */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner flex items-center justify-center">
              <span className="text-4xl">
                {product.category === 'hub' ? '📺' :
                 product.category === 'audio' ? '🔊' :
                 product.category === 'security' ? '📷' : '🌡️'}
              </span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor[product.category]}`}>
              {categoryLabel[product.category]}
            </span>
          </div>

          {/* View button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              자세히 보기
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              ₩{product.price.toLocaleString()}
            </span>
            <span className="text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
