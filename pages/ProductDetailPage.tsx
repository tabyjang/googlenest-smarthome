import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import Canvas3D from '../components/three/Canvas3D';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find(p => p.id === productId);

  const categoryLabel: Record<string, string> = {
    hub: 'Smart Display',
    audio: 'Smart Speaker',
    security: 'Security Camera',
    control: 'Climate Control'
  };

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-charcoal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-light text-charcoal-700 mb-4">제품을 찾을 수 없습니다</h1>
          <Link to="/products" className="text-gold-500 hover:text-gold-600 font-medium transition-colors">
            제품 목록으로 돌아가기 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-cream-100 noise-overlay">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-charcoal-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">홈</Link>
          <span className="text-charcoal-300">/</span>
          <Link to="/products" className="hover:text-gold-500 transition-colors">컬렉션</Link>
          <span className="text-charcoal-300">/</span>
          <span className="text-charcoal-600">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-cream-300 rounded-[2.5rem]" />

            <div className="aspect-square bg-gradient-to-br from-cream-200 to-cream-300 rounded-[2rem] overflow-hidden border border-cream-400">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Canvas3D productId={product.id} />
              </Suspense>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-4">
              {categoryLabel[product.category]}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal-700 mb-6">
              {product.name}
            </h1>

            <p className="text-lg text-charcoal-400 mb-8 leading-relaxed font-light">
              {product.fullDescription}
            </p>

            <div className="mb-10">
              <span className="text-xs tracking-wider uppercase text-charcoal-300">Price</span>
              <div className="text-4xl font-display font-light text-charcoal-700 mt-1">
                ₩{product.price.toLocaleString()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-charcoal-700 text-cream-100 rounded-full font-medium hover:bg-charcoal-600 transition-all shadow-luxury-lg text-center"
              >
                Google Store에서 보기
              </a>
              <Link
                to="/#estimator"
                className="px-8 py-4 border border-cream-400 text-charcoal-600 rounded-full font-medium hover:border-gold-400 hover:text-charcoal-700 transition-all text-center"
              >
                견적 문의
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-cream-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold-500 font-medium">Features</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-700 mt-4">주요 기능</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-cream-300 hover:border-gold-300 hover:shadow-luxury transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mb-5">
                  <span className="text-gold-600 font-display text-lg">{idx + 1}</span>
                </div>
                <p className="text-charcoal-600 font-light leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 px-6 bg-cream-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold-500 font-medium">Specifications</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-700 mt-4">제품 사양</h2>
          </div>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-cream-300 shadow-soft">
            {Object.entries(product.specs).map(([key, value], idx) => (
              <div
                key={key}
                className={`flex justify-between p-6 ${idx !== 0 ? 'border-t border-cream-200' : ''}`}
              >
                <span className="text-charcoal-400 font-light">{key}</span>
                <span className="text-charcoal-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-charcoal-700 to-charcoal-600 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">Get Started</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-cream-100 mt-4 mb-6">
            프리미엄 스마트홈, 지금 시작하세요
          </h2>
          <p className="text-charcoal-300 font-light mb-10 leading-relaxed">
            전문 컨설턴트를 통해 맞춤형 스마트홈 솔루션을 제안받으세요
          </p>
          <Link
            to="/#estimator"
            className="inline-flex items-center gap-3 px-10 py-4 bg-cream-100 text-charcoal-700 rounded-full font-medium hover:bg-white transition-all shadow-luxury-lg group"
          >
            <span>무료 견적 받기</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
