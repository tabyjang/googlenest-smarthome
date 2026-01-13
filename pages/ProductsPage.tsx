import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/products/ProductGrid';
import { PRODUCT_CATEGORIES } from '../constants';

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="pt-24 min-h-screen bg-cream-100 noise-overlay">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-cream-200 to-cream-100 py-24 px-6 border-b border-cream-300">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs tracking-[0.3em] uppercase text-gold-500 font-medium mb-4"
          >
            Product Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-charcoal-700 mb-6"
          >
            Google Nest <span className="italic text-gold-gradient">컬렉션</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal-400 max-w-2xl mx-auto font-light"
          >
            프리미엄 스마트홈의 시작, 정교하게 설계된 디바이스로
            <br />당신의 공간을 한 단계 업그레이드하세요
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-6 bg-cream-100/90 backdrop-blur-xl border-b border-cream-300 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {PRODUCT_CATEGORIES.map((category, idx) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-charcoal-700 text-cream-100 shadow-luxury'
                    : 'bg-white text-charcoal-500 border border-cream-300 hover:border-gold-300 hover:text-charcoal-700'
                }`}
              >
                {category.name}
              </motion.button>
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

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-cream-100 to-cream-200">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-gold-500 font-medium mb-4">
              Consultation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-700 mb-6">
              맞춤 상담이 필요하신가요?
            </h2>
            <p className="text-charcoal-400 font-light mb-8 leading-relaxed">
              전문 컨설턴트가 당신의 공간에 최적화된 스마트홈 솔루션을 제안해드립니다.
            </p>
            <a
              href="/#estimator"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-700 text-cream-100 rounded-full font-medium shadow-luxury-lg hover:bg-charcoal-600 transition-all group"
            >
              <span>견적 문의하기</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
